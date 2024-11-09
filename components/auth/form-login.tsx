'use client';

import { signInCredentials } from '@/lib/action';
import React from 'react';
import { LoginButton } from '../button';
import Image from 'next/image';

const FormLogin = () => {
    const [state, formAction] = React.useActionState(signInCredentials, null);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Image Section - hidden on mobile */}
            <div className="hidden md:flex items-center justify-center w-1/2">
                <Image src="/images/login.jpg" width={500} height={500} alt="Login illustration" />
            </div>

            {/* Form Section */}
            <div className="flex items-center justify-center w-full md:w-1/2 h-full bg-gray-100">
                <div className="max-w-md w-full p-8">
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <Image src="/images/logo.png" width={100} height={100} alt="Logo" />
                        <h1 className="text-2xl font-bold text-gray-900 text-left w-full">Login</h1>
                    </div>
                    <form action={formAction} className="space-y-6">
                        {state?.message && (
                            <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
                                <span className="font-medium">{state.message}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                id="email"
                                placeholder="jhon@example.com"
                                type="text"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {state?.error?.email && (
                                <span className="text-sm text-red-500 mt-2">{state.error.email}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <input
                                id="password"
                                placeholder="*******"
                                type="password"
                                name="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {state?.error?.password && (
                                <span className="text-sm text-red-500 mt-2">{state.error.password}</span>
                            )}
                        </div>

                        <LoginButton />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;
