/**
 * Centralized API Service Layer
 * Manages all HTTP requests with axios instance, interceptors, and organized endpoints
 * 
 * Benefits:
 * - Single axios instance with consistent configuration
 * - Centralized error handling and response interceptors
 * - Organized endpoint functions by feature domain
 * - Type-safe API calls using TypeScript interfaces
 * - Easy to maintain and update endpoints
 * - Consistent request/response patterns
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authstore';
import type {
  // Generic types
  ApiResponse,
  // Auth & User
  User,
  LoginResponse,
  AuthenticatedProfileResponse,
  // Doctor
  Doctor,
  // Appointments
  Appointment,
  // Prescriptions
  Prescription,
  PrescriptionResponse,
  // Reports
  Report,
  UploadReportResponse,
  // Notifications
  Notification,
  NotificationsResponse,
  // Chat
  ChatHistoryResponse,
  // Video Calls
  MeetingResponse,
} from '@/services/types/api';

/**
 * Create and configure axios instance
 * - Base URL from environment variable
 * - Credentials included in all requests
 */
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
  });

  /**
   * Response Interceptor
   * Handles global error states and unauthorized access
   */
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle 401 Unauthorized - session expired
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        useAuthStore.getState().logout();
        window.location.href = '/auth/login';
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        toast.error('You do not have permission to perform this action.');
      }

      // Handle 500 Server Error
      if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Export the API instance for use in other files
export const api = createApiInstance();

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

export const authAPI = {
  /**
   * Login user with email and password
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/api/user/login', {
      data: email,
      password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    return response.data.data as LoginResponse;
  },

  /**
   * Signup new user (Patient or Doctor)
   */
  signup: async (
    nameOrFirstName: string,
    email: string,
    password: string,
    role: 'PATIENT' | 'DOCTOR' = 'PATIENT',
    additionalData?: {
      lastName?: string;
      specialty?: string;
      clinicLocation?: string;
      location?: string;
      phone?: string;
    }
  ): Promise<LoginResponse> => {
    const payload: any = {
      email,
      password,
      role,
    };

    // Handle name fields
    if (additionalData?.lastName) {
      payload.firstName = nameOrFirstName;
      payload.lastName = additionalData.lastName;
    } else {
      payload.name = nameOrFirstName;
    }

    // Add doctor-specific fields
    if (additionalData?.specialty) {
      payload.specialty = additionalData.specialty;
    }

    // Add clinic or patient location
    if (additionalData?.clinicLocation) {
      payload.clinicLocation = additionalData.clinicLocation;
    } else if (additionalData?.location) {
      payload.location = additionalData.location;
    }

    // Add phone if provided
    if (additionalData?.phone) {
      payload.phone = additionalData.phone;
    }

    const response = await api.post<ApiResponse<LoginResponse>>('/api/user/signup', payload);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Signup failed');
    }

    return response.data.data as LoginResponse;
  },

  /**
   * Logout user - handled client-side by clearing auth state
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/user/logout', {});
    } catch (error) {
      // Logout errors are non-critical
      console.error('Logout error:', error);
    }
  },
};

// ============================================================================
// USER PROFILE ENDPOINTS
// ============================================================================

export const userAPI = {
  /**
   * Fetch authenticated user's profile
   */
  getAuthenticatedProfile: async (): Promise<AuthenticatedProfileResponse> => {
    const response = await api.get<ApiResponse<AuthenticatedProfileResponse>>(
      '/api/user/authenticated-profile',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch profile');
    }

    return response.data.data as AuthenticatedProfileResponse;
  },

  /**
   * Update patient profile
   */
  updatePatientProfile: async (formData: FormData): Promise<User> => {
    const response = await api.put<ApiResponse<{ user: User }>>(
      '/api/user/update-patient',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update profile');
    }

    return response.data.data?.user as User;
  },

  /**
   * Update doctor profile
   */
  updateDoctorProfile: async (formData: FormData): Promise<User> => {
    const response = await api.put<ApiResponse<{ user: User }>>(
      '/api/user/update-doctor',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update profile');
    }

    return response.data.data?.user as User;
  },
};

