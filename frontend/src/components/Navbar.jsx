// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.jsx';
// import { useTheme } from '../context/ThemeContext.jsx';
// import { Menu, X, Sun, Moon, SunDim, LogOut } from 'lucide-react';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const { darkMode, toggleTheme } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     setIsOpen(false);
//     navigate('/');
//   };

//   const isActive = (path) => location.pathname === path;

//   const linkClass = (path) => `
//     px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer
//     ${isActive(path) 
//       ? 'text-amber-500 bg-amber-500/10' 
//       : 'text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400'}
//   `;

//   const mobileLinkClass = (path) => `
//     block px-4 py-3 rounded-md text-base font-bold tracking-wide transition-colors duration-300 cursor-pointer
//     ${isActive(path) 
//       ? 'text-amber-500 bg-amber-500/10 pl-6 border-l-4 border-amber-500' 
//       : 'text-gray-700 dark:text-gray-300 hover:text-amber-500 hover:bg-gray-50 dark:hover:bg-gray-800'}
//   `;

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
          
//           {/* Brand Logo Link with pointer pointer */}
//           <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
//             <SunDim className="h-8 w-8 text-amber-500 animate-spin-slow group-hover:scale-110 transition-transform" />
//             <span className="text-xl font-black bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent tracking-tighter uppercase">
//               SolarStore
//             </span>
//           </Link>

//           {/* Desktop Navigation Links links */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link to="/" className={linkClass('/')}>Home</Link>
            
//             {user ? (
//               <>
//                 <Link to="/collections" className={linkClass('/collections')}>Collections</Link>
//                 <Link to="/message" className={linkClass('/message')}>Messages</Link>
//                 {user.role === 'admin' && (
//                   <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 cursor-pointer">
//                     Dashboard
//                   </Link>
//                 )}
//                 <button 
//                   onClick={handleLogout}
//                   className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
//                 >
//                   <LogOut className="h-4 w-4" /> Logout
//                 </button>
//               </>
//             ) : (
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-md shadow-amber-500/20 active:scale-95 transform transition duration-200 cursor-pointer"
//               >
//                 Sign Up
//               </Link>
//             )}

//             {/* Premium Theme Switcher Button Button */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm focus:outline-none cursor-pointer"
//               aria-label="Toggle Theme Mode"
//             >
//               {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
//             </button>
//           </div>

//           {/* Mobile Toggle Layout Layout */}
//           <div className="flex items-center space-x-3 md:hidden">
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/50 shadow-sm cursor-pointer"
//             >
//               {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
//             </button>
            
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none cursor-pointer"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Slide-out Mobile Overlay Menu Menu */}
//       <div className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-xl transition-all duration-300 ease-in-out origin-top transform ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
//         <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
//           <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass('/')}>Home</Link>
//           {user ? (
//             <>
//               <Link to="/collections" onClick={() => setIsOpen(false)} className={mobileLinkClass('/collections')}>Collections</Link>
//               <Link to="/message" onClick={() => setIsOpen(false)} className={mobileLinkClass('/message')}>Messages</Link>
//               {user.role === 'admin' && (
//                 <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-md text-base font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 cursor-pointer">
//                   Admin Dashboard
//                 </Link>
//               )}
//               <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-3 rounded-md text-base font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer">
//                 <LogOut className="h-5 w-5" /> Logout Account
//               </button>
//             </>
//           ) : (
//             <div className="pt-4 px-4">
//               <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 font-bold text-white bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer">
//                 Sign Up Now
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.jsx';
// import { useTheme } from '../context/ThemeContext.jsx';
// import { Menu, X, Sun, Moon, SunDim, LogOut } from 'lucide-react';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const { darkMode, toggleTheme } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     setIsOpen(false);
//     navigate('/');
//   };

//   const isActive = (path) => location.pathname === path;

//   const linkClass = (path) => `
//     px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer
//     ${isActive(path) 
//       ? 'text-amber-500 bg-amber-500/10' 
//       : 'text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400'}
//   `;

//   const mobileLinkClass = (path) => `
//     block px-4 py-3 rounded-md text-base font-bold tracking-wide transition-colors duration-300 cursor-pointer
//     ${isActive(path) 
//       ? 'text-amber-500 bg-amber-500/10 pl-6 border-l-4 border-amber-500' 
//       : 'text-gray-700 dark:text-gray-300 hover:text-amber-500 hover:bg-gray-50 dark:hover:bg-gray-800'}
//   `;

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
          
//           {/* Brand Logo Link with pointer pointer */}
//           <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
//             <SunDim className="h-8 w-8 text-amber-500 animate-spin-slow group-hover:scale-110 transition-transform" />
//             <span className="text-xl font-black bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent tracking-tighter uppercase">
//               SolarStore
//             </span>
//           </Link>

//           {/* Desktop Navigation Links links */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link to="/" className={linkClass('/')}>Home</Link>
            
//             {user ? (
//               <>
//                 <Link to="/collections" className={linkClass('/collections')}>Collections</Link>
                
