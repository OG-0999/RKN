import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

import { IntroSplash } from "@/components/IntroSplash";
import { Layout } from "@/components/Layout";

import Home from "@/pages/Home";
import { About } from "@/pages/About";
import { ServicesHub } from "@/pages/Services";
import { Contact } from "@/pages/Contact";
import TermsPage from "@/pages/Terms";
import CancellationPage from "@/pages/Cancellation";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { PropertyDetail } from "@/pages/PropertyDetail";
import { PropertiesPage } from "@/pages/Properties";
import { FoundersStoryPage } from "@/pages/FoundersStory";
import { 
  NewResidential, 
  FirstTimeBuyer, 
  Investment, 
  Resale, 
  EndToEnd, 
  PropertyManagement 
} from "@/pages/ServiceDetails";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [location] = useLocation();
  const isPropertyDetailRoute = location.startsWith("/properties/");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroSplash onComplete={handleIntroComplete} />;
  }

  if (isPropertyDetailRoute) {
    return (
      <>
        <Switch>
          <Route path="/properties/:slug" component={PropertyDetail} />
          <Route component={NotFound} />
        </Switch>
      </>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/founders-story" component={FoundersStoryPage} />

        <Route path="/properties" component={PropertiesPage} />
        
        <Route path="/services" component={ServicesHub} />
        <Route path="/services/" component={ServicesHub} />
        
        <Route path="/services/new-residential" component={NewResidential} />
        <Route path="/services/new-residential/first-time-buyer" component={FirstTimeBuyer} />
        <Route path="/services/new-residential/investment" component={Investment} />
        
        <Route path="/services/resale" component={Resale} />
        <Route path="/services/resale/home-seller" component={Resale} />
        <Route path="/services/resale/investment" component={Resale} />
        
        <Route path="/services/end-to-end" component={EndToEnd} />
        <Route path="/services/end-to-end/acquisition" component={EndToEnd} />
        <Route path="/services/end-to-end/development" component={EndToEnd} />
        
        <Route path="/services/property-management" component={PropertyManagement} />
        <Route path="/services/:rest*" component={ServicesHub} />
        
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/cancellation" component={CancellationPage} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
