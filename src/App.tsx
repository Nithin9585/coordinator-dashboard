import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Schools } from "./pages/Schools";
import { Teachers } from "./pages/Teachers";
import { Reports } from "./pages/Reports";
import { Support } from "./pages/Support";
import {Profile} from "./pages/profile";
import { MainLayout } from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";
// import { AuthProvider } from "./lib/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/support" element={<Support />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
};export default App;
