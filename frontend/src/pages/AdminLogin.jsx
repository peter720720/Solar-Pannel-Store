import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ShieldAlert, Mail, Lock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error('Server returned invalid data format. Please try again.');
      }

      if (!res.ok) {
        throw new Error(data.message || 'Invalid admin credentials');
      }

      // ROLE SECURITY GUARD: Stop standard customers from entering admin control console
      if (data.user && data.user.role !== 'admin') {
        throw new Error('Access denied. This portal is restricted to authorized administrators only.');
      }

      login(data.user, data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="w-full min-h-screen pt-40 pb-40 flex flex-col justify-center items-center px-4 bg-cover bg-center bg-no-repeat bg-fixed relative z-10"
      style={{ backgroundImage: "url('/download (2).jpg')" }}
    >
      <div className="max-w-md w-full bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-800/40 rounded-3xl p-8 shadow-2xl relative z-20">
        
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-500 mb-4">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Admin Control Portal</h2>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">Authorized corporate access profiles only</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 text-sm font-semibold text-red-600 bg-red-50/80 dark:bg-red-950/40 rounded-xl border border-red-100 dark:border-red-900/50">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input type="email" name="email" required disabled={loading} value={formData.email} onChange={handleChange} placeholder="admin@solarstore.com" className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-sm disabled:opacity-50" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">Security Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input type="password" name="password" required disabled={loading} value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-sm disabled:opacity-50" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xl shadow-red-600/20 flex items-center justify-center cursor-pointer">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verify & Access Terminal'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Customer Login</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