//                 {/* Dynamically checks role matrix to render user or admin message endpoint target */}
//                 <Link 
//                   to={user?.role === 'admin' ? '/admin/messages' : '/user/messages'} 
//                   className={linkClass(user?.role === 'admin' ? '/messages' : '/message')}
//                 >
//                   Messages
//                 </Link>

//                 {user.role === 'admin' && (
//                   <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 cursor-pointer">
//                     Dashboard
//                   </Link>
//                 )}
//                 <button 
//                   onClick={handleLogout}
//                   className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
//                 >
//                   <LogOut className="h-4 w-4" /> Logout
//                 </button>
//               </>
//             ) : (
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-md shadow-amber-500/20 active:scale-95 transform transition duration-200 cursor-pointer"
//               >
//                 Sign Up
//               </Link>
//             )}

//             {/* Premium Theme Switcher Button Button */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm focus:outline-none cursor-pointer"
//               aria-label="Toggle Theme Mode"
//             >
//               {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
//             </button>
//           </div>

//           {/* Mobile Toggle Layout Layout */}
//           <div className="flex items-center space-x-3 md:hidden">
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/50 shadow-sm cursor-pointer"
//             >
//               {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
//             </button>
            
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none cursor-pointer"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Slide-out Mobile Overlay Menu Menu */}
//       <div className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-xl transition-all duration-300 ease-in-out origin-top transform ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
//         <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
//           <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass('/')}>Home</Link>
//           {user ? (
//             <>
//               <Link to="/collections" onClick={() => setIsOpen(false)} className={mobileLinkClass('/collections')}>Collections</Link>
              
//               {/* Mobile Role verification link */}
//               <Link 
//                 to={user?.role === 'admin' ? '/messages' : '/message'} 
//                 onClick={() => setIsOpen(false)} 
//                 className={mobileLinkClass(user?.role === 'admin' ? '/messages' : '/message')}
//               >
//                 Messages
//               </Link>
              
//               {user.role === 'admin' && (
//                 <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-md text-base font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 cursor-pointer">
//                   Admin Dashboard
//                 </Link>
//               )}
//               <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-3 rounded-md text-base font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer">
//                 <LogOut className="h-5 w-5" /> Logout Account
//               </button>
//             </>
//           ) : (
//             <div className="pt-4 px-4">
//               <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 font-bold text-white bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer">
//                 Sign Up Now
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { Menu, X, Sun, Moon, SunDim, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `
    px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer
    ${isActive(path) 
      ? 'text-amber-500 bg-amber-500/10' 
      : 'text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400'}
  `;

  const mobileLinkClass = (path) => `
    block px-4 py-3 rounded-md text-base font-bold tracking-wide transition-colors duration-300 cursor-pointer
    ${isActive(path) 
      ? 'text-amber-500 bg-amber-500/10 pl-6 border-l-4 border-amber-500' 
      : 'text-gray-700 dark:text-gray-300 hover:text-amber-500 hover:bg-gray-50 dark:hover:bg-gray-800'}
  `;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Link with pointer pointer */}
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
            <SunDim className="h-8 w-8 text-amber-500 animate-spin-slow group-hover:scale-110 transition-transform" />
            <span className="text-xl font-black bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent tracking-tighter uppercase">
              SolarStore
            </span>
          </Link>

          {/* Desktop Navigation Links links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={linkClass('/')}>Home</Link>
            
            {user ? (
              <>
                <Link to="/collections" className={linkClass('/collections')}>Collections</Link>
                
                {/* Desktop Menu Block Update */}
                <Link 
                  to={user?.role === 'admin' ? '/admin-message' : '/user-message'} 
                  className={linkClass(user?.role === 'admin' ? '/admin-message' : '/user-message')}
                >
                  Messages
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 cursor-pointer">
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <Link 
                to="/signup" 
                className="px-4 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-md shadow-amber-500/20 active:scale-95 transform transition duration-200 cursor-pointer"
              >
                Sign Up
              </Link>
            )}

            {/* Premium Theme Switcher Button Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm focus:outline-none cursor-pointer"
              aria-label="Toggle Theme Mode"
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
          </div>

          {/* Mobile Toggle Layout Layout */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/50 shadow-sm cursor-pointer"
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Slide-out Mobile Overlay Menu Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-xl transition-all duration-300 ease-in-out origin-top transform ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass('/')}>Home</Link>
          {user ? (
            <>
              <Link to="/collections" onClick={() => setIsOpen(false)} className={mobileLinkClass('/collections')}>Collections</Link>
              
              {/* Mobile Dropdown Menu Block Update */}
              <Link 
                to={user?.role === 'admin' ? '/admin-message' : '/user-message'} 
                onClick={() => setIsOpen(false)} 
                className={mobileLinkClass(user?.role === 'admin' ? '/admin-message' : '/user-message')}
              >
                Messages
              </Link>
              
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-md text-base font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 cursor-pointer">
                  Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-3 rounded-md text-base font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer">
                <LogOut className="h-5 w-5" /> Logout Account
              </button>
            </>
          ) : (
            <div className="pt-4 px-4">
              <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 font-bold text-white bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer">
                Sign Up Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
