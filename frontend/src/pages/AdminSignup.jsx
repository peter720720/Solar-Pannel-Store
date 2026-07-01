import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Key, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function AdminSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', adminKey: '' });
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
      const res = await fetch('http://localhost:5000/api/auth/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error('Server error. Please try again later.');
      }

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      // Redirects to admin login page with success message state
      navigate('/admin-login', { state: { message: 'Admin account created! Please sign in.' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="w-full min-h-screen pt-36 pb-24 flex flex-col justify-center items-center px-4 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/download (2).jpg')" }}
    >
      <div className="max-w-md w-full bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Create Admin Account</h2>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">Register an official administrative dashboard profile</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-5 text-sm font-semibold text-red-600 bg-red-50/80 dark:bg-red-950/40 rounded-xl border border-red-100 dark:border-red-900/50">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Admin Name"
                className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@solarstore.com"
                className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Admin Secret Key</label>
            <div className="relative">
              <Key className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input
                type="password"
                name="adminKey"
                required
                value={formData.adminKey}
                onChange={handleChange}
                placeholder="Enter Secret Key"
                className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xl shadow-red-600/20 transform transition active:scale-[0.98] duration-150 flex items-center justify-center cursor-pointer text-sm"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Register Admin Account'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
          Already registered?{' '}
          <Link to="/admin-login" className="text-red-600 dark:text-red-400 hover:underline cursor-pointer">
            Admin Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
