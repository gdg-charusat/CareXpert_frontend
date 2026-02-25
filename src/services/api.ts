/**
 * Centralized API Service Layer
 * All API endpoints managed in one file
 */

import axios, { AxiosInstance, AxiosError } from "axios";
import { toast } from "sonner";

// =====================
// API RESPONSE TYPES
// =====================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "PATIENT" | "DOCTOR" | "ADMIN";
  profilePicture?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  refreshToken?: string;
}

export interface Doctor extends User {
  specialization?: string;
  qualifications?: string;
  licenseNumber?: string;
  bio?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  reason?: string;
  patient?: User;
  doctor?: Doctor;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  medications: string;
  dosage: string;
  duration: string;
  instructions: string;
  createdAt: string;
}

export interface Report {
  id: string;
  patientId: string;
  doctorId?: string;
  title: string;
  description: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface ChatMessage {
  roomId: string;
  senderId: string;
  receiverId?: string;
  username: string;
  text: string;
  time: string;
  messageType?: string;
  imageUrl?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

// =====================
// AXIOS INSTANCE
// =====================
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("auth-storage");
      window.location.href = "/auth/login";
      toast.error("Your session has expired. Please login again.");
    } else if (error.response?.status === 403) {
      toast.error("You don't have permission to perform this action");
    } else if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.");
    }
    return Promise.reject(error);
  }
);

// =====================
// AUTH API
// =====================
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<User>>("/api/user/login", { data: email, password }),

  patientSignup: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) =>
    api.post<ApiResponse<User>>("/api/user/signup", data),

  doctorSignup: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    specialization: string;
    qualifications: string;
    licenseNumber: string;
  }) =>
    api.post<ApiResponse<User>>("/api/user/signup", data),

  logout: () => api.post("/api/user/logout"),

  refreshToken: () => api.post<ApiResponse<User>>("/api/user/refresh-token"),

  requestPasswordReset: (email: string) =>
    api.post("/api/user/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
    api.post("/api/user/reset-password", { token, newPassword }),
};

// =====================
// USER/PROFILE API
// =====================
export const userAPI = {
  getAuthenticatedProfile: () =>
    api.get<ApiResponse<User>>("/api/authenticated-profile"),

  getProfileById: (userId: string) =>
    api.get<ApiResponse<User>>(`/api/user/${userId}`),

  updatePatientProfile: (data: FormData | Record<string, any>) => {
    const config =
      data instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};
    return api.put<ApiResponse<User>>("/api/patient/profile", data, config);
  },

  updateDoctorProfile: (data: FormData | Record<string, any>) => {
    const config =
      data instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};
    return api.put<ApiResponse<User>>("/api/doctor/profile", data, config);
  },

  deleteAccount: () => api.delete("/api/user/account"),

  updatePassword: (currentPassword: string, newPassword: string) =>
    api.put("/api/user/password", { currentPassword, newPassword }),
};

// =====================
// DOCTOR API
// =====================
export const doctorAPI = {
  fetchAllDoctors: () =>
    api.get<ApiResponse<Doctor[]>>("/api/patient/fetchAllDoctors"),

  searchDoctors: (query: string, specialization?: string) => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (specialization) params.append("specialization", specialization);
    return api.get<ApiResponse<Doctor[]>>(
      `/api/patient/searchDoctors?${params.toString()}`
    );
  },

  getDoctorById: (doctorId: string) =>
    api.get<ApiResponse<Doctor>>(`/api/patient/doctors/${doctorId}`),

  getDoctorsBySpecialization: (specialization: string) =>
    api.get<ApiResponse<Doctor[]>>(
      `/api/patient/doctors/specialization/${specialization}`
    ),

  getDoctorsByCity: (city: string) =>
    api.get<ApiResponse<Doctor[]>>(
      `/api/patient/doctors/city/${encodeURIComponent(city)}`
    ),
};

