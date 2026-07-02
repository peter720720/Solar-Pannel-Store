// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   ShieldAlert, 
//   Package, 
//   Mail, 
//   ShoppingBag, 
//   Users, 
//   PlusCircle, 
//   TrendingUp,
//   ArrowRight,
//   Loader2
// } from 'lucide-react';

// export default function AdminDashboard() {
//   // Manage dynamic data pulled from your backend endpoints
//   const [stats, setStats] = useState({ products: 0, messages: 0, orders: 0, users: 0 });
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
  
//   // Create a hidden reference pointer to capture local file system explorer triggers
//   const fileInputRef = useRef(null);

//   // Pull real metrics from database modules on initial canvas paint lifecycle
//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       try {
//         // Parallel load all route data from your Express backend routes controller configuration
//         const [prodRes, userRes, msgRes, orderRes] = await Promise.all([
//           fetch('http://localhost:5000/api/products'),
//           fetch('http://localhost:5000/api/users'),
//           fetch('http://localhost:5000/api/messages'),
//           fetch('http://localhost:5000/api/orders')
//         ]);

//         const productsData = prodRes.ok ? await prodRes.json() : [];
//         const usersData = userRes.ok ? await userRes.json() : [];
//         const messagesData = msgRes.ok ? await msgRes.json() : [];
//         const ordersData = orderRes.ok ? await orderRes.json() : [];

//         // Count array entry sets safely to populate real numeric UI text nodes
//         setStats({
//           products: Array.isArray(productsData) ? productsData.length : 0,
//           users: Array.isArray(usersData) ? usersData.length : 0,
//           messages: Array.isArray(messagesData) ? messagesData.length : 0,
//           orders: Array.isArray(ordersData) ? ordersData.length : 0
//         });
//       } catch (error) {
//         console.error("Failed fetching live system database counts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardMetrics();
//   }, []);

//   // Triggered right when the admin chooses images from their explorer window
//   const handleFileChange = async (e) => {
//     const selectedFiles = e.target.files;
//     if (!selectedFiles || selectedFiles.length === 0) return;

//     setUploading(true);
    
//     // Prepare multi-part structural form parameters to forward down to product routes
//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append('images', selectedFiles[i]);
//     }

//     try {
//       // Replace URL target string with your exact image storage backend route logic if needed
//       const response = await fetch('http://localhost:5000/api/products/upload-multiple', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Hardware listing files uploading rejected.');
      
//       alert(`${selectedFiles.length} files dispatched successfully!`);
      
