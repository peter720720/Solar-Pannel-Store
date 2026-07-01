// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Sun, Shield, Zap, Flame } from 'lucide-react';
// import { useAuth } from '../context/AuthContext.jsx';

// export default function Home() {
//   const { user } = useAuth();

//   return (
//     <div className="pt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
      
//       {/* Hero Section Container */}
//       <section className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
//         {/* Animated Badge */}
//         <div className="animate-fade-in bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-amber-500/20">
//           Clean Energy Transformation ☀️
//         </div>
        
//         {/* Animated Main Heading */}
//         <h1 className="animate-slide-up mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl max-w-4xl leading-tight">
//           Power Your Home With High-Efficiency{' '}
//           <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
//             Solar Solutions
//           </span>
//         </h1>
        
//         {/* Animated Description Paragraph */}
//         <p className="animate-slide-up mt-6 text-lg font-medium text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed [animation-delay:200ms]">
//           Reduce your electricity bills and protect your property against blackouts. Explore our collection of premium solar panels and book your deployment assessment instantly.
//         </p>

//         {/* Animated Action Button */}
//         <div className="animate-slide-up mt-10 [animation-delay:400ms]">
//           <Link
//             to={user ? "/collections" : "/signup"}
//             className="group flex items-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-xl shadow-amber-500/20 transform transition-all active:scale-95 duration-200 cursor-pointer"
//           >
//             <span>Shop Our Collection</span>
//             <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
//           </Link>
//         </div>
//       </section>

//       {/* Corporate Features Segment Grid Grid */}
//       <section className="animate-fade-in bg-gray-50 dark:bg-gray-950 border-t border-b border-gray-100 dark:border-gray-800/50 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 [animation-delay:600ms]">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
//             {/* Feature 1 */}
//             <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
//               <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit"><Zap className="h-6 w-6" /></div>
//               <h3 className="mt-4 text-lg font-bold">Maximum Output</h3>
//               <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">Engineered using premium monocrystalline cells to guarantee high energy absorption even on cloudy days.</p>
//             </div>

//             {/* Feature 2 */}
//             <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
//               <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit"><Shield className="h-6 w-6" /></div>
//               <h3 className="mt-4 text-lg font-bold">25-Year Warranty</h3>
//               <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">Built with heavy-duty weatherproof hardware designed to withstand extreme wind, hail, and storms.</p>
//             </div>

//             {/* Feature 3 */}
//             <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
//               <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit"><Flame className="h-6 w-6" /></div>
//               <h3 className="mt-4 text-lg font-bold">Smart Power Storage</h3>
//               <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">Pairs seamlessly with modern lithium battery management backups to keep your appliances powered all night.</p>
//             </div>

//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert, Package, Mail, LayoutDashboard, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div 
      className="pt-20 bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300 overflow-hidden min-h-screen"
      style={{ backgroundImage: "url('/download (2).jpg')" }}
    >
      
      {isAdmin ? (
        /* ================= RESTRICTED ADMIN VIEWPORT PANEL ================= */
        <section className="relative px-4 py-24 mx-auto max-w-4xl sm:px-6 lg:px-8 flex flex-col items-center text-center my-12 bg-gray-950/40 backdrop-blur-xl border border-red-500/30 rounded-3xl shadow-2xl animate-fade-in">
          
          <div className="animate-fade-in bg-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-red-500/30 flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Administrative Session Active</span>
          </div>
          
          <h1 className="animate-slide-up mt-6 text-4xl font-black tracking-tight sm:text-5xl max-w-3xl leading-tight text-white drop-shadow-md">
            Welcome Back, Commander
          </h1>
          
          <p className="animate-slide-up mt-4 text-base font-semibold text-gray-300 max-w-xl leading-relaxed">
            Your system metrics are operating normally. Use the quick launch shortcuts below to inspect customer logs or publish store inventory configurations.
          </p>

          {/* Quick Admin Control Terminal Shortcuts Grid */}
          <div className="animate-slide-up grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-10 max-w-2xl [animation-delay:200ms]">
            
            <Link to="/admin/dashboard" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center gap-2 transition-all">
              <LayoutDashboard className="h-6 w-6 text-red-400" />
              <span className="text-xs font-bold text-white">System Console</span>
            </Link>

            <Link to="/collections" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center gap-2 transition-all">
              <Package className="h-6 w-6 text-amber-400" />
              <span className="text-xs font-bold text-white">Manage Catalog</span>
            </Link>

            <Link to="/admin-message" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center gap-2 transition-all">
              <Mail className="h-6 w-6 text-blue-400" />
              <span className="text-xs font-bold text-white">Inbound Mail</span>
            </Link>

          </div>
        </section>
      ) : (
        /* ================= STANDARD CUSTOMER PUBLIC VIEWPORT PANEL ================= */
        <section className="relative px-4 py-24 mx-auto max-w-5xl sm:px-6 lg:px-8 flex flex-col items-center text-center my-12 bg-white/20 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-800/30 rounded-3xl shadow-2xl">
          
          <div className="animate-fade-in bg-amber-500 text-white dark:bg-amber-500/20 dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
            Clean Energy Transformation ☀️
          </div>
          
          <h1 className="animate-slide-up mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl max-w-4xl leading-tight text-gray-900 dark:text-white drop-shadow-sm">
            Power Your Home With High-Efficiency{' '}
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              Solar Solutions
            </span>
          </h1>
          
          <p className="animate-slide-up mt-6 text-lg font-semibold text-gray-800 dark:text-gray-200 max-w-2xl leading-relaxed [animation-delay:200ms] drop-shadow-sm">
            Reduce your electricity bills and protect your property against blackouts. Explore our collection of premium solar panels and book your deployment assessment instantly.
          </p>

          <div className="animate-slide-up mt-10 [animation-delay:400ms]">
            <Link
              to={user ? "/collections" : "/signup"}
              className="group flex items-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-xl shadow-amber-500/30 transform transition-all active:scale-95 duration-200 cursor-pointer"
            >
              <span>Shop Our Collection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </section>
      )}

      {/* Corporate Features Segment Container (Only shown to customers) */}
      {!isAdmin && (
        <section className="animate-fade-in mx-auto max-w-7xl mb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 [animation-delay:600ms]">
          <div className="p-8 md:p-12 bg-white/10 dark:bg-gray-950/20 backdrop-blur-md border border-white/10 dark:border-gray-800/20 rounded-3xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="p-6 bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-800/40 shadow-sm">
                <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl w-fit"><Sun className="h-6 w-6" /></div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Maximum Output</h3>
                <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">Engineered using premium monocrystalline cells to guarantee high energy absorption even on cloudy days.</p>
              </div>

              <div className="p-6 bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-800/40 shadow-sm">
                <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl w-fit"><Sun className="h-6 w-6" /></div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">25-Year Warranty</h3>
                <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">Built with heavy-duty weatherproof hardware designed to withstand extreme wind, hail, and storms.</p>
              </div>

              <div className="p-6 bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-800/40 shadow-sm">
                <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl w-fit"><Sun className="h-6 w-6" /></div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Smart Storage</h3>
                <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">Pairs seamlessly with modern lithium battery backups to keep appliances powered all night.</p>
              </div>

            </div>
          </div>
        </section>
      )}

    </div>
  );
}
