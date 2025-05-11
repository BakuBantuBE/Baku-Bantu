// src/app/login/page.tsx
"use client";

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { SocialButton } from '@/components/ui/SocialButton';
import AuthLayout from '@/components/layouts/AuthLayout';
import { isAuthenticated } from '@/services/auth';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, error, login, clearError } = useLogin();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // UI state
  const [showDemo, setShowDemo] = useState(false);
  
  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  // Clear error when inputs change
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData.email, formData.password, error, clearError]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const success = await login({
      email: formData.email,
      password: formData.password
    }, formData.rememberMe);
    
    if (success) {
      // Redirect to dashboard with a slight delay to show success
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }
  };

  // Fill demo credentials
  const fillDemoCredentials = (email: string, password: string) => {
    setFormData(prev => ({
      ...prev,
      email,
      password
    }));
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your account and continue your journey of kindness"
      heroTitle="Make a difference today"
      heroDescription="Join bakubantu and help connect resources to communities in need"
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="youremail@example.com"
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          }
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••••••••••••••"
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
          showPasswordToggle
          required
          disabled={isLoading}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            id="remember-me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            label="Remember me"
            disabled={isLoading}
          />
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-babyBlue-dark hover:text-babyBlue transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Demo Accounts */}
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-blue-800">Demo Account</h4>
            <button
              type="button"
              className="text-xs text-blue-600 hover:text-blue-800"
              onClick={() => setShowDemo(!showDemo)}
            >
              {showDemo ? 'Hide' : 'Show'} Details
            </button>
          </div>
          {showDemo && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-medium text-gray-700">Super Admin</p>
                  <p className="text-xs text-gray-500">hoka1@gmail.com / 1408Hoka</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fillDemoCredentials('hoka1@gmail.com', '1408Hoka')}
                >
                  Use
                </Button>
              </div>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          size="full" 
          variant="primary"
          disabled={isLoading}
          isLoading={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
        
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-blue-50 to-purple-50 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <SocialButton
            provider="google"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.554 3.921 1.465l2.814-2.814A9.996 9.996 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" fill="#EA4335" />
              </svg>
            }
          >
            Google
          </SocialButton>
          <SocialButton
            provider="facebook"
            icon={
              <svg className="h-5 w-5 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            }
          >
            Facebook
          </SocialButton>
          <SocialButton
            provider="apple"
            icon={
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44A4.51 4.51 0 0 1 19 16.5a11.12 11.12 0 0 1-1.63 3.43c-.67.91-1.5 2.07-2.89 2.07-1.57 0-2.09-.9-3.48-.9-1.44 0-2 .87-3.44.87-1.31 0-2.26-1.06-3-2a14.16 14.16 0 0 1-2.05-7C2.5 8.43 5.03 5 8.03 5c1.32 0 2.5.9 3.37.9.81 0 2.1-.94 3.6-.94a4.32 4.32 0 0 1 3.47 1.76 4.2 4.2 0 0 0-1 2.91z"/>
              </svg>
            }
          >
            Apple
          </SocialButton>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-lavender-dark hover:text-lavender transition-colors">
          Create one now
        </Link>
      </p>
    </AuthLayout>
  );
}