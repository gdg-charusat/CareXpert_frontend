/**
 * Services Index - Export all API services
 */

export {
  authAPI,
  userAPI,
  doctorAPI,
  appointmentAPI,
  prescriptionAPI,
  reportAPI,
  chatAPI,
  notificationAPI,
  default as apiClient,
} from "./api";

export type {
  ApiResponse,
  User,
  Doctor,
  Appointment,
  Prescription,
  Report,
  ChatMessage,
  BackendChatMessage,
  ChatHistoryResponse,
  CityChatHistoryResponse,
  Notification,
} from "./api";
