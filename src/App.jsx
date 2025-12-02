import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';

// Layouts
import AdminLayout from '@/layouts/AdminLayout';
import ClientLayout from '@/layouts/ClientLayout';
import PublicLayout from '@/layouts/PublicLayout';

// Pages
import Login from '@/pages/Login';
import Dashboard from '@/pages/admin/Dashboard';
import PatientList from '@/pages/admin/patients/PatientList';
import PatientForm from '@/pages/admin/patients/PatientForm';
import TurnManager from '@/pages/admin/turns/TurnManager';
import InventoryManager from '@/pages/admin/inventory/InventoryManager';
import SalesList from '@/pages/admin/sales/SalesList';
import MedicalHistory from '@/pages/admin/history/MedicalHistory';
import Reports from '@/pages/admin/reports/Reports';
import Catalog from '@/pages/client/Catalog';
import Cart from '@/pages/client/Cart';
import Checkout from '@/pages/client/Checkout';
import ProductDetail from '@/pages/client/ProductDetail';
import Orders from '@/pages/client/orders/Orders';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from "@/components/theme-provider"

// Placeholder components for routes not yet implemented
const Placeholder = ({ title }) => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-500">Esta funcionalidad está en desarrollo.</p>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if trying to access unauthorized area
    return <Navigate to={user.role === 'client' ? '/client' : '/admin'} replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route element={<PublicLayout />}>
        <Route path="/register" element={<Placeholder title="Registro de Clientes" />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin', 'veterinarian', 'receptionist']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="patients">
          <Route index element={<PatientList />} />
          <Route path="new" element={<PatientForm />} />
          <Route path=":id" element={<Placeholder title="Detalle de Paciente" />} />
          <Route path=":id/edit" element={<PatientForm />} />
        </Route>
        <Route path="history" element={<MedicalHistory />} />
        <Route path="turns" element={<TurnManager />} />
        <Route path="inventory" element={<InventoryManager />} />
        <Route path="sales" element={<SalesList />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Client Routes */}
      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Catalog />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
