// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.jsx';
// import { SunDim, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

// export default function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Capture redirection status messages passed from the signup step safely
//   const successRedirectMessage = location.state?.message || '';

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || 'Login credentials invalid');
//       }

//       // Commit profile metrics dynamically to context memory
//       login(data.user, data.token);

//       // Kick user to collections screen immediately upon authentication
//       navigate('/collections');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

//       {/* Updated Container Card with Premium Entry Animation */}
//       <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none animate-fade-in">

//         {/* Header Title Elements */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center items-center gap-1.5 mb-2">
//             <SunDim className="h-7 w-7 text-amber-500" />
//             <span className="text-lg font-black uppercase tracking-tight text-amber-500">SolarStore</span>
//           </div>
//           <h2 className="text-2xl font-black tracking-tight">Welcome back</h2>
//           <p className="text-sm font-semibold text-gray-400 mt-1">Sign in to view collections & book systems</p>
//         </div>

//         {/* Dynamic Signup Success Notification Banner */}
//         {successRedirectMessage && !error && (
//           <div className="flex items-center gap-2 p-4 mb-6 text-sm font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
//             <CheckCircle2 className="h-4 w-4 shrink-0" />
//             <span>{successRedirectMessage}</span>
//           </div>
//         )}

//         {/* Error notification badge panel */}
//         {error && (
//           <div className="flex items-center gap-2 p-4 mb-6 text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-100 dark:border-red-900/50">
//             <AlertCircle className="h-4 w-4 shrink-0" />
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Form Interface elements */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
//             <div className="relative">
//               <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="you@example.com"
//                 className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
//               <Link to="/forgot-password" className="text-xs font-bold text-amber-500 hover:underline cursor-pointer">
//                 Forgot?
//               </Link>
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 font-bold text-white bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 rounded-xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 transform transition active:scale-[0.98] duration-150 flex items-center justify-center cursor-pointer"
//           >
//             {loading ? 'Authenticating Profile...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
//           New to SolarStore?{' '}
//           <Link to="/signup" className="text-amber-500 hover:underline cursor-pointer">
//             Create account
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { API_BASE_URL } from '../config/api';
import { SunDim, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const successRedirectMessage = location.state?.message || '';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/user/login`, {
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
        throw new Error(data.message || 'Login credentials invalid');
      }

      // ROLE SECURITY GUARD: Stop administrators from entering customer workspace
      if (data.user && data.user.role === 'admin') {
        throw new Error('Access denied. Administrators must authenticate through the Admin Portal.');
      }

      // Commit profile metrics dynamically to context memory
      login(data.user, data.token);
      navigate('/collections');
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
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Customer Sign In</h2>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">Sign in to view collections & book systems</p>
        </div>

        {successRedirectMessage && !error && (
          <div className="flex items-center gap-2 p-4 mb-6 text-sm font-semibold text-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successRedirectMessage}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 text-sm font-semibold text-red-600 bg-red-50/80 dark:bg-red-950/40 rounded-xl border border-red-100 dark:border-red-900/50">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">Password</label>
              <Link to="/forgot-password" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center cursor-pointer">
            {loading ? 'Authenticating Profile...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
          New to SolarStore? <Link to="/signup" className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer">Create account</Link>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <Link to="/admin-login" className="text-xs font-bold text-gray-500 hover:text-amber-500">Are you an Admin? Sign In Here</Link>
        </div>

      </div>
    </div>
  );
}