// =====================
// APPOINTMENT API
// =====================
export const appointmentAPI = {
  // Patient endpoints
  bookAppointment: (data: {
    doctorId: string;
    date: string;
    time: string;
    reason?: string;
  }) =>
    api.post<ApiResponse<Appointment>>(
      "/api/patient/book-direct-appointment",
      data
    ),

  getPatientAppointments: () =>
    api.get<ApiResponse<Appointment[]>>("/api/patient/appointments"),

  getPatientAppointmentHistory: () =>
    api.get<ApiResponse<Appointment[]>>("/api/patient/appointment-history"),

  getPatientAppointmentById: (appointmentId: string) =>
    api.get<ApiResponse<Appointment>>(
      `/api/patient/appointments/${appointmentId}`
    ),

  cancelPatientAppointment: (appointmentId: string, reason?: string) =>
    api.patch<ApiResponse<Appointment>>(
      `/api/patient/appointments/${appointmentId}/cancel`,
      { reason }
    ),

  rescheduleAppointment: (
    appointmentId: string,
    newDate: string,
    newTime: string
  ) =>
    api.patch<ApiResponse<Appointment>>(
      `/api/patient/appointments/${appointmentId}/reschedule`,
      { date: newDate, time: newTime }
    ),

  // Doctor endpoints
  getDoctorAppointments: () =>
    api.get<ApiResponse<Appointment[]>>("/api/doctor/appointments"),

  getPendingAppointments: () =>
    api.get<ApiResponse<Appointment[]>>("/api/doctor/pending-requests"),

  getDoctorAppointmentHistory: () =>
    api.get<ApiResponse<Appointment[]>>("/api/doctor/appointment-history"),

  approveAppointment: (appointmentId: string) =>
    api.patch<ApiResponse<Appointment>>(
      `/api/doctor/appointments/${appointmentId}/confirm`,
      {}
    ),

  rejectAppointment: (appointmentId: string, reason?: string) =>
    api.patch<ApiResponse<Appointment>>(
      `/api/doctor/appointments/${appointmentId}/reject`,
      { reason }
    ),

  completeAppointment: (appointmentId: string, notes?: string) =>
    api.patch<ApiResponse<Appointment>>(
      `/api/doctor/appointments/${appointmentId}/complete`,
      { notes }
    ),

  updateAppointmentStatus: (
    appointmentId: string,
    status: "CONFIRMED" | "COMPLETED" | "CANCELLED",
    notes?: string
  ) =>
    api.patch<ApiResponse<Appointment>>(
      `/api/doctor/appointments/${appointmentId}/status`,
      { status, notes }
    ),

  // Admin endpoints
  getAllAppointments: () =>
    api.get<ApiResponse<Appointment[]>>("/api/admin/all-appointments"),
};

// =====================
// PRESCRIPTION API
// =====================
export const prescriptionAPI = {
  // Patient endpoints
  getPatientPrescriptions: () =>
    api.get<ApiResponse<Prescription[]>>("/api/patient/view-prescriptions"),

  getPrescriptionById: (prescriptionId: string) =>
    api.get<ApiResponse<Prescription>>(
      `/api/patient/prescription/${prescriptionId}`
    ),

  downloadPrescription: (prescriptionId: string) =>
    api.get(`/api/patient/prescription/${prescriptionId}/download`, {
      responseType: "blob",
    }),

  // Doctor endpoints
  createPrescription: (data: {
    appointmentId: string;
    medications: string;
    dosage: string;
    duration: string;
    instructions: string;
  }) =>
    api.post<ApiResponse<Prescription>>("/api/doctor/prescription", data),

  updatePrescription: (
    prescriptionId: string,
    data: Partial<Prescription>
  ) =>
    api.put<ApiResponse<Prescription>>(
      `/api/doctor/prescription/${prescriptionId}`,
      data
    ),

  deletePrescription: (prescriptionId: string) =>
    api.delete(`/api/doctor/prescription/${prescriptionId}`),

  getDoctorPrescriptions: () =>
    api.get<ApiResponse<Prescription[]>>("/api/doctor/prescriptions"),
};

