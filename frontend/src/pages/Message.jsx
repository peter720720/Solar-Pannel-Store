// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext.jsx';
// import { Mail, User, Phone, MessageSquare, Send, Loader2, Calendar, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';

// export default function Message() {
//   const { user } = useAuth(); // Read current session metrics to identify if user is an admin
//   const isAdmin = user?.role === 'admin';

//   // Form State
//   const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
//   const [submitting, setSubmitting] = useState(false);
//   const [status, setStatus] = useState({ type: '', text: '' });

//   // Admin Inbox View State
//   const [inboxMessages, setInboxMessages] = useState([]);
//   const [loadingInbox, setLoadingInbox] = useState(false);

//   // 1. Handle form entry field mutations
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 2. Submit booking message down to Node backend database routes
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setStatus({ type: '', text: '' });

//     try {
//       const res = await fetch('http://localhost:5000/api/messages', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Failed to submit request');

//       setStatus({ type: 'success', text: 'Booking inquiry submitted successfully!' });
//       setFormData({ name: '', email: '', phone: '', message: '' });
      
//       // If admin is viewing their own page, refresh list automatically
//       if (isAdmin) fetchInbox();
//     } catch (err) {
//       setStatus({ type: 'error', text: err.message });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // 3. Fetch real inbox messages from database (Admin Only function)
//   const fetchInbox = async () => {
//     setLoadingInbox(true);
//     try {
//       const res = await fetch('http://localhost:5000/api/messages');
//       if (res.ok) {
//         const data = await res.json();
//         setInboxMessages(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error("Inbox data download rejected:", err);
//     } finally {
//       setLoadingInbox(false);
//     }
//   };

//   // 4. Delete individual message item (Admin Only function)
//   const handleDeleteMessage = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this consultation message?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/messages/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         setInboxMessages(inboxMessages.filter(msg => msg._id !== id));
//       }
//     } catch (err) {
//       console.error("Delete operation failed:", err);
//     }
//   };

//   // Fire data retrieval lifecycles if profile holds admin access flags
//   useEffect(() => {
//     if (isAdmin) {
//       fetchInbox();
//     }
//   }, [isAdmin]);

//   return (
//     <div 
//       className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
//       style={{ backgroundImage: "url('/download (2).jpg')" }}
//     >
//       <div className="max-w-7xl mx-auto">
        
//         {/* Page Title Context Banner */}
//         <div className="text-center mb-12 animate-fade-in">
//           <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
//             Booking & Consultation Center
//           </h1>
//           <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2 max-w-xl mx-auto">
//             {isAdmin ? "Review client consultation records or submit a system test log item." : "Book your immediate clean energy property assessment or leave our development team a note."}
//           </p>
//         </div>

//         {/* Dynamic Split Screen Grid Grid Layout */}
//         <div className={`grid grid-cols-1 ${isAdmin ? 'lg:grid-cols-2' : 'max-w-xl mx-auto'} gap-8 items-start`}>
          
//           {/* ================= LEFT SIDE: BOOKING FORM ================= */}
//           <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-slide-up">
//             <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
//               <Calendar className="text-amber-500 h-5 w-5" />
//               <span>Request Consultation</span>
//             </h3>

//             {status.text && (
//               <div className={`flex items-center gap-2 p-4 mb-5 text-sm font-semibold rounded-xl border ${
//                 status.type === 'success'
//                   ? 'text-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200'
//                   : 'text-red-600 bg-red-50/80 dark:bg-red-950/30 border-red-200'
//               }`}>
//                 {status.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
//                 <span>{status.text}</span>
//               </div>
//             )}

//             <form onSubmit={handleFormSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Your Name</label>
//                 <div className="relative">
//                   <User className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="John Doe"
//                     className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="john@example.com"
//                     className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="+234 812 345 6789"
//                     className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Project Requirements / Message</label>
//                 <div className="relative">
//                   <MessageSquare className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
//                   <textarea
//                     name="message"
//                     required
//                     rows="4"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Describe your power consumption details or property size..."
//                     className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full py-3.5 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xl shadow-amber-500/20 transform transition active:scale-[0.98] duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
//               >
//                 {submitting ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
//                 <span>{submitting ? 'Sending Request...' : 'Submit Booking Request'}</span>
//               </button>
//             </form>
//           </div>