//       // Refresh component window data parameters
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       alert('Files selected. Complete backend file destination setup inside product routes to store.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Helper code to click the invisible browser native file tag input element
//   const openFileExplorer = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <div 
//       className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
//       style={{ backgroundImage: "url('/download (2).jpg')" }}
//     >
      
//       {/* Native Browser hidden input allowing unlimited item selection on desktop and mobile platforms */}
//       <input 
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         multiple
//         accept="image/*"
//         className="hidden"
//       />

//       <div className="max-w-7xl mx-auto space-y-8">
        
//         {/* Top Hero Glass Welcome Header */}
//         <div className="p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
//           <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
//             <div className="p-4 bg-red-500/20 text-red-500 rounded-2xl w-fit">
//               <ShieldAlert className="h-8 w-8" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
//                 Admin Command Console
//               </h1>
//               <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
//                 Manage your solar store infrastructure, product listings, orders, and messages.
//               </p>
//             </div>
//           </div>
          
//           <button
//             onClick={openFileExplorer}
//             disabled={uploading}
//             className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-600/20 active:scale-95 transition-all duration-150 whitespace-nowrap cursor-pointer disabled:opacity-50"
//           >
//             {uploading ? (
//               <Loader2 className="animate-spin h-4 w-4" />
//             ) : (
//               <PlusCircle className="h-4 w-4" />
//             )}
//             <span>{uploading ? 'Uploading Items...' : 'Add New Product'}</span>
//           </button>
//         </div>

//         {/* Metric Overview Grid Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          
//           {/* Live Stat Item 1: Products */}
//           <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-md hover:shadow-lg transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Products</p>
//                 <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
//                   {loading ? '...' : stats.products}
//                 </h3>
//               </div>
//               <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl"><Package className="h-5 w-5" /></div>
//             </div>
//           </div>

//           {/* Live Stat Item 2: Customer Messages */}
//           <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-md hover:shadow-lg transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Inbound Messages</p>
//                 <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
//                   {loading ? '...' : stats.messages}
//                 </h3>
//               </div>
//               <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl"><Mail className="h-5 w-5" /></div>
//             </div>
//           </div>

//           {/* Live Stat Item 3: System Deployments */}
//           <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-md hover:shadow-lg transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Active Orders</p>
//                 <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
//                   {loading ? '...' : stats.orders}
//                 </h3>
//               </div>
//               <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl"><ShoppingBag className="h-5 w-5" /></div>
//             </div>
//           </div>

//           {/* Live Stat Item 4: Registered Users */}
//           <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-md hover:shadow-lg transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Users</p>
//                 <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
//                   {loading ? '...' : stats.users}
//                 </h3>
//               </div>
//               <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl"><Users className="h-5 w-5" /></div>
//             </div>
//           </div>

//         </div>

//         {/* Management Module Control Panel Grid Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up [animation-delay:200ms]">
          
//           {/* Action Module Box 1: Inventory */}
//           <div className="lg:col-span-2 p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl flex flex-col justify-between">
//             <div>
//               <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4">
//                 <TrendingUp className="h-5 w-5 text-red-500" />
//                 <h4 className="text-lg font-extrabold">Inventory & Catalog Controls</h4>
//               </div>
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
//                 Review active hardware specifications, tweak retail values, alter inventory levels, and deploy fresh monocrystalline cell selections straight to the buyer catalog screens.
//               </p>
//             </div>
//             <Link 
//               to="/collections" 
//               className="inline-flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-500 w-fit group"
//             >
//               <span>Go to Product Catalog</span>
//               <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>

//           {/* Action Module Box 2: Messages Container */}
//           <div className="p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl flex flex-col justify-between">
//             <div>
//               <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4">
//                 <Mail className="h-5 w-5 text-red-500" />
//                 <h4 className="text-lg font-extrabold">Inbound Consultations</h4>
//               </div>
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
//                 Read submitted feedback inquiries and instant solar site evaluations requested by site users.
//               </p>
//             </div>
//             <Link 
//               to="/messages" 
//               className="inline-flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-500 w-fit group"
//             >
//               <span>Review Messages Inbox</span>
//               <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   ShieldAlert, 
//   Package, 
//   Mail, 
//   ShoppingBag, 
//   Users, 
//   PlusCircle, 
//   TrendingUp,
//   ArrowRight,
//   Loader2
// } from 'lucide-react';

// export default function AdminDashboard() {
//   // Manage dynamic data pulled from your backend endpoints
//   const [stats, setStats] = useState({ products: 0, messages: 0, orders: 0, users: 0 });
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
  
//   // Create a hidden reference pointer to capture local file system explorer triggers
//   const fileInputRef = useRef(null);

//   // Pull real metrics from database modules on initial canvas paint lifecycle
//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       try {
//         // Parallel load all route data from your Express backend routes controller configuration
//         const [prodRes, userRes, msgRes, orderRes] = await Promise.all([
//           fetch('http://localhost:5000/api/products'),
//           fetch('http://localhost:5000/api/users'),
//           fetch('http://localhost:5000/api/messages'),
//           fetch('http://localhost:5000/api/orders')
//         ]);

//         const productsData = prodRes.ok ? await prodRes.json() : [];
//         const usersData = userRes.ok ? await userRes.json() : [];
//         const messagesData = msgRes.ok ? await msgRes.json() : [];
//         const ordersData = orderRes.ok ? await orderRes.json() : [];

//         // Count array entry sets safely to populate real numeric UI text nodes
//         setStats({
//           products: Array.isArray(productsData) ? productsData.length : 0,
//           users: Array.isArray(usersData) ? usersData.length : 0,
//           messages: Array.isArray(messagesData) ? messagesData.length : 0,
//           orders: Array.isArray(ordersData) ? ordersData.length : 0
//         });
//       } catch (error) {
//         console.error("Failed fetching live system database counts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardMetrics();
//   }, []);

//   // Triggered right when the admin chooses images from their explorer window
//   const handleFileChange = async (e) => {
//     const selectedFiles = e.target.files;
//     if (!selectedFiles || selectedFiles.length === 0) return;

//     setUploading(true);
    
//     // Prepare multi-part structural form parameters to forward down to product routes
//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append('images', selectedFiles[i]);
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/products/upload-multiple', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Hardware listing files uploading rejected.');
      