// ============================================================================
// DOCTOR ENDPOINTS
// ============================================================================

export const doctorAPI = {
  /**
   * Fetch all doctors (for patient to browse)
   */
  getAllDoctors: async (): Promise<Doctor[]> => {
    const response = await api.get<ApiResponse<Doctor[]>>(
      '/api/patient/fetchAllDoctors'
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch doctors');
    }

    return response.data.data as Doctor[];
  },

  /**
   * Fetch single doctor details
   */
  getDoctorById: async (doctorId: string): Promise<Doctor> => {
    const response = await api.get<ApiResponse<Doctor>>(
      `/api/doctor/${doctorId}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch doctor');
    }

    return response.data.data as Doctor;
  },

  /**
   * Get pending appointment requests for doctor
   */
  getPendingRequests: async (): Promise<Appointment[]> => {
    const response = await api.get<ApiResponse<Appointment[]>>(
      '/api/doctor/pending-requests',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch pending requests');
    }

    return response.data.data as Appointment[];
  },

  /**
   * Get all appointments for doctor
   */
  getAllAppointments: async (): Promise<Appointment[]> => {
    const response = await api.get<ApiResponse<Appointment[]>>(
      '/api/doctor/all-appointments',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch appointments');
    }

    return response.data.data as Appointment[];
  },

  /**
   * Accept or reject appointment request
   */
  respondToAppointmentRequest: async (
    appointmentId: string,
    action: 'accept' | 'reject',
    rejectionReason?: string
  ): Promise<Appointment> => {
    const payload =
      action === 'reject'
        ? { action, rejectionReason }
        : { action };

    const response = await api.patch<ApiResponse<Appointment>>(
      `/api/doctor/appointment-requests/${appointmentId}/respond`,
      payload,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to respond to appointment');
    }

    return response.data.data as Appointment;
  },

  /**
   * Complete appointment with prescription
   */
  completeAppointmentWithPrescription: async (
    appointmentId: string,
    prescriptionText: string
  ): Promise<Appointment> => {
    const response = await api.patch<ApiResponse<Appointment>>(
      `/api/doctor/appointments/${appointmentId}/complete`,
      { prescriptionText },
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to complete appointment');
    }

    return response.data.data as Appointment;
  },
};

// ============================================================================
// PATIENT ENDPOINTS
// ============================================================================

export const patientAPI = {
  /**
   * Book appointment with doctor
   */
  bookAppointment: async (
    doctorId: string,
    date: string,
    time: string,
    appointmentType: 'ONLINE' | 'OFFLINE',
    notes?: string
  ): Promise<Appointment> => {
    const response = await api.post<ApiResponse<Appointment>>(
      '/api/patient/book-direct-appointment',
      {
        doctorId,
        date,
        time,
        appointmentType,
        notes,
      },
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to book appointment');
    }

    return response.data.data as Appointment;
  },

  /**
   * Get patient's appointments
   */
  getMyAppointments: async (): Promise<Appointment[]> => {
    const response = await api.get<ApiResponse<Appointment[]>>(
      '/api/patient/all-appointments',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch appointments');
    }

    return response.data.data as Appointment[];
  },

  /**
   * Cancel appointment
   */
  cancelAppointment: async (appointmentId: string): Promise<void> => {
    const response = await api.patch(
      `/api/patient/appointments/${appointmentId}/cancel`,
      {},
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to cancel appointment');
    }
  },

  /**
   * Get patient's prescriptions
   */
  getPrescriptions: async (): Promise<Prescription[]> => {
    const response = await api.get<ApiResponse<Prescription[]>>(
      '/api/patient/view-Prescriptions',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch prescriptions');
    }

    return response.data.data as Prescription[];
  },
};

// ============================================================================
// REPORT ENDPOINTS
// ============================================================================

export const reportAPI = {
  /**
   * Upload medical report for analysis
   */
  uploadReport: async (file: File): Promise<UploadReportResponse> => {
    const formData = new FormData();
    formData.append('report', file);

    const response = await api.post<ApiResponse<UploadReportResponse>>(
      '/api/report',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to upload report');
    }

    return response.data.data as UploadReportResponse;
  },

  /**
   * Get report status and analysis
   */
  getReport: async (reportId: string): Promise<Report> => {
    const response = await api.get<ApiResponse<Report>>(
      `/api/report/${reportId}`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch report');
    }

    return response.data.data as Report;
  },

  /**
   * Delete report
   */
  deleteReport: async (reportId: string): Promise<void> => {
    const response = await api.delete(
      `/api/report/${reportId}`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete report');
    }
  },
};

// ============================================================================
// PRESCRIPTION ENDPOINTS
// ============================================================================

export const prescriptionAPI = {
  /**
   * Create prescription for completed appointment
   */
  createPrescription: async (
    appointmentId: string,
    prescriptionText: string
  ): Promise<PrescriptionResponse> => {
    const response = await api.post<ApiResponse<PrescriptionResponse>>(
      '/api/prescription',
      {
        appointmentId,
        prescriptionText,
      },
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create prescription');
    }

    return response.data.data as PrescriptionResponse;
  },

  /**
   * Get prescription PDF
   */
  getPrescriptionPDF: async (prescriptionId: string): Promise<Blob> => {
    const response = await api.get(
      `/api/prescription-pdf/${prescriptionId}`,
      {
        responseType: 'blob',
        withCredentials: true,
      }
    );

    return response.data as Blob;
  },
};

// ============================================================================
// NOTIFICATION ENDPOINTS
// ============================================================================

export const notificationAPI = {
  /**
   * Fetch all notifications for user
   */
  getNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<ApiResponse<NotificationsResponse>>(
      '/api/user/notifications',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch notifications');
    }

    return response.data.data?.notifications as Notification[];
  },

  /**
   * Fetch unread notification count
   */
  getUnreadCount: async (): Promise<{ unreadCount: number }> => {
    const response = await api.get<ApiResponse<{ unreadCount: number }>>(
      '/api/user/notifications/unread-count',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch unread count');
    }

    return response.data.data as { unreadCount: number };
  },

  /**
   * Mark single notification as read
   */
  markAsRead: async (notificationId: string): Promise<void> => {
    const response = await api.put(
      `/api/user/notifications/${notificationId}/read`,
      {},
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to mark notification as read');
    }
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<void> => {
    const response = await api.put(
      `/api/user/notifications/mark-all-read`,
      {},
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to mark all as read');
    }
  },

  /**
   * Delete notification
   */
  deleteNotification: async (notificationId: string): Promise<void> => {
    const response = await api.delete(
      `/api/user/notifications/${notificationId}`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete notification');
    }
  },
};

// ============================================================================
// CHAT ENDPOINTS
// ============================================================================

export const chatAPI = {
  /**
   * Load one-on-one chat history
   */
  loadOnOnOneChatHistory: async (
    otherUserId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<ChatHistoryResponse> => {
    const response = await api.get<ApiResponse<ChatHistoryResponse>>(
      `/api/chat/one-on-one/${otherUserId}`,
      {
        params: { page, limit },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to load chat history');
    }

    return response.data.data as ChatHistoryResponse;
  },

  /**
   * Load city chat history
   */
  loadCityChatHistory: async (
    cityName: string,
    page: number = 1,
    limit: number = 50
  ): Promise<ChatHistoryResponse> => {
    const response = await api.get<ApiResponse<ChatHistoryResponse>>(
      `/api/chat/city/${encodeURIComponent(cityName)}`,
      {
        params: { page, limit },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to load chat history');
    }

    return response.data.data as ChatHistoryResponse;
  },

  /**
   * Load room chat history
   */
  loadRoomChatHistory: async (
    roomId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<ChatHistoryResponse> => {
    const response = await api.get<ApiResponse<ChatHistoryResponse>>(
      `/api/chat/room/${roomId}`,
      {
        params: { page, limit },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to load chat history');
    }

    return response.data.data as ChatHistoryResponse;
  },

  /**
   * Get doctor conversations (for DMs)
   */
  getDoctorConversations: async (): Promise<ChatHistoryResponse['messages']> => {
    const response = await api.get<any>(
      `/api/chat/doctor/conversations`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch conversations');
    }

    return response.data.data?.conversations || [];
  },

  /**
   * Get community members
   */
  getCommunityMembers: async (communityId: string): Promise<any[]> => {
    const response = await api.get<any>(
      `/api/user/communities/${communityId}/members`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch members');
    }

    return response.data.data?.members || [];
  },
};

// ============================================================================
// AI CHAT ENDPOINTS
// ============================================================================

export const aiChatAPI = {
  /**
   * Get AI chat history
   */
  getHistory: async (): Promise<any> => {
    const response = await api.get<any>(
      `/api/ai-chat/history`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to load chat history');
    }

    return response.data.data;
  },

  /**
   * Send message to AI and get response
   */
  sendMessage: async (symptoms: string, language: string = 'en'): Promise<any> => {
    const response = await api.post<any>(
      `/api/ai-chat/process`,
      { symptoms, language },
      { withCredentials: true, timeout: 15000 }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to process AI request');
    }

    return response.data.data;
  },

  /**
   * Clear AI chat history
   */
  clearHistory: async (): Promise<void> => {
    const response = await api.delete<any>(
      `/api/ai-chat/history`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to clear history');
    }
  },
};

// ============================================================================
// COMMUNITY & CITY ROOMS ENDPOINTS
// ============================================================================

export const communityAPI = {
  /**
   * Get city rooms
   */
  getCityRooms: async (role: 'DOCTOR' | 'PATIENT' = 'PATIENT'): Promise<any[]> => {
    const endpoint = role === 'DOCTOR' ? `/api/doctor/city-rooms` : `/api/patient/city-rooms`;
    const response = await api.get<any>(
      endpoint,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch city rooms');
    }

    const data = response.data.data;
    return Array.isArray(data) ? data : [data];
  },

  /**
   * Get community members
   */
  getMembers: async (communityId: string): Promise<any[]> => {
    const response = await api.get<any>(
      `/api/user/communities/${communityId}/members`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch members');
    }

    return response.data.data?.members || [];
  },
};

// ============================================================================
// VIDEO CALL ENDPOINTS
// ============================================================================

export const videoCallAPI = {
  /**
   * Get meeting token for video call
   */
  getMeetingToken: async (): Promise<MeetingResponse> => {
    const response = await api.post<ApiResponse<MeetingResponse>>(
      '/api/chat/get-token',
      {},
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to get meeting token');
    }

    return response.data.data as MeetingResponse;
  },
};

// ============================================================================
// ADMIN ENDPOINTS (Placeholder for future expansion)
// ============================================================================

export const adminAPI = {
  /**
   * Fetch dashboard statistics
   */
  getDashboardStats: async () => {
    const response = await api.get(
      '/api/admin/dashboard-stats',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch stats');
    }

    return response.data.data;
  },

  /**
   * Fetch all users
   */
  getAllUsers: async () => {
    const response = await api.get(
      '/api/admin/users',
      { withCredentials: true }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch users');
    }

    return response.data.data;
  },
};

// ============================================================================
// EXPORT AGGREGATED API OBJECT FOR CONVENIENCE
// ============================================================================

export default {
  auth: authAPI,
  user: userAPI,
  doctor: doctorAPI,
  patient: patientAPI,
  report: reportAPI,
  prescription: prescriptionAPI,
  notification: notificationAPI,
  chat: chatAPI,
  aiChat: aiChatAPI,
  community: communityAPI,
  videoCall: videoCallAPI,
  admin: adminAPI,
};
