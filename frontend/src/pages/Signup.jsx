import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SunDim, User, Mail, Lock, AlertCircle } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup registration failed');

      // Seamlessly redirect to login state passing a custom notification
      navigate('/login', { state: { message: 'Account created successfully! Kindly log in.' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center px-4 bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
      style={{ backgroundImage: "url('/download (2).jpg')" }}
    >
      <div className="max-w-md w-full bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-1.5 mb-2">
            <SunDim className="h-7 w-7 text-amber-500" />
            <span className="text-lg font-black uppercase tracking-tight text-amber-500">SolarStore</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Create your account</h2>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">Join us to transition to smart solar energy</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 text-sm font-semibold text-red-600 bg-red-50/80 dark:bg-red-950/40 rounded-xl border border-red-100 dark:border-red-900/50">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold text-white bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center cursor-pointer"
          >
            {loading ? 'Registering Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
