import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  BriefcaseBusiness,
  CreditCard,
  MapPin,
  User,
} from "lucide-react";
import { InputWithIcon } from "../../components/ui/input-with-icon";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authstore";

export default function DoctorSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [license, setLicense] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  // Mock data for specialties
  const specialties = [
    "Cardiology",
    "Dermatology",
    "General Medicine",
    "Neurology",
    "Pediatrics",
    "Psychiatry",
    "Orthopedics",
    "Gynecology",
    "Other",
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !email || !specialty || !location || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signup`, {
        firstName,
        lastName,
        email,
        password,
        role: "DOCTOR",
        specialty,
        clinicLocation: location,
      }, {
        withCredentials: true,
      });
  
      if (res.data.success) {
        toast.success("Doctor account created successfully!");
        
        // Auto-login by setting user data in auth store
        const userData = res.data.data.user || res.data.data;
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          profilePicture: userData.profilePicture,
          role: userData.role,
          refreshToken: userData.refreshToken,
        });
        
        navigate("/dashboard/doctor");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || "Something went wrong");
      } else {
        toast.error("Unknown error occurred.");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Join as Doctor</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Create your professional account to start helping patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  First Name
                </label>
                <InputWithIcon
                  id="firstName"
                  type="text"
                  placeholder="Dr. John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  icon={<User className="h-4 w-4 text-gray-400" />}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Last Name
                </label>
                <InputWithIcon
                  id="lastName"
                  type="text"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  icon={<User className="h-4 w-4 text-gray-400" />}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email Address
              </label>
              <InputWithIcon
                id="email"
                type="email"
                placeholder="dr.smith@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4 text-gray-400" />}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="specialty"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Specialty
                </label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="experience"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Experience
                </label>
                <InputWithIcon
                  id="experience"
                  type="text"
                  placeholder="5 years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  icon={<BriefcaseBusiness className="h-4 w-4 text-gray-400" />}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="license"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  License Number
                </label>
                <InputWithIcon
                  id="license"
                  type="text"
                  placeholder="MD123456"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  icon={<CreditCard className="h-4 w-4 text-gray-400" />}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Location
                </label>
                <InputWithIcon
                  id="location"
                  type="text"
                  placeholder="New York, NY"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  icon={<MapPin className="h-4 w-4 text-gray-400" />}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <div className="relative">
                <InputWithIcon
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4 text-gray-400" />}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Create Doctor Account
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
