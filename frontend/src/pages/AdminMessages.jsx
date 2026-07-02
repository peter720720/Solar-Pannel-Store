// import React, { useState, useEffect } from 'react';
// import { Mail, MessageSquare, Loader2, Trash2, ArrowLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function AdminMessages() {
//   const [inboxMessages, setInboxMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchInbox = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/messages');
//       if (res.ok) {
//         const data = await res.json();
//         setInboxMessages(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error("Inbox data download rejected:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteMessage = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this customer record?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/messages/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         setInboxMessages(inboxMessages.filter(msg => msg._id !== id));
//       }
//     } catch (err) {
//       console.error("Delete operation failed:", err);
//     }
//   };

//   useEffect(() => {
//     fetchInbox();
//   }, []);

//   return (
//     <div 
//       className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed"
//       style={{ backgroundImage: "url('/download (2).jpg')" }}
//     >
//       <div className="max-w-4xl mx-auto">
        
//         <div className="flex items-center justify-between mb-8">
//           <Link to="/AdminDashboard" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
//             <ArrowLeft className="h-4 w-4" />
//             <span>Dashboard</span>
//           </Link>
//           <span className="text-xs font-black bg-red-500/20 text-red-500 px-4 py-1.5 rounded-full">
//             {inboxMessages.length} Client Messages
//           </span>
//         </div>

//         <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl">
//           <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
//             <Mail className="text-red-500 h-6 w-6" />
//             <span>Admin Submissions Box</span>
//           </h2>

//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20 text-gray-700 dark:text-gray-300 gap-2">
//               <Loader2 className="animate-spin h-8 w-8 text-red-500" />
//               <p className="text-xs font-bold uppercase tracking-wider">Syncing dashboard logs...</p>
//             </div>
//           ) : inboxMessages.length === 0 ? (
//             <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl">
//               <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//               <p className="text-base font-bold text-gray-800 dark:text-gray-200">No client files found</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {inboxMessages.map((msg) => (
//                 <div key={msg._id} className="p-5 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-sm relative group transition-all">
//                   <button 
//                     onClick={() => handleDeleteMessage(msg._id)}
//                     className="absolute top-5 right-5 text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                   <div className="pr-10">
//                     <h4 className="font-bold text-gray-900 dark:text-white text-base">{msg.name}</h4>
//                     <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">📧 {msg.email} | 📞 {msg.phone}</p>
//                     <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/5 p-4 rounded-xl leading-relaxed">
//                       {msg.message}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Mail, MessageSquare, Loader2, Trash2, ArrowLeft, Send, User, CornerUpRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function AdminMessages() {
//   const [inboxMessages, setInboxMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Selected client for handling responses
//   const [activeReply, setActiveReply] = useState(null);
//   const [replyText, setReplyText] = useState('');
//   const [sendingReply, setSendingReply] = useState(false);

//   const fetchInbox = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/messages');
//       if (res.ok) {
//         const data = await res.json();
//         setInboxMessages(Array.isArray(data) ? data : []);
//         if (data.length > 0 && !activeReply) setActiveReply(data[0]);
//       }
//     } catch (err) {
//       console.error("Inbox data download rejected:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteMessage = async (id, e) => {
//     e.stopPropagation(); // Avoid switching selection when clicking delete
//     if (!window.confirm("Delete this consultation record?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/messages/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         const remaining = inboxMessages.filter(msg => msg._id !== id);
//         setInboxMessages(remaining);
//         if (activeReply?._id === id) setActiveReply(remaining[0] || null);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSendReply = async (e) => {
//     e.preventDefault();
//     if (!replyText.trim() || !activeReply) return;
//     setSendingReply(true);

//     try {
//       // Mock sending service, can hook into backend mailing routes node service
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       alert(`Reply successfully dispatched to ${activeReply.email}`);
//       setReplyText('');
//     } catch (err) {
//       alert("Error sending reply dispatch notification.");
//     } finally {
//       setSendingReply(false);
//     }
//   };

//   useEffect(() => {
//     fetchInbox();
//   }, []);

//   return (
//     <div 
//       className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed"
//       style={{ backgroundImage: "url('/download (2).jpg')" }}
//     >
//       <div className="max-w-7xl mx-auto">
        
