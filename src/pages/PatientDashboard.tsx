// src/pages/PatientDashboard.tsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
} from "../components/ui/card";
import {
  MessageCircle,
  Bot,
  UserPlus,
  Pill,
  Stethoscope,
  Calendar,
} from "lucide-react";
import { useAuthStore } from "@/store/authstore";
import { motion } from "framer-motion";



export default function PatientDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

 
  const isLoading = false; 

  
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "PATIENT")) {
      navigate("/auth/login"); 
    }
  }, [user, isLoading, navigate]);


  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome, <span className="text-blue-600 dark:text-blue-400">{user?.name || "Patient"}</span>!
          </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Manage your health journey with CareXpert
            </p>
          </motion.div>

          {/* Main Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* Start ChatBot Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/chat">
                <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-8 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Start ChatBot</h3>
                        <p className="text-blue-100">Get instant answers to your health questions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Analyze Report Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/upload-report">
                <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-8 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Analyze Report</h3>
                        <p className="text-green-100">Schedule your next consultation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Access Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {/* View Prescriptions */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/prescriptions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Pill className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">View Prescriptions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Access all your medical prescriptions</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* View Appointments */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/appointments">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">View Appointments</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Check your upcoming and past appointments</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Chat with Bot */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/chat">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Chat with Bot</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get quick answers to your health queries</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Book Appointment */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/doctors">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UserPlus className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Book Appointment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Schedule a consultation with a doctor</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-gray-50 dark:bg-gray-800 border-0">
              <CardContent className="p-8 text-center">
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic">
                  "The greatest wealth is health. Taking care of your health today gives you better hope for tomorrow."
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Link to="/chat">
          <Button
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            style={{ borderRadius: "9999px", width: 56, height: 56, padding: 0, minWidth: 0 }}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
