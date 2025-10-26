import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chatbot from "./pages/Chatbot";
import Learning from "./pages/Learning";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Course from "./pages/Course";
import Case from "./pages/Case";
import Messages from "./pages/Messages";
import CaseStudy from "./pages/CaseStudy";
import AppLayout from "@/components/layout/AppLayout";

const queryClient = new QueryClient();

const LayoutWrapper = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Index />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<Create />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/case/:id" element={<Case />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
const anyWin = window as any;
if (anyWin.__appRoot) {
  anyWin.__appRoot.render(<App />);
} else {
  anyWin.__appRoot = createRoot(container);
  anyWin.__appRoot.render(<App />);
}