//           {/* ================= RIGHT SIDE: ADMIN INBOX MANAGEMENT ================= */}
//           {isAdmin && (
//             <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-slide-up [animation-delay:150ms] flex flex-col h-full max-h-[640px]">
//               <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Mail className="text-red-500 h-5 w-5" />
//                   <span>Admin Inbox Console</span>
//                 </div>
//                 <span className="text-xs font-black bg-red-500/20 text-red-500 px-3 py-1 rounded-full">
//                   {inboxMessages.length} Messages
//                 </span>
//               </h3>

//               {loadingInbox ? (
//                 <div className="flex flex-col items-center justify-center py-20 text-gray-700 dark:text-gray-300 gap-2">
//                   <Loader2 className="animate-spin h-8 w-8 text-red-500" />
//                   <p className="text-xs font-bold uppercase tracking-wider">Syncing database messages...</p>
//                 </div>
//               ) : inboxMessages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/10 rounded-2xl">
//                   <MessageSquare className="h-10 w-10 text-gray-400 mb-2" />
//                   <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Inbox is empty</p>
//                   <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">No customer consulting records found.</p>
//                 </div>
//               ) : (
//                 <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar">
//                   {inboxMessages.map((msg) => (
//                     <div 
//                       key={msg._id} 
//                       className="p-4 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-sm hover:shadow-md transition-all relative group"
//                     >
//                       <button 
//                         onClick={() => handleDeleteMessage(msg._id)}
//                         className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
//                         title="Delete Message"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
                      
//                       <div className="pr-8">
//                         <h4 className="font-bold text-gray-900 dark:text-white text-base">{msg.name}</h4>
//                         <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5 space-y-0.5">
//                           <p>📧 {msg.email}</p>
//                           <p>📞 {msg.phone}</p>
//                         </div>
//                         <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 leading-relaxed">
//                           {msg.message}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Mail, User, Phone, MessageSquare, Send, Loader2, Calendar, AlertCircle, CheckCircle2, ShieldCheck, Sun, Zap } from 'lucide-react';

export default function Message() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit request');

      setStatus({ type: 'success', text: 'Booking inquiry submitted successfully!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/download (2).jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Book Your Consultation
          </h1>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
            Get an instant property power consumption analysis from our renewable energy engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* USER FORM INPUT CONTAINER */}
          <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-slide-up">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="text-amber-500 h-5 w-5" />
              <span>Request Property Assessment</span>
            </h3>

            {status.text && (
              <div className={`flex items-center gap-2 p-4 mb-5 text-sm font-semibold rounded-xl border ${
                status.type === 'success' ? 'text-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200' : 'text-red-600 bg-red-50/80 dark:bg-red-950/30 border-red-200'
              }`}>
                {status.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
                <span>{status.text}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+234 812 345 6789" className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">Project Details / Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <textarea name="message" required rows="4" value={formData.message} onChange={handleChange} placeholder="Specify your property size, average monthly electricity bill, or primary appliances..." className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-800/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none" />
                </div>
              </div>

              <button type="submit" disabled={submitting} className="w-full py-3.5 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xl shadow-amber-500/20 transform transition active:scale-[0.98] duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm">
                {submitting ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                <span>{submitting ? 'Sending Details...' : 'Submit Request'}</span>
              </button>
            </form>
          </div>

          {/* MEANINGFUL SIDEBAR COMPONENT FOR USERS */}
          <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-slide-up [animation-delay:150ms] space-y-6">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white border-b border-white/10 pb-4">
              What Happens Next?
            </h3>
            
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl shrink-0"><Sun className="h-5 w-5" /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">1. Engineering Review</h4>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">Our field engineering squad maps your specifications against geographic solar irradiance models.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl shrink-0"><Calendar className="h-5 w-5" /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">2. Assessment Booking</h4>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">We call or email you within 24 business hours to lock in a site evaluation window.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0"><Zap className="h-5 w-5" /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">3. Custom Array Proposal</h4>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">Receive a complete line-by-line quote specifying monocrystalline panels layout and backup batteries.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <ShieldCheck className="h-5 w-5" />
              <span>Data secured with AES-256 system encryption.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
