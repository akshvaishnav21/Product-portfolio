import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blogs from "@/pages/Blogs";
import { useEffect } from "react";
import analytics, { trackPageView } from "./lib/analytics";

// Router with automatic page view tracking
function Router() {
  const [location] = useLocation();
  
  // Track page views on route changes
  useEffect(() => {
    trackPageView(location);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blogs" component={Blogs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize analytics
  useEffect(() => {
    analytics.init();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
