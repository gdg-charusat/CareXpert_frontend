import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const DoctorProfilePage = lazy(() => import("./pages/DoctorProfilePage"));
const BookAppointmentPage = lazy(() => import("./pages/BookAppointmentPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AppointmentManagementPage = lazy(() => import("./pages/AppointmentManagementPage"));
const DoctorAppointmentsPage = lazy(() => import("./pages/DoctorAppointmentsPage"));
const DoctorAppointmentHistoryPage = lazy(() => import("./pages/DoctorAppointmentHistoryPage"));
const PrescriptionsPage = lazy(() => import("./pages/PrescriptionsPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const DoctorPendingRequestsPage = lazy(() => import("./pages/DoctorPendingRequestsPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const PatientDashboard = lazy(() => import("./pages/PatientDashboard"));
const DoctorDashboard = lazy(() => import("./pages/DoctorDashboard"));
const StartCall = lazy(() => import("./pages/StartCall"));
const UploadReportPage = lazy(() => import("./pages/UploadReportPage"));
const AppointmentHistoryPage = lazy(() => import("./pages/AppointmentHistoryPage"));
const PharmacyPage = lazy(() => import("./pages/PharmacyPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/auth/*" element={<AuthPage />} />

        {/* Dashboard routes with sidebar */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route path="patient" element={<PatientDashboard />} />
          <Route path="doctor" element={<DoctorDashboard />} />
        </Route>

        {/* Other authenticated routes with sidebar */}
        <Route path="/appointments" element={<DashboardLayout />}>
          <Route index element={<AppointmentManagementPage />} />
        </Route>
        <Route path="/doctor/appointments" element={<DashboardLayout />}>
          <Route index element={<DoctorAppointmentsPage />} />
        </Route>
        <Route path="/doctor/appointment-history" element={<DashboardLayout />}>
          <Route index element={<DoctorAppointmentHistoryPage />} />
        </Route>
        <Route path="/prescriptions" element={<DashboardLayout />}>
          <Route index element={<PrescriptionsPage />} />
        </Route>
        <Route path="/notifications" element={<DashboardLayout />}>
          <Route index element={<NotificationsPage />} />
        </Route>
        <Route path="/pending-requests" element={<DashboardLayout />}>
          <Route index element={<DoctorPendingRequestsPage />} />
        </Route>
        <Route path="/profile" element={<DashboardLayout />}>
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path="/doctors" element={<DashboardLayout />}>
          <Route index element={<DoctorsPage />} />
        </Route>
        <Route path="/doctors/:id" element={<DashboardLayout />}>
          <Route index element={<DoctorProfilePage />} />
        </Route>
        <Route path="/book-appointment/:id" element={<DashboardLayout />}>
          <Route index element={<BookAppointmentPage />} />
        </Route>
        <Route path="/chat" element={<DashboardLayout />}>
          <Route index element={<ChatPage />} />
        </Route>
        <Route path="/upload-report" element={<DashboardLayout />}>
          <Route index element={<UploadReportPage />} />
        </Route>
        <Route path="/appointment-history" element={<DashboardLayout />}>
          <Route index element={<AppointmentHistoryPage />} />
        </Route>
        <Route path="/pharmacy" element={<DashboardLayout />}>
          <Route index element={<PharmacyPage />} />
        </Route>
        <Route path="/notifications" element={<DashboardLayout />}>
          <Route index element={<NotificationsPage />} />
        </Route>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminPage />} />
        </Route>
        <Route path="/start-call" element={<DashboardLayout />}>
          <Route index element={<StartCall />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>

  );
}
