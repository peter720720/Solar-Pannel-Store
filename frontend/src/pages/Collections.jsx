// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.jsx';
// import { Package, Trash2, Eye, ShoppingCart, Loader2, Info } from 'lucide-react';

// export default function Collections() {
//   const { user } = useAuth();
//   const isAdmin = user?.role === 'admin';

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 1. Fetch live uploaded products from your backend database
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/products');
//       if (res.ok) {
//         const data = await res.json();
//         setProducts(Array.isArray(data) ? data : []);
//       }
//     } catch (error) {
//       console.error("Failed fetching hardware listings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Optional: Admin can delete a product item directly from catalog catalog
//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this solar hardware product?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/products/${id}`, {
//         method: 'DELETE'
//       });
//       if (res.ok) {
//         setProducts(products.filter(item => item._id !== id));
//         alert("Product listing removed successfully.");
//       }
//     } catch (error) {
//       console.error("Failed deleting product:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div 
//       className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
//       style={{ backgroundImage: "url('/download (2).jpg')" }}
//     >
//       <div className="max-w-7xl mx-auto space-y-8">
        
//         {/* Top Header Glass Banner */}
//         <div className="p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl text-center max-w-3xl mx-auto animate-fade-in">
//           <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
//             Solar Solutions Catalog
//           </h1>
//           <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
//             {isAdmin 
//               ? "Administrative Catalog Control Center. View active listings or delete outdated inventory items." 
//               : "Explore premium high-efficiency solar energy items built to power your property independently."}
//           </p>
//         </div>

//         {/* Dynamic Display Grid Layer */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-32 text-gray-800 dark:text-gray-200 gap-3">
//             <Loader2 className="animate-spin h-10 w-10 text-amber-500" />
//             <p className="text-xs font-bold uppercase tracking-widest">Syncing active inventory systems...</p>
//           </div>
//         ) : products.length === 0 ? (
//           /* Empty Catalog Fallback View Screen */
//           <div className="max-w-md mx-auto text-center p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-800/30 rounded-2xl">
//             <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//             <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Products Found</h3>
//             <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
//               The solar database inventory is empty. 
//               {isAdmin && " Head back to your Admin Dashboard to select and upload your multi-image files."}
//             </p>
//             {isAdmin && (
//               <Link 
//                 to="/admin/dashboard" 
//                 className="mt-4 inline-block px-5 py-2 text-xs font-bold text-white bg-red-600 rounded-xl"
//               >
//                 Go to Upload Terminal
//               </Link>
//             )}
//           </div>
//         ) : (
//           /* Live Dynamic Multi-Product Systems Grid */
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
//             {products.map((product) => (
//               <div 
//                 key={product._id} 
//                 className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between"
//               >
//                 {/* Admin Delete Action Quick Float Toggle */}
//                 {isAdmin && (
//                   <button 
//                     onClick={() => handleDeleteProduct(product._id)}
//                     className="absolute top-3 right-3 z-20 bg-red-600 text-white p-2 rounded-xl shadow-lg hover:bg-red-700 transform active:scale-90 transition-all cursor-pointer"
//                     title="Remove System Listing"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 )}

//                 {/* Listing System Image Window Block */}
//                 <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-950 border-b border-white/10">
//                   <img 
//                     src={product.image || product.images?.[0] || '/placeholder-solar.jpg'} 
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     onError={(e) => { e.target.src = 'https://unsplash.com'; }}
//                   />
//                 </div>

//                 {/* Details Context Meta Section */}
//                 <div className="p-5 flex-grow flex flex-col justify-between">
//                   <div>
//                     <h4 className="font-black text-gray-900 dark:text-white text-base tracking-tight line-clamp-1">
//                       {product.name || 'High Efficiency Array System'}
//                     </h4>
//                     <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
//                       {product.description || 'Premium clean energy transformation hardware component specs.'}
//                     </p>
//                   </div>

//                   <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
//                     <div>
//                       <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Retail Value</span>
//                       <p className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">
//                         ₦{(product.price || 0).toLocaleString()}
//                       </p>
//                     </div>

//                     {/* Dynamic User/Admin Routing Buttons */}
//                     <Link 
//                       to={`/product/${product._id}`}
//                       className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all active:scale-95 ${
//                         isAdmin 
//                           ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/10' 
//                           : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10'
//                       }`}
//                     >
//                       {isAdmin ? <Info className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
//                       <span>{isAdmin ? 'Review Specs' : 'View System'}</span>
//                     </Link>
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Package, Trash2, Eye, Loader2, Info } from 'lucide-react';
import { API_BASE_URL } from '../config/api';
import getImageUrl from '../utils/getImageUrl';
import NotificationModal from '../components/NotificationModal.jsx';

export default function Collections() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Control States
  const [modal, setModal] = useState({ isOpen: false, targetId: null, message: '' });

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed fetching hardware listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger modal display instead of basic browser alert popup
  const openDeleteConfirmation = (id) => {
    setModal({
      isOpen: true,
      targetId: id,
      message: "Are you sure you want to delete this solar hardware product? This action cannot be undone."
    });
  };

  // Run actual fetch request only after custom confirmation action
  const confirmDeleteProduct = async () => {
    const id = modal.targetId;
    setModal({ isOpen: false, targetId: null, message: '' });
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setProducts(products.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Failed deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div 
      className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
      style={{ backgroundImage: "url('/download (2).jpg')" }}
    >
      {/* Premium Upgraded Modal replaces standard alert overlay */}
      <NotificationModal 
        isOpen={modal.isOpen}
        type="confirm"
        title="Confirm Removal"
        message={modal.message}
        onConfirm={confirmDeleteProduct}
        onCancel={() => setModal({ isOpen: false, targetId: null, message: '' })}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Glass Banner */}
        <div className="p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
            Solar Solutions Catalog
          </h1>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
            {isAdmin 
              ? "Administrative Catalog Control Center. View active listings or delete outdated inventory items." 
              : "Explore premium high-efficiency solar energy items built to power your property independently."}
          </p>
        </div>

        {/* Dynamic Display Grid Layer */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-800 dark:text-gray-200 gap-3">
            <Loader2 className="animate-spin h-10 w-10 text-amber-500" />
            <p className="text-xs font-bold uppercase tracking-widest">Syncing active inventory systems...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="max-w-md mx-auto text-center p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-800/30 rounded-2xl">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Products Found</h3>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
              The solar database inventory is empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between"
              >
                {isAdmin && (
                  <button 
                    onClick={() => openDeleteConfirmation(product._id)}
                    className="absolute top-3 right-3 z-20 bg-red-600 text-white p-2 rounded-xl shadow-lg hover:bg-red-700 transform active:scale-90 transition-all cursor-pointer"
                    title="Remove System Listing"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}

                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-950 border-b border-white/10">
                  <img
                    src={getImageUrl(product.image || product.images?.[0])}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = '/placeholder-solar.jpg'; }}
                  />
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white text-base tracking-tight line-clamp-1">
                      {product.name || 'High Efficiency Array System'}
                    </h4>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {product.description || 'Premium clean energy transformation hardware component specs.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Retail Value</span>
                      <p className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">
                        ₦{(product.price || 0).toLocaleString()}
                      </p>
                    </div>

                    <Link 
                      to={`/product/${product._id}`}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all active:scale-95 ${
                        isAdmin ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/10' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10'
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>{isAdmin ? 'Review Specs' : 'View System'}</span>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
