"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import {
  LogIn,
  Shield,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Award,
  TrendingUp,
  Users,
  ChevronDown,
  ClipboardCheck,
  BarChart3,
  FileCheck,
  Search,
  Target,
} from "lucide-react";

interface LoginPageProps {
  onLogin: (checkerID: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [checkerID, setCheckerID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [checkerIDError, setCheckerIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showInspectionInfo, setShowInspectionInfo] = useState(false);
  const checkerIDInputRef = useRef<HTMLInputElement>(null);

  const mockCheckers = ["CHECKER_001", "CHECKER_002", "CHECKER_003", "CHECKER_004"];

  // Autofocus checker ID field on mount
  useEffect(() => {
    if (checkerIDInputRef.current) {
      checkerIDInputRef.current.focus();
    }
  }, []);

  // Checker ID validation
  const validateCheckerID = (value: string) => {
    if (!value) {
      setCheckerIDError("");
      return true;
    }
    const checkerIDRegex = /^CHECKER_\d{3}$/;
    if (!checkerIDRegex.test(value.toUpperCase())) {
      setCheckerIDError("Invalid format. Use CHECKER_XXX format");
      return false;
    }
    setCheckerIDError("");
    return true;
  };

  // Password validation
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("");
      return true;
    }
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleCheckerIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCheckerID(value);
    setError("");
    validateCheckerID(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
    validatePassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkerID.trim()) {
      setCheckerIDError("Please enter your Checker ID");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      return;
    }

    if (!mockCheckers.includes(checkerID.toUpperCase())) {
      setError("Invalid credentials. Please check your Checker ID and password.");
      return;
    }

    onLogin(checkerID.toUpperCase());
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side - QC Branding */}
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
                QC Portal
              </h1>
              <p className="text-xl text-gray-100 font-medium">
                Pre-Shipment Inspection System
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="shrink-0 w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-white">Pre-Shipment Inspection</h3>
                  <p className="text-white/80 text-sm">Thorough quality checks before dispatch</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="shrink-0 w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-white">Defect Tracking</h3>
                  <p className="text-white/80 text-sm">Identify and categorize quality issues</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="shrink-0 w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-white">Inspection Reports</h3>
                  <p className="text-white/80 text-sm">Detailed quality assessment forms</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 h-28 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="text-3xl font-bold text-white mb-2">2.5K+</div>
                <div className="text-sm text-white/80 font-medium">Items Checked</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 h-28 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="text-3xl font-bold text-white mb-2">98.5%</div>
                <div className="text-sm text-white/80 font-medium">Pass Rate</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 h-28 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:scale-[1.02] cursor-default">
                <div className="text-3xl font-bold text-white mb-2">15min</div>
                <div className="text-sm text-white/80 font-medium">Avg Check Time</div>
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
                Sign in to your QC dashboard
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Checker ID Field */}
                <div>
                  <label
                    htmlFor="checkerID"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Checker ID
                  </label>
                  <input
                    ref={checkerIDInputRef}
                    id="checkerID"
                    type="text"
                    value={checkerID}
                    onChange={handleCheckerIDChange}
                    onBlur={() => validateCheckerID(checkerID)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-[#455a64] transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 ${
                      checkerIDError
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-[#455a64]"
                    }`}
                    placeholder="Enter your Checker ID (e.g., CHECKER_001)"
                    autoFocus
                  />
                  {checkerIDError && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {checkerIDError}
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

                  {passwordError && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {passwordError}
                    </div>
                  )}
                </div>

                {/* General Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {error}
                    </div>
                  </div>
                )}

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
                  <button
                    type="button"
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Sign In to QC Portal
                </Button>
              </form>

              {/* Demo Credentials Section - Collapsible */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowInspectionInfo(!showInspectionInfo)}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    <span>Demo Credentials & Inspection Info</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        showInspectionInfo ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showInspectionInfo && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                        QC Checker Accounts
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                        {mockCheckers.map((checker) => (
                          <div key={checker} className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-gray-600 mr-1.5 shrink-0" />
                            <span className="font-mono">{checker}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 bg-white p-2 rounded border mb-3">
                        Password: <span className="font-mono">demo123</span> (for all demo accounts)
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <Target className="w-3 h-3 text-gray-500 mr-1.5" />
                          <span>Access inspection forms & checklists</span>
                        </div>
                        <div className="flex items-center">
                          <Search className="w-3 h-3 text-gray-500 mr-1.5" />
                          <span>Track defects & quality metrics</span>
                        </div>
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