//       // Professional production-ready alert popup message text string
//       alert("Products uploaded successfully!");
      
//       // Refresh component window data parameters
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       alert('Error saving product images. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Helper code to click the invisible browser native file tag input element
//   const openFileExplorer = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <div 
//       className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
//       style={{ backgroundImage: "url('/download (2).jpg')" }}
//     >
      
//       {/* Native Browser hidden input allowing unlimited item selection on desktop and mobile platforms */}
//       <input 
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         multiple
//         accept="image/*"
//         className="hidden"
//       />

//       <div className="max-w-7xl mx-auto space-y-8">
        
//         {/* Top Hero Glass Welcome Header */}
//         <div className="p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
//           <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
//             <div className="p-4 bg-red-500/20 text-red-500 rounded-2xl w-fit">
//               <ShieldAlert className="h-8 w-8" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
//                 Admin Command Console
//               </h1>
//               <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
//                 Manage your solar store infrastructure, product listings, orders, and messages.
//               </p>
//             </div>
//           </div>
          
//           <button
//             onClick={openFileExplorer}
//             disabled={uploading}
//             className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-600/20 active:scale-95 transition-all duration-150 whitespace-nowrap cursor-pointer disabled:opacity-50"
//           >
//             {uploading ? (
//               <Loader2 className="animate-spin h-4 w-4" />
//             ) : (
//               <PlusCircle className="h-4 w-4" />
//             )}
//             <span>{uploading ? 'Uploading Items...' : 'Add New Product'}</span>
//           </button>
//         </div>

//         {/* Metric Overview Grid Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          
//           {/* Live Stat Item 1: Products */}
//           <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-md hover:shadow-lg transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Products</p>
//                 <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
//                   {loading ? '...' : stats.products}
//                 </h3>
//               </div>
//               <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl"><Package className="h-5 w-5" /></div>
//             </div>
//           </div>

//           {/* Live Stat Item 2: Customer Messages */}
//           <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-md hover:shadow-lg transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Inbound Messages</p>
//                 <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
//                   {loading ? '...' : stats.messages}
//                 </h3>
//               </div>
//               <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl"><Mail className="h-5 w-5" /></div>
//             </div>
//           </div>

//           {/* Live Stat Item 3: System Deployments */}
//           <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-md hover:shadow-lg transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Active Orders</p>
//                 <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
//                   {loading ? '...' : stats.orders}
//                 </h3>
//               </div>
//               <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl"><ShoppingBag className="h-5 w-5" /></div>
//             </div>
//           </div>

//           {/* Live Stat Item 4: Registered Users */}
//           <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl shadow-md hover:shadow-lg transition-all">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Users</p>
//                 <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
//                   {loading ? '...' : stats.users}
//                 </h3>
//               </div>
//               <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl"><Users className="h-5 w-5" /></div>
//             </div>
//           </div>

//         </div>

//         {/* Management Module Control Panel Grid Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up [animation-delay:200ms]">
          
//           {/* Action Module Box 1: Inventory */}
//           <div className="lg:col-span-2 p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl flex flex-col justify-between">
//             <div>
//               <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4">
//                 <TrendingUp className="h-5 w-5 text-red-500" />
//                 <h4 className="text-lg font-extrabold">Inventory & Catalog Controls</h4>
//               </div>
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
//                 Review active hardware specifications, tweak retail values, alter inventory levels, and deploy fresh monocrystalline cell selections straight to the buyer catalog screens.
//               </p>
//             </div>
//             <Link 
//               to="/collections" 
//               className="inline-flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-500 w-fit group"
//             >
//               <span>Go to Product Catalog</span>
//               <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>

//           {/* Action Module Box 2: Messages Container */}
//           <div className="p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl flex flex-col justify-between">
//             <div>
//               <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4">
//                 <Mail className="h-5 w-5 text-red-500" />
//                 <h4 className="text-lg font-extrabold">Inbound Consultations</h4>
//               </div>
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
//                 Read submitted feedback inquiries and instant solar site evaluations requested by site users.
//               </p>
//             </div>
            
//             {/* Action Module Box 2: Messages Container Link Update */}
//             <Link 
//               to="/admin-message" 
//               className="inline-flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-500 w-fit group"
//             >
//               <span>Review Messages Inbox</span>
//               <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, Package, Mail, ShoppingBag, Users, 
  PlusCircle, TrendingUp, ArrowRight, Loader2, X, DollarSign 
} from 'lucide-react';
import NotificationModal from '../components/NotificationModal.jsx';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, messages: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Custom states to handle the pre-upload configuration panel
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [successModal, setSuccessModal] = useState(false);
  
  const fileInputRef = useRef(null);

  const { token } = useAuth();

  useEffect(() => {
    let intervalId;

    const fetchDashboardMetrics = async () => {
      try {
        setLoading(true);
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [prodRes, userRes, msgRes, orderRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products`, { headers }),
          fetch(`${API_BASE_URL}/api/users`, { headers }),
          fetch(`${API_BASE_URL}/api/messages`, { headers }),
          fetch(`${API_BASE_URL}/api/orders`, { headers })
        ]);

        const productsData = prodRes.ok ? await prodRes.json() : [];
        const usersData = userRes.ok ? await userRes.json() : [];
        const messagesData = msgRes.ok ? await msgRes.json() : [];
        const ordersData = orderRes.ok ? await orderRes.json() : [];

        setStats({
          products: Array.isArray(productsData) ? productsData.length : 0,
          users: Array.isArray(usersData) ? usersData.length : 0,
          messages: Array.isArray(messagesData) ? messagesData.length : 0,
          orders: Array.isArray(ordersData) ? ordersData.length : 0
        });
      } catch (error) {
        console.error("Failed fetching database metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleMessageSubmitted = () => {
      if (token) fetchDashboardMetrics();
    };

    if (token) {
      fetchDashboardMetrics();
      intervalId = setInterval(fetchDashboardMetrics, 15000);
      window.addEventListener('messageSubmitted', handleMessageSubmitted);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('messageSubmitted', handleMessageSubmitted);
    };
  }, [token]);

  // Intercept raw file picks and map them into locally editable object drafts
  const handleFileSelectionIntercept = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newDrafts = files.map((file) => ({
      file: file,
      previewUrl: URL.createObjectURL(file),
      name: `Solar System ${Math.floor(100 + Math.random() * 900)}`,
      price: '750000', // Default starter price placeholder
      description: 'Premium monocrystalline cell transformation hardware system layout.'
    }));

    setSelectedDrafts((prev) => [...prev, ...newDrafts]);
    if (fileInputRef.current) fileInputRef.current.value = ''; // Reset uploader input
  };

  // Modify target values inside the dynamic draft array matrix
  const updateDraftField = (index, field, value) => {
    setSelectedDrafts((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // Filter out a specific image item if the admin changes their mind
  const removeDraftItem = (index) => {
    setSelectedDrafts((prev) => {
      const target = prev[index];
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Dispatch final configured batch with customizable prices attached down to backend
  const handleBatchPublishSubmit = async (e) => {
    e.preventDefault();
    if (selectedDrafts.length === 0) return;

    setUploading(true);
    const formData = new FormData();

    // Bundle files and text arrays in matched ordering pairs
    selectedDrafts.forEach((draft) => {
      formData.append('images', draft.file);
      formData.append('names', draft.name);
      formData.append('prices', draft.price);
      formData.append('descriptions', draft.description);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/upload-multiple`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Multi-product setup publish rejected by server.');
      
      // Cleanup garbage text memory object URLs
      selectedDrafts.forEach((d) => URL.revokeObjectURL(d.previewUrl));
      setSelectedDrafts([]);
      setSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert('Error saving custom priced system inventory listings.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div 
      className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
      style={{ backgroundImage: "url('/download (2).jpg')" }}
    >
      <NotificationModal 
        isOpen={successModal}
        type="success"
        title="Upload Complete"
        message="All customized solar configurations have been saved successfully!"
        onConfirm={() => window.location.reload()}
        onCancel={() => window.location.reload()}
      />

      <input type="file" ref={fileInputRef} onChange={handleFileSelectionIntercept} multiple accept="image/*" className="hidden" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Shell */}
        <div className="p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="p-4 bg-red-500/20 text-red-500 rounded-2xl w-fit"><ShieldAlert className="h-8 w-8" /></div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Admin Command Console</h1>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">Configure your product pricing matrix before publishing live listings.</p>
            </div>
          </div>
          <button onClick={() => fileInputRef.current.click()} disabled={uploading} className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg cursor-pointer disabled:opacity-50">
            <PlusCircle className="h-4 w-4" />
            <span>Upload Product Items</span>
          </button>
        </div>

        {/* Dynamic Pre-Upload Editing Drawer Shell Container */}
        {selectedDrafts.length > 0 && (
          <div className="p-6 bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-dashed border-amber-500/40 rounded-3xl shadow-2xl animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Pending Verification Queue</h3>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-0.5">Assign descriptive names and pricing values for each selected item below.</p>
              </div>
              <button onClick={() => setSelectedDrafts([])} className="text-xs font-bold text-gray-500 hover:text-red-500">Clear All</button>
            </div>

            {/* Dynamic Slider/Carousel Workaround Grid Box layout layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedDrafts.map((draft, idx) => (
                <div key={idx} className="p-4 bg-white/70 dark:bg-gray-950/70 rounded-2xl border border-white/20 relative flex flex-col gap-3">
                  <button type="button" onClick={() => removeDraftItem(idx)} className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-lg z-10"><X className="h-3.5 w-3.5" /></button>
                  
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-900 border border-white/10">
                    <img src={draft.previewUrl} alt="preview" className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">System Code/Name</label>
                      <input type="text" value={draft.name} onChange={(e) => updateDraftField(idx, 'name', e.target.value)} className="w-full mt-1 px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-semibold" />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Retail Value (₦ Pricing)</label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-2 text-xs font-bold text-amber-500">₦</span>
                        <input type="number" value={draft.price} onChange={(e) => updateDraftField(idx, 'price', e.target.value)} className="w-full pl-7 pr-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-black text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleBatchPublishSubmit} disabled={uploading} className="w-full py-3.5 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm">
              {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : <Package className="h-4 w-4" />}
              <span>{uploading ? 'Processing Server Upload Matrix...' : `Publish Selected Batch (${selectedDrafts.length} Products)`}</span>
            </button>
          </div>
        )}

        {/* Metric Overview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 rounded-2xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Products</p>
                <h3 className="text-3xl font-black mt-2">{loading ? '...' : stats.products}</h3>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl"><Package className="h-5 w-5" /></div>
            </div>
          </div>

          <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 rounded-2xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Inbound Messages</p>
                <h3 className="text-3xl font-black mt-2">{loading ? '...' : stats.messages}</h3>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl"><Mail className="h-5 w-5" /></div>
            </div>
          </div>

          <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 rounded-2xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Orders</p>
                <h3 className="text-3xl font-black mt-2">{loading ? '...' : stats.orders}</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl"><ShoppingBag className="h-5 w-5" /></div>
            </div>
          </div>

          <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 rounded-2xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Users</p>
                <h3 className="text-3xl font-black mt-2">{loading ? '...' : stats.users}</h3>
              </div>
              <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl"><Users className="h-5 w-5" /></div>
            </div>
          </div>
        </div>

        {/* Lower Action boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4"><TrendingUp className="h-5 w-5 text-red-500" /><h4 className="text-lg font-extrabold">Inventory Controls</h4></div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-6">Review system specs, update product catalog prices, and view client screens.</p>
            </div>
            <Link to="/collections" className="inline-flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 w-fit group"><span>Go to Product Catalog</span><ArrowRight className="h-4 w-4 group-hover:translate-x-1" /></Link>
          </div>

          <div className="p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4"><Mail className="h-5 w-5 text-red-500" /><h4 className="text-lg font-extrabold">Inbound Consultations</h4></div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-6">Read user submission evaluation files directly from database lists.</p>
            </div>
            <Link to="/admin-message" className="inline-flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 w-fit group"><span>Review Messages Inbox</span><ArrowRight className="h-4 w-4 group-hover:translate-x-1" /></Link>
          </div>
        </div>

      </div>
    </div>
  );
}