//         <div className="flex items-center justify-between mb-8 animate-fade-in">
//           <Link to="/AdminDashboard" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
//             <ArrowLeft className="h-4 w-4" />
//             <span>Return to Dashboard</span>
//           </Link>
//           <span className="text-xs font-black bg-red-500/20 text-red-500 px-4 py-1.5 rounded-full">
//             Control Room Terminal
//           </span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
//           {/* LEFT SIDE: ADMIN DISPATCH REPLY PANEL */}
//           <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-slide-up">
//             <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
//               <CornerUpRight className="text-red-500 h-5 w-5" />
//               <span>Compose Consultation Response</span>
//             </h3>

//             {activeReply ? (
//               <form onSubmit={handleSendReply} className="space-y-4">
//                 <div className="p-4 bg-white/40 dark:bg-gray-950/40 rounded-xl border border-white/10">
//                   <p className="text-xs font-bold text-gray-400 uppercase">Responding To:</p>
//                   <p className="text-sm font-black text-gray-900 dark:text-white mt-1">{activeReply.name}</p>
//                   <p className="text-xs font-semibold text-gray-500 mt-0.5">📧 {activeReply.email}</p>
//                   <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 italic border-l-2 border-red-500 pl-3">
//                     "{activeReply.message}"
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">Message Body</label>
//                   <textarea
//                     required
//                     rows="6"
//                     value={replyText}
//                     onChange={(e) => setReplyText(e.target.value)}
//                     placeholder="Type official consultation booking proposal guidelines..."
//                     className="w-full px-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
//                   />
//                 </div>

//                 <button type="submit" disabled={sendingReply} className="w-full py-3.5 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xl shadow-red-600/20 transform transition active:scale-[0.98] duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm">
//                   {sendingReply ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
//                   <span>{sendingReply ? 'Dispatching Message...' : 'Send Official Response'}</span>
//                 </button>
//               </form>
//             ) : (
//               <p className="text-sm text-gray-500 font-semibold text-center py-10">Select an active message from the inbox console to formulate a response.</p>
//             )}
//           </div>

//           {/* RIGHT SIDE: ADMIN INBOX CONSOLE */}
//           <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-slide-up [animation-delay:100ms] flex flex-col max-h-[600px]">
//             <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Mail className="text-red-500 h-5 w-5" />
//                 <span>Admin Inbox Console</span>
//               </div>
//               <span className="text-xs font-black bg-red-500/20 text-red-500 px-3 py-1 rounded-full">
//                 {inboxMessages.length} Pending
//               </span>
//             </h3>

