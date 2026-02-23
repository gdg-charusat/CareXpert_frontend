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
  Loader2,
} from "lucide-react";
import { InputWithIcon } from "../../components/ui/input-with-icon";
import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import * as React from "react";
import axios from "axios";
import { toast } from "sonner";

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  specialty?: string;
  location?: string;
  password?: string;
}

function getPasswordStrength(password: string): { label: string; color: string; width: string } {
  if (!password) return { label: "", color: "", width: "0%" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" };
  if (score <= 3) return { label: "Moderate", color: "bg-yellow-500", width: "66%" };
  return { label: "Strong", color: "bg-green-500", width: "100%" };
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  const clearError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) setFieldErrors((p) => ({ ...p, [field]: undefined }));
  };

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

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email format";
    if (!specialty) errors.specialty = "Specialty is required";
    if (!location.trim()) errors.location = "Location is required";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
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
        navigate("/dashboard/doctor");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data;
        if (data?.errors && typeof data.errors === "object") {
          const be: FieldErrors = {};
          for (const key of Object.keys(data.errors)) {
            if (["firstName", "lastName", "email", "specialty", "location", "password"].includes(key)) {
              (be as any)[key] = data.errors[key];
            }
          }
          if (Object.keys(be).length > 0) setFieldErrors(be);
        }
        toast.error(data?.message || "Something went wrong");
      } else {
        toast.error("Unknown error occurred.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
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
                  onChange={(e) => { setFirstName(e.target.value); clearError("firstName"); }}
                  icon={<User className="h-4 w-4 text-gray-400" />}
                />
                {fieldErrors.firstName && <p className="text-sm text-red-500">{fieldErrors.firstName}</p>}
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
                  onChange={(e) => { setLastName(e.target.value); clearError("lastName"); }}
                  icon={<User className="h-4 w-4 text-gray-400" />}
                />
                {fieldErrors.lastName && <p className="text-sm text-red-500">{fieldErrors.lastName}</p>}
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
                onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                icon={<Mail className="h-4 w-4 text-gray-400" />}
              />
              {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="specialty"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Specialty
                </label>
                <Select value={specialty} onValueChange={(val) => { setSpecialty(val); clearError("specialty"); }}>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.specialty && <p className="text-sm text-red-500">{fieldErrors.specialty}</p>}
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
                  onChange={(e) => { setLocation(e.target.value); clearError("location"); }}
                  icon={<MapPin className="h-4 w-4 text-gray-400" />}
                />
                {fieldErrors.location && <p className="text-sm text-red-500">{fieldErrors.location}</p>}
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
                  onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
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
              {password && (
                <div className="space-y-1">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <p className={`text-xs ${passwordStrength.color.replace("bg-", "text-")}`}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
              {fieldErrors.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Doctor Account"
              )}
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
