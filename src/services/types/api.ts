/**
 * API Response Types and Interfaces
 * Centralized TypeScript interfaces for all API responses
 */

// ============================================================================
// GENERIC API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data?: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  success: boolean;
  error?: string;
}

// ============================================================================
// AUTHENTICATION & USER TYPES
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  refreshToken?: string;
}

export interface LoginRequest {
  data: string; // email
  password: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: string;
  refreshToken: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?: 'PATIENT' | 'DOCTOR';
}

export interface AuthenticatedProfileResponse {
  user: User;
  doctor?: Doctor;
}

// ============================================================================
// DOCTOR TYPES
// ============================================================================

export interface Doctor {
  id: string;
  userId: string;
  specialty: string;
  clinicLocation: string;
  experience: string;
  education?: string;
  bio?: string;
  languages: string[];
  consultationFee?: number;
  user: User;
}

export interface UpdateDoctorRequest {
  name?: string;
  specialty?: string;
  clinicLocation?: string;
  experience?: string;
  education?: string;
  bio?: string;
  languages?: string[];
  consultationFee?: number;
  profilePicture?: File;
}

// ============================================================================
// PATIENT TYPES
// ============================================================================

export interface UpdatePatientRequest {
  name?: string;
  phone?: string;
  age?: number;
  address?: string;
  profilePicture?: File;
}

// ============================================================================
// APPOINTMENT TYPES
// ============================================================================

export interface Appointment {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
  appointmentType: 'ONLINE' | 'OFFLINE';
  date: string;
  time: string;
  notes?: string;
  consultationFee?: number;
  createdAt: string;
  updatedAt?: string;
  prescriptionId?: string | null;
  patient?: User;
  doctor?: Doctor;
}

export interface BookAppointmentRequest {
  doctorId: string;
  date: string;
  time: string;
  appointmentType: 'ONLINE' | 'OFFLINE';
  notes?: string;
}

export interface AppointmentResponse {
  appointmentId?: string;
  id?: string;
  status: string;
  message?: string;
}

export interface AppointmentRequestResponse {
  action: 'accept' | 'reject';
  rejectionReason?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  consultationFee?: number;
}

// ============================================================================
// PRESCRIPTION TYPES
// ============================================================================

export interface Prescription {
  id: string;
  date: string;
  prescriptionText: string;
  doctorName: string;
  speciality: string;
  clinicLocation: string;
}

export interface CreatePrescriptionRequest {
  appointmentId: string;
  prescriptionText: string;
}

export interface PrescriptionResponse {
  prescriptionId: string;
  appointmentId: string;
  status: string;
}

// ============================================================================
// REPORT TYPES
// ============================================================================

export interface Report {
  id: string;
  reportId?: string;
  status: 'IDLE' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  error?: string;
  patientId?: string;
  analysis?: string;
  createdAt?: string;
}

export interface UploadReportRequest {
  report: File;
}

export interface UploadReportResponse {
  reportId: string;
  status: string;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface Notification {
  id: string;
  type:
    | 'APPOINTMENT_ACCEPTED'
    | 'APPOINTMENT_REJECTED'
    | 'APPOINTMENT_REMINDER'
    | 'DOCTOR_MESSAGE'
    | string;
  title: string;
  message: string;
  isRead: boolean;
  appointmentId?: string;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface MarkNotificationAsReadRequest {
  notificationId: string;
}

// ============================================================================
// CHAT TYPES
// ============================================================================

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

export interface ChatHistoryResponse {
  messages: ChatMessage[];
  page: number;
  limit: number;
  total: number;
  room?: {
    id: string;
    name?: string;
  };
}

export interface DmMessageData {
  roomId: string;
  senderId: string;
  receiverId: string;
  username: string;
  text: string;
  image?: string;
}

export interface RoomMessageData {
  roomId: string;
  senderId: string;
  username: string;
  text: string;
  image?: string;
}

// ============================================================================
// VIDEO CALL TYPES
// ============================================================================

export interface MeetingResponse {
  roomId: string;
  token: string;
}

// ============================================================================
// DOCTOR SPECIFIC RESPONSE TYPES
// ============================================================================

export interface DoctorAppointmentResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Appointment[];
}

export interface DoctorPendingRequestsResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Appointment[];
}
// ============================================================================
// AI CHAT TYPES
// ============================================================================

export interface AiChatMessage {
  id: string;
  userMessage: string;
  probable_causes?: string[];
  probableCauses?: string[];
  severity: string;
  recommendation: string;
  disclaimer: string;
  createdAt: string;
}

export interface AiChatHistoryResponse {
  success: boolean;
  data: {
    chats: AiChatMessage[];
  };
}

export interface AiChatProcessRequest {
  symptoms: string;
  language?: string;
}

export interface AiChatResponse {
  probable_causes?: string[];
  probableCauses?: string[];
  severity: string;
  recommendation: string;
  disclaimer: string;
}

// ============================================================================
// COMMUNITY & ROOM TYPES
// ============================================================================

export interface UserInCommunity {
  id: string;
  name: string;
  profilePicture?: string;
}

export interface CommunityRoom {
  id: string;
  name: string;
  members: UserInCommunity[];
  admin: UserInCommunity[];
}

export interface CityRoomData {
  id: string;
  name: string;
  members: UserInCommunity[];
  admin: UserInCommunity[];
}

export interface CityRoomApiResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: CityRoomData | CityRoomData[];
}

export interface DoctorConversation {
  id: string;
  otherUser: UserInCommunity;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface DoctorConversationsResponse {
  success: boolean;
  data: {
    conversations: DoctorConversation[];
  };
}

export interface CommunityMembersResponse {
  success: boolean;
  data: {
    members: UserInCommunity[];
  };
}