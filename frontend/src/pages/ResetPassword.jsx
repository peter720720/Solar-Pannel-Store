import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowLeft, Loader2 } from 'lucide-react';

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safe fallback if user navigates directly to this route instead of coming from Forgot Password
    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        // Client-side passwords match validation check
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            setLoading(false);
            return;
        }

        try {
            // Replace with your actual backend endpoint configuration
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password. Please verify your OTP.');
            }

            setMessage({
                type: 'success',
                text: 'Password updated successfully! Redirecting to login...',
            });

            // Redirect back to login screen after success delay
            setTimeout(() => {
                navigate('/login');
            }, 2500);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen pt-28 pb-12 flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: "url('/download (2).jpg')" }}
        >
            {/* Outer Card container with Frosted Glass styling */}
            <div className="w-full max-w-md bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 p-8 rounded-3xl shadow-2xl transition-colors duration-300">

                {/* Decorative Top Icon */}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 mb-6">
                    <ShieldCheck className="h-6 w-6" />
                </div>

                {/* Heading Elements */}
                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Reset Password
                </h2>
                <p className="mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                    {email ? (
                        <span>We sent a code to <strong className="text-amber-600 dark:text-amber-400">{email}</strong></span>
                    ) : (
                        'Enter your validation OTP and select a new password security layer.'
                    )}
                </p>

                {/* Form Elements */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

                    {/* Status Message Alerts */}
                    {message.text && (
                        <div className={`p-4 rounded-xl text-sm font-semibold border ${message.type === 'success'
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* OTP Code Entry Field */}
                    <div>
                        <label htmlFor="otp" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            One-Time Password (OTP)
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            required
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            disabled={loading}
                            className="block w-full px-4 py-3 tracking-widest text-center font-bold text-xl border border-white/20 dark:border-gray-700/50 rounded-xl bg-white/60 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400 disabled:opacity-50"
                            placeholder="000000"
                        />
                    </div>

                    {/* New Password Field */}
                    <div>
                        <label htmlFor="new-password" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                                <Lock className="h-5 w-5" />
                            </div>
                            <input
                                id="new-password"
                                name="newPassword"
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={loading}
                                className="block w-full pl-10 pr-4 py-3 border border-white/20 dark:border-gray-700/50 rounded-xl bg-white/60 dark:bg-gray-900/60 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium transition-all text-sm disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                                <Lock className="h-5 w-5" />
                            </div>
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                                className="block w-full pl-10 pr-4 py-3 border border-white/20 dark:border-gray-700/50 rounded-xl bg-white/60 dark:bg-gray-900/60 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium transition-all text-sm disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Submission Action Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                'Update Password'
                            )}
                        </button>
                    </div>
                </form>

                {/* Cancel Option Link */}
                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Cancel and return to login</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
