// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Layout Structural Framework
// import Navbar from './components/Navbar.jsx';
// import Footer from './components/Footer.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';

// // Public Page Interfaces
// import Home from './pages/Home.jsx';
// import Login from './pages/Login.jsx';
// import Signup from './pages/Signup.jsx';
// import ForgotPassword from './pages/ForgotPassword.jsx';
// import ResetPassword from './pages/ResetPassword.jsx';

// // Authenticated/Protected Client Routes
// import Collections from './pages/Collections.jsx';
// import Product from './pages/Product.jsx';
// import Message from './pages/Message.jsx';
// import AdminMessages from './pages/AdminMessages';

// // Restricted Admin Interfaces
// import AdminSignup from './pages/AdminSignup';
// import AdminLogin from './pages/AdminLogin.jsx';
// import AdminDashboard from './pages/AdminDashboard.jsx';

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-amber-500 selection:text-white">
//         {/* Core Layout Navbar wrapper layout component */}
//         <Navbar />

//         {/* Dynamic Route Pages Viewport */}
//         <main className="flex-grow">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/admin-signup" element={<AdminSignup />} />
//             <Route path="/admin-login" element={<AdminLogin />} />
//             <Route path="/admin/messages" element={<AdminMessages />} />


//             {/* Authenticated Client Views */}
//             <Route path="/collections" element={
//               <ProtectedRoute>
//                 <Collections />
//               </ProtectedRoute>
//             } />
//             <Route path="/product/:id" element={
//               <ProtectedRoute>
//                 <Product />
//               </ProtectedRoute>
//             } />
//             <Route path="/message" element={
//               <ProtectedRoute>
//                 <Message />
//               </ProtectedRoute>
//             } />

//             {/* Locked Admin Dashboard Route */}
//             <Route path="/admin/dashboard" element={
//               <ProtectedRoute adminOnly={true}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } />
//           </Routes>
//         </main>

//         {/* Global Footer element */}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// // Layout Structural Framework
// import Navbar from './components/Navbar.jsx';
// import Footer from './components/Footer.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';

// // Public Page Interfaces
// import Home from './pages/Home.jsx';
// import Login from './pages/Login.jsx';
// import Signup from './pages/Signup.jsx';
// import ForgotPassword from './pages/ForgotPassword.jsx';
// import ResetPassword from './pages/ResetPassword.jsx';

// // Authenticated/Protected Client Routes
// import Collections from './pages/Collections.jsx';
// import Product from './pages/Product.jsx';
// import Message from './pages/Message.jsx';
// import AdminMessages from './pages/AdminMessages';

// // Restricted Admin Interfaces
// import AdminSignup from './pages/AdminSignup';
// import AdminLogin from './pages/AdminLogin.jsx';
// import AdminDashboard from './pages/AdminDashboard.jsx';

// // Inline Secure Admin Guarding Component
// function AdminRoute({ children }) {
//   const { user } = useAuth();
  
//   // If no user is logged in, or the user is not an admin, kick them back to customer login
//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// }

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-amber-500 selection:text-white">
//         {/* Core Layout Navbar wrapper layout component */}
//         <Navbar />

//         {/* Dynamic Route Pages Viewport */}
//         <main className="flex-grow">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/admin-signup" element={<AdminSignup />} />
//             <Route path="/admin-login" element={<AdminLogin />} />
            
//             {/* Highly Secure Admin Messages Route */}
//             <Route path="/admin/messages" element={
//               <AdminRoute>
//                 <AdminMessages />
//               </AdminRoute>
//             } />
            
//             {/* Authenticated Client Views */}
//             <Route path="/collections" element={
//               <ProtectedRoute>
//                 <Collections />
//               </ProtectedRoute>
//             } />
//             <Route path="/product/:id" element={
//               <ProtectedRoute>
//                 <Product />
//               </ProtectedRoute>
//             } />
//             <Route path="/message" element={
//               <ProtectedRoute>
//                 <Message />
//               </ProtectedRoute>
//             } />

//             {/* Locked Admin Dashboard Route */}
//             <Route path="/admin/dashboard" element={
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             } />
//           </Routes>
//         </main>

//         {/* Global Footer element */}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Structural Framework
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public Page Interfaces
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

// Authenticated/Protected Client Routes
import Collections from './pages/Collections.jsx';
import Product from './pages/Product.jsx';
import Message from './pages/Message.jsx';
import AdminMessages from './pages/AdminMessages';

// Restricted Admin Interfaces
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

// FIXED SECURE ADMIN GUARDING COMPONENT
function AdminRoute({ children }) {
  const { user, loading } = useAuth(); // Ensure your AuthContext exposes a loading state
  
  // Pause verification checks while local storage finishes hydration
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <p className="text-xs font-bold uppercase tracking-widest animate-pulse text-red-500">
          Decrypting Security Token...
        </p>
      </div>
    );
  }
  
  // If no user is logged in, or the user is not an admin, kick them back to customer login
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-amber-500 selection:text-white">
        {/* Core Layout Navbar wrapper layout component */}
        <Navbar />

        {/* Dynamic Route Pages Viewport */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Authenticated Client Views */}
            <Route path="/collections" element={
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            } />
            <Route path="/product/:id" element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            } />

            {/* Updated User Message Path Segment */}
            <Route path="/user-message" element={
              <ProtectedRoute>
                <Message />
              </ProtectedRoute>
            } />

            {/* Updated Admin Message Path Segment */}
            <Route path="/admin-message" element={
              <AdminRoute>
                <AdminMessages />
              </AdminRoute>
            } />

            {/* Locked Admin Dashboard Route */}
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Routes>
        </main>

        {/* Global Footer element */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