//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-20 text-gray-700 dark:text-gray-300 gap-2">
//                 <Loader2 className="animate-spin h-8 w-8 text-red-500" />
//                 <p className="text-xs font-bold uppercase tracking-wider">Syncing lists...</p>
//               </div>
//             ) : inboxMessages.length === 0 ? (
//               <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl">
//                 <MessageSquare className="h-10 w-10 text-gray-400 mx-auto mb-2" />
//                 <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Inbox is empty</p>
//               </div>
//             ) : (
//               <div className="overflow-y-auto space-y-3 pr-1 custom-scrollbar">
//                 {inboxMessages.map((msg) => (
//                   <div 
//                     key={msg._id} 
//                     onClick={() => setActiveReply(msg)}
//                     className={`p-4 rounded-2xl shadow-sm border transition-all cursor-pointer relative group ${
//                       activeReply?._id === msg._id 
//                         ? 'bg-white/90 dark:bg-gray-900/90 border-red-500/50 scale-[1.01]' 
//                         : 'bg-white/60 dark:bg-gray-900/60 border-white/20 hover:bg-white/80'
//                     }`}
//                   >
//                     <button onClick={(e) => handleDeleteMessage(msg._id, e)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer">
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                     <div className="pr-6">
//                       <h4 className="font-bold text-gray-900 dark:text-white text-sm">{msg.name}</h4>
//                       <p className="text-[11px] font-semibold text-gray-400 mt-0.5 truncate">{msg.email}</p>
//                       <p className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-300 line-clamp-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg">
//                         {msg.message}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Loader2, Trash2, ArrowLeft, Send, User, CornerUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminMessages() {
  const [inboxMessages, setInboxMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selected client for handling responses
  const [activeReply, setActiveReply] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const { token } = useAuth();

  const fetchInbox = async () => {
    setLoading(true);
    try {
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/api/messages`, { headers });
      if (res.ok) {
        const data = await res.json();
        setInboxMessages(Array.isArray(data) ? data : []);
        if (data.length > 0 && !activeReply) setActiveReply(data[0]);
      } else {
        console.error('Failed fetching inbox:', res.status);
      }
    } catch (err) {
      console.error("Inbox data download rejected:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id, e) => {
    e.stopPropagation(); // Avoid switching selection when clicking delete
    if (!window.confirm("Delete this consultation record?")) return;
    try {
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/api/messages/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        const remaining = inboxMessages.filter(msg => msg._id !== id);
        setInboxMessages(remaining);
        if (activeReply?._id === id) setActiveReply(remaining[0] || null);
      } else {
        console.error('Delete failed:', res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeReply) return;
    setSendingReply(true);

    try {
      // Mock sending service, can hook into backend mailing routes node service
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Reply successfully dispatched to ${activeReply.email}`);
      setReplyText('');
    } catch (err) {
      alert("Error sending reply dispatch notification.");
    } finally {
      setSendingReply(false);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  return (
    <div 
      className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/download (2).jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          {/* Link completely updated to match the correct router configuration */}
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>
          <span className="text-xs font-black bg-red-500/20 text-red-500 px-4 py-1.5 rounded-full">
            Control Room Terminal
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT SIDE: ADMIN DISPATCH REPLY PANEL */}
          <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-slide-up">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CornerUpRight className="text-red-500 h-5 w-5" />
              <span>Compose Consultation Response</span>
            </h3>

            {activeReply ? (
              <form onSubmit={handleSendReply} className="space-y-4">
                <div className="p-4 bg-white/40 dark:bg-gray-950/40 rounded-xl border border-white/10">
                  <p className="text-xs font-bold text-gray-400 uppercase">Responding To:</p>
                  <p className="text-sm font-black text-gray-900 dark:text-white mt-1">{activeReply.name}</p>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">📧 {activeReply.email}</p>
                  <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 italic border-l-2 border-red-500 pl-3">
                    "{activeReply.message}"
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">Message Body</label>
                  <textarea
                    required
                    rows="6"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type official consultation booking proposal guidelines..."
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/50 rounded-xl font-semibold text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
                  />
                </div>

                <button type="submit" disabled={sendingReply} className="w-full py-3.5 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xl shadow-red-600/20 transform transition active:scale-[0.98] duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm">
                  {sendingReply ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                  <span>{sendingReply ? 'Dispatching Message...' : 'Send Official Response'}</span>
                </button>
              </form>
            ) : (
              <p className="text-sm text-gray-500 font-semibold text-center py-10">Select an active message from the inbox console to formulate a response.</p>
            )}
          </div>

          {/* RIGHT SIDE: ADMIN INBOX CONSOLE */}
          <div className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl p-8 shadow-2xl animate-slide-up [animation-delay:100ms] flex flex-col max-h-[600px]">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="text-red-500 h-5 w-5" />
                <span>Admin Inbox Console</span>
              </div>
              <span className="text-xs font-black bg-red-500/20 text-red-500 px-3 py-1 rounded-full">
                {inboxMessages.length} Pending
              </span>
            </h3>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-700 dark:text-gray-300 gap-2">
                <Loader2 className="animate-spin h-8 w-8 text-red-500" />
                <p className="text-xs font-bold uppercase tracking-wider">Syncing lists...</p>
              </div>
            ) : inboxMessages.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl">
                <MessageSquare className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Inbox is empty</p>
              </div>
            ) : (
              <div className="overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {inboxMessages.map((msg) => (
                  <div 
                    key={msg._id} 
                    onClick={() => setActiveReply(msg)}
                    className={`p-4 rounded-2xl shadow-sm border transition-all cursor-pointer relative group ${
                      activeReply?._id === msg._id 
                        ? 'bg-white/90 dark:bg-gray-900/90 border-red-500/50 scale-[1.01]' 
                        : 'bg-white/60 dark:bg-gray-900/60 border-white/20 hover:bg-white/80'
                    }`}
                  >
                    <button onClick={(e) => handleDeleteMessage(msg._id, e)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="pr-6">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{msg.name}</h4>
                      <p className="text-[11px] font-semibold text-gray-400 mt-0.5 truncate">{msg.email}</p>
                      <p className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-300 line-clamp-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
