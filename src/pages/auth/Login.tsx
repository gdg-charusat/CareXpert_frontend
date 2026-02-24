import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Mail, Lock, Eye, EyeOff, Heart } from "lucide-react";
import { InputWithIcon } from "../../components/ui/input-with-icon";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import { toast } from "sonner";
import axios from "axios";
import { useAuthStore } from "@/store/authstore";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login` ,{email , password} , {
        withCredentials : true
      });
      if(res.data.success){
        useAuthStore.getState().setUser({
          id : res.data.data.id,
          name : res.data.data.name,
          email : res.data.data.email,
          profilePicture : res.data.data.profilePicture,
          role : res.data.data.role,
          refreshToken : res.data.data.refreshToken
        })

        if(res.data.data.role === "PATIENT"){
          navigate("/dashboard/patient");
        }else{
          navigate("/dashboard/doctor")
        }
      }
      // console.log(res.data.data)
    }catch(err){
      if(axios.isAxiosError(err) && err.response){
        toast.error(err.response.data?.message || "Something went wrong");
      }else{
        toast.error("Unknown error occured..")
      }
    }
    // Simulate login based on demo emails
    // if (email === "patient@demo.com" && password === "password") {
    //   navigate("/dashboard/patient");
    // } else if (email === "doctor@demo.com" && password === "password") {
    //   navigate("/dashboard/doctor");
    // } else if (email === "admin@demo.com" && password === "password") {
    //   navigate("/admin");
    // } else {
    //   alert(
    //     "Invalid credentials. Use demo@demo.com/password for patient, doctor@demo.com/password for doctor, or admin@demo.com/password for admin"
    //   );
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Sign in to your careXpert account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email Address
              </label>
              <InputWithIcon
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4 text-gray-400" />}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <InputWithIcon
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/auth/patient/signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