// =====================
// REPORT API
// =====================
export const reportAPI = {
  // Patient endpoints
  uploadReport: (formData: FormData) =>
    api.post<ApiResponse<Report>>("/api/patient/report", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getPatientReports: () =>
    api.get<ApiResponse<Report[]>>("/api/patient/reports"),

  getReportById: (reportId: string) =>
    api.get<ApiResponse<Report>>(`/api/patient/report/${reportId}`),

  deleteReport: (reportId: string) =>
    api.delete(`/api/patient/report/${reportId}`),

  updateReport: (reportId: string, formData: FormData) =>
    api.put<ApiResponse<Report>>(
      `/api/patient/report/${reportId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    ),

  // Doctor endpoints
  getDoctorPatientReports: () =>
    api.get<ApiResponse<Report[]>>("/api/doctor/patient-reports"),

  getPatientReportsForDoctor: (patientId: string) =>
    api.get<ApiResponse<Report[]>>(
      `/api/doctor/patient/${patientId}/reports`
    ),

  addReportNotes: (reportId: string, notes: string) =>
    api.patch(`/api/doctor/report/${reportId}/notes`, { notes }),
};

// =====================
// CHAT API
// =====================
export const chatAPI = {
  // Chat history
  getOneOnOneChatHistory: (
    otherUserId: string,
    page: number = 1,
    limit: number = 50
  ) =>
    api.get<ApiResponse<ChatMessage[]>>(
      `/api/chat/one-on-one/${otherUserId}`,
      {
        params: { page, limit },
      }
    ),

  getCityChatHistory: (
    cityName: string,
    page: number = 1,
    limit: number = 50
  ) =>
    api.get<ApiResponse<ChatMessage[]>>(
      `/api/chat/city/${encodeURIComponent(cityName)}`,
      {
        params: { page, limit },
      }
    ),

  getRoomChatHistory: (
    roomId: string,
    page: number = 1,
    limit: number = 50
  ) =>
    api.get<ApiResponse<ChatMessage[]>>(`/api/chat/room/${roomId}`, {
      params: { page, limit },
    }),

  getDMChatHistory: (
    roomId: string,
    page: number = 1,
    limit: number = 50
  ) =>
    api.get<ApiResponse<ChatMessage[]>>(`/api/chat/dm/${roomId}`, {
      params: { page, limit },
    }),

  // Patient endpoints
  getPatientDoctors: () =>
    api.get<ApiResponse<Doctor[]>>("/api/patient/fetchAllDoctors"),

  getPatientDoctorConversations: () =>
    api.get<ApiResponse<any[]>>("/api/chat/doctor/conversations"),

  // Doctor endpoints
  getDoctorConversations: () =>
    api.get<ApiResponse<any[]>>("/api/doctor/chat/doctor/conversations"),

  // City rooms
  getCityRooms: (cityName: string) =>
    api.get<ApiResponse<any[]>>(
      `/api/chat/city/${encodeURIComponent(cityName)}`
    ),

  // AI Chat
  getAIChatHistory: () =>
    api.get<ApiResponse<ChatMessage[]>>("/api/chat/ai-chat/history"),

  sendAIChatMessage: (message: string) =>
    api.post<ApiResponse<{ response: string }>>("/api/chat/ai-chat", {
      message,
    }),

  clearAIChatHistory: () =>
    api.delete("/api/chat/ai-chat/history"),

  // Video call
  getVideoCallToken: (appointmentId?: string) =>
    api.post<ApiResponse<{ token: string; meetingId: string }>>(
      "/api/chat/get-token",
      { appointmentId }
    ),
};

// =====================
// NOTIFICATION API
// =====================
export const notificationAPI = {
  getUserNotifications: () =>
    api.get<ApiResponse<Notification[]>>("/api/notification/notifications"),

  getUnreadNotifications: () =>
    api.get<ApiResponse<Notification[]>>("/api/notification/unread"),

  markNotificationAsRead: (notificationId: string) =>
    api.put(`/api/notification/notifications/${notificationId}/read`),

  markAllNotificationsAsRead: () =>
    api.put("/api/notification/notifications/read-all"),

  deleteNotification: (notificationId: string) =>
    api.delete(`/api/notification/notifications/${notificationId}`),

  clearAllNotifications: () =>
    api.delete("/api/notification/notifications"),

  getNotificationPreferences: () =>
    api.get<ApiResponse<Record<string, boolean>>>(
      "/api/notification/preferences"
    ),

  updateNotificationPreferences: (preferences: Record<string, boolean>) =>
    api.put("/api/notification/preferences", preferences),
};

export default api;
