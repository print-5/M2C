"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import {
  Eye,
  EyeOff,
  Building2,
  Globe,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
  Lock,
  Users,
  Shield,
  ChevronDown,
  AlertCircle,
  CheckIcon,
} from "lucide-react";
import Link from "next/link";

export default function VendorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegistrationSteps, setShowRegistrationSteps] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Autofocus email field on mount
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // Email validation
  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("");
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Password validation and strength indicator
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("");
      setPasswordStrength("");
      return true;
    }

    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setPasswordStrength("weak");
      return false;
    }

    setPasswordError("");

    // Calculate password strength
    let strength = "weak";
    if (value.length >= 12 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value)) {
      strength = "strong";
    } else if (value.length >= 10 && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
      strength = "medium";
    } else if (value.length >= 8) {
      strength = "weak";
    }

    setPasswordStrength(strength);
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case "strong":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "weak":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const getPasswordStrengthLabel = (strength: string) => {
    switch (strength) {
      case "strong":
        return "Strong";
      case "medium":
        return "Medium";
      case "weak":
        return "Weak";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side - Professional Branding */}
      <div className="hidden lg:flex lg:flex-1 relative bg-[#000000]">
        <div className="flex items-center justify-center w-full p-12">
          <div className="max-w-lg text-center text-white">
            {/* Logo Section */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-44 h-36 bg-white rounded-2xl mb-6 shadow-xl">
                <Image
                  src="/assets/logo/logo2.png"
                  alt="Company Logo"
                  width={190}
                  height={150}
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold mb-3">
                Vendor Portal
              </h1>
              <p className="text-xl text-gray-100 font-medium">
                Grow your business with our platform
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="shrink-0 w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-white">Global Marketplace</h3>
                  <p className="text-white/80 text-sm">Connect with buyers worldwide</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="shrink-0 w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-white">Secure Platform</h3>
                  <p className="text-white/80 text-sm">Enterprise-grade security</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="shrink-0 w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-white">Analytics & Insights</h3>
                  <p className="text-white/80 text-sm">Track your business growth</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 h-28 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-sm text-white/80 font-medium">Active Vendors</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 h-28 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-sm text-white/80 font-medium">Countries</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 h-28 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-white/80 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Login Form Card */}
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </CardTitle>
              <p className="text-gray-600">
                Sign in to your vendor dashboard
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => validateEmail(email)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-[#455a64] transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 ${
                      emailError
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-[#455a64]"
                    }`}
                    placeholder="Enter your email"
                    autoFocus
                  />
                  {emailError && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {emailError}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={() => validatePassword(password)}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-[#455a64] transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 ${
                        passwordError
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-[#455a64]"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Error Message */}
                  {passwordError && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {passwordError}
                    </div>
                  )}

                  {/* Password Strength Indicator */}
                  {password && !passwordError && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">
                          Password Strength
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            passwordStrength === "strong"
                              ? "text-green-600"
                              : passwordStrength === "medium"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {getPasswordStrengthLabel(passwordStrength)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                            passwordStrength
                          )}`}
                          style={{
                            width:
                              passwordStrength === "weak"
                                ? "33%"
                                : passwordStrength === "medium"
                                ? "66%"
                                : "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-gray-700 border-gray-300 rounded focus:ring-[#455a64]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button - Primary */}
                <Link href="/vendor/dashboard">
                  <Button className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In to Dashboard
                  </Button>
                </Link>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">New to our platform?</span>
                  </div>
                </div>

                {/* Register Link - Secondary */}
                <Link href="/vendor/vendorpanel" className="block">
                  <Button
                    variant="outline"
                    className="w-full border border-gray-900 text-gray-900 bg-white hover:bg-gray-200 hover:border-gray-700 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Create Vendor Account
                  </Button>
                </Link>
              </form>

              {/* Registration Info Section - Collapsible */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationSteps(!showRegistrationSteps)}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    <span>Quick & Easy Registration Process</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        showRegistrationSteps ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showRegistrationSteps && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                        Registration Steps
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        {[
                          "Company Details",
                          "Warehouse Info",
                          "Owner Profile",
                          "Product Categories",
                          "Manufacturing",
                          "Certifications",
                          "Contact & Trade",
                          "Review & Submit",
                        ].map((step) => (
                          <div key={step} className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-blue-500 mr-1.5 shrink-0" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
