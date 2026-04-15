import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { AIChatWidget } from "@/components/AIChatWidget";
import { DashboardLayout } from "@/components/DashboardLayout";

import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OtpPage from "./pages/OtpPage";
import KycPage from "./pages/KycPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import NotFound from "./pages/NotFound";

// Tenant pages
import TenantDashboard from "./pages/tenant/TenantDashboard";
import TenantRentals from "./pages/tenant/TenantRentals";
import TenantPayments from "./pages/tenant/TenantPayments";
import TenantEscrow from "./pages/tenant/TenantEscrow";
import TenantMessages from "./pages/tenant/TenantMessages";
import TenantNotifications from "./pages/tenant/TenantNotifications";
import TenantSettings from "./pages/tenant/TenantSettings";

// Landlord pages
import LandlordDashboard from "./pages/landlord/LandlordDashboard";
import LandlordProperties from "./pages/landlord/LandlordProperties";
import LandlordTenants from "./pages/landlord/LandlordTenants";
import LandlordEarnings from "./pages/landlord/LandlordEarnings";
import LandlordEscrow from "./pages/landlord/LandlordEscrow";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminListings from "./pages/admin/AdminListings";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminEscrow from "./pages/admin/AdminEscrow";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public pages with TopNav + BottomNav */}
              <Route path="/" element={<><TopNav /><main className="min-h-[calc(100vh-3.5rem)]"><HomePage /></main><BottomNav /><AIChatWidget /></>} />
              <Route path="/listings" element={<><TopNav /><main className="min-h-[calc(100vh-3.5rem)]"><ListingsPage /></main><BottomNav /><AIChatWidget /></>} />
              <Route path="/property/:id" element={<><TopNav /><main className="min-h-[calc(100vh-3.5rem)]"><PropertyDetailsPage /></main><BottomNav /></>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/kyc" element={<KycPage />} />

              {/* Tenant Dashboard */}
              <Route path="/tenant" element={<DashboardLayout role="tenant"><TenantDashboard /></DashboardLayout>} />
              <Route path="/tenant/rentals" element={<DashboardLayout role="tenant"><TenantRentals /></DashboardLayout>} />
              <Route path="/tenant/payments" element={<DashboardLayout role="tenant"><TenantPayments /></DashboardLayout>} />
              <Route path="/tenant/escrow" element={<DashboardLayout role="tenant"><TenantEscrow /></DashboardLayout>} />
              <Route path="/tenant/messages" element={<DashboardLayout role="tenant"><TenantMessages /></DashboardLayout>} />
              <Route path="/tenant/notifications" element={<DashboardLayout role="tenant"><TenantNotifications /></DashboardLayout>} />
              <Route path="/tenant/settings" element={<DashboardLayout role="tenant"><TenantSettings /></DashboardLayout>} />

              {/* Landlord Dashboard */}
              <Route path="/landlord" element={<DashboardLayout role="landlord"><LandlordDashboard /></DashboardLayout>} />
              <Route path="/landlord/properties" element={<DashboardLayout role="landlord"><LandlordProperties /></DashboardLayout>} />
              <Route path="/landlord/tenants" element={<DashboardLayout role="landlord"><LandlordTenants /></DashboardLayout>} />
              <Route path="/landlord/earnings" element={<DashboardLayout role="landlord"><LandlordEarnings /></DashboardLayout>} />
              <Route path="/landlord/payments" element={<DashboardLayout role="landlord"><TenantPayments /></DashboardLayout>} />
              <Route path="/landlord/escrow" element={<DashboardLayout role="landlord"><LandlordEscrow /></DashboardLayout>} />
              <Route path="/landlord/messages" element={<DashboardLayout role="landlord"><TenantMessages /></DashboardLayout>} />
              <Route path="/landlord/settings" element={<DashboardLayout role="landlord"><TenantSettings /></DashboardLayout>} />

              {/* Admin Dashboard */}
              <Route path="/admin" element={<DashboardLayout role="admin"><AdminDashboard /></DashboardLayout>} />
              <Route path="/admin/users" element={<DashboardLayout role="admin"><AdminUsers /></DashboardLayout>} />
              <Route path="/admin/listings" element={<DashboardLayout role="admin"><AdminListings /></DashboardLayout>} />
              <Route path="/admin/disputes" element={<DashboardLayout role="admin"><AdminDisputes /></DashboardLayout>} />
              <Route path="/admin/payments" element={<DashboardLayout role="admin"><AdminPayments /></DashboardLayout>} />
              <Route path="/admin/escrow" element={<DashboardLayout role="admin"><AdminEscrow /></DashboardLayout>} />
              <Route path="/admin/reports" element={<DashboardLayout role="admin"><AdminReports /></DashboardLayout>} />
              <Route path="/admin/settings" element={<DashboardLayout role="admin"><AdminSettings /></DashboardLayout>} />

              {/* Legacy redirects */}
              <Route path="/dashboard" element={<DashboardLayout role="tenant"><TenantDashboard /></DashboardLayout>} />
              <Route path="/payments" element={<DashboardLayout role="tenant"><TenantPayments /></DashboardLayout>} />
              <Route path="/chat" element={<DashboardLayout role="tenant"><TenantMessages /></DashboardLayout>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
