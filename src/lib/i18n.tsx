import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "en" | "sw";

const translations: Record<string, Record<Locale, string>> = {
  // Nav
  "nav.home": { en: "Home", sw: "Nyumbani" },
  "nav.explore": { en: "Explore", sw: "Gundua" },
  "nav.payments": { en: "Payments", sw: "Malipo" },
  "nav.chat": { en: "Chat", sw: "Mazungumzo" },
  "nav.profile": { en: "Profile", sw: "Wasifu" },
  "nav.dashboard": { en: "Dashboard", sw: "Dashibodi" },
  "nav.signIn": { en: "Sign In", sw: "Ingia" },

  // Home
  "home.hero.title": { en: "Find Your", sw: "Pata Nyumba" },
  "home.hero.highlight": { en: "Perfect Home", sw: "Bora" },
  "home.hero.suffix": { en: "in Tanzania", sw: "Tanzania" },
  "home.hero.subtitle": { en: "Rent securely with mobile money payments and escrow protection", sw: "Kodi kwa usalama kwa malipo ya simu na ulinzi wa escrow" },
  "home.categories": { en: "Browse Categories", sw: "Vinjari Makundi" },
  "home.featured": { en: "Featured Listings", sw: "Orodha Maalum" },
  "home.viewAll": { en: "View all", sw: "Tazama zote" },
  "home.why": { en: "Why RentLink?", sw: "Kwa nini RentLink?" },

  // Categories
  "cat.apartments": { en: "Apartments", sw: "Vyumba" },
  "cat.rooms": { en: "Rooms", sw: "Chumba" },
  "cat.houses": { en: "Houses", sw: "Nyumba" },
  "cat.commercial": { en: "Commercial", sw: "Biashara" },

  // Features
  "feat.mobileMoney": { en: "Mobile Money", sw: "Pesa ya Simu" },
  "feat.mobileMoneyDesc": { en: "Pay rent via M-Pesa, Tigo Pesa, or Airtel Money", sw: "Lipa kodi kupitia M-Pesa, Tigo Pesa, au Airtel Money" },
  "feat.escrow": { en: "Escrow Protection", sw: "Ulinzi wa Escrow" },
  "feat.escrowDesc": { en: "Deposits secured until you move in safely", sw: "Amana zilindwe hadi uhamie kwa usalama" },
  "feat.matching": { en: "Instant Matching", sw: "Ulinganishaji wa Papo" },
  "feat.matchingDesc": { en: "AI finds your perfect home in seconds", sw: "AI inapata nyumba yako bora kwa sekunde" },

  // Search
  "search.placeholder": { en: "Search location, property...", sw: "Tafuta eneo, mali..." },

  // Dashboard
  "dash.title": { en: "Dashboard", sw: "Dashibodi" },
  "dash.welcome": { en: "Welcome back", sw: "Karibu tena" },
  "dash.tenant": { en: "Tenant", sw: "Mpangaji" },
  "dash.landlord": { en: "Landlord", sw: "Mmiliki" },
  "dash.activeRentals": { en: "Active Rentals", sw: "Kodi Hai" },
  "dash.nextPayment": { en: "Next Payment", sw: "Malipo Yajayo" },
  "dash.notifications": { en: "Notifications", sw: "Arifa" },
  "dash.activeRental": { en: "Active Rental", sw: "Kodi Hai" },
  "dash.payRent": { en: "Pay Rent", sw: "Lipa Kodi" },
  "dash.lease": { en: "Lease", sw: "Mkataba" },
  "dash.recentTx": { en: "Recent Transactions", sw: "Muamala za Hivi Karibuni" },
  "dash.properties": { en: "Properties", sw: "Mali" },
  "dash.revenue": { en: "Revenue", sw: "Mapato" },
  "dash.tenants": { en: "Tenants", sw: "Wapangaji" },
  "dash.pending": { en: "Pending", sw: "Inasubiri" },
  "dash.monthlyRevenue": { en: "Monthly Revenue", sw: "Mapato ya Kila Mwezi" },
  "dash.addProperty": { en: "Add New Property", sw: "Ongeza Mali Mpya" },

  // Payments
  "pay.title": { en: "Payments", sw: "Malipo" },
  "pay.subtitle": { en: "Pay rent securely via mobile money", sw: "Lipa kodi kwa usalama kupitia pesa ya simu" },
  "pay.amountDue": { en: "Amount Due", sw: "Kiasi Kinachostahili" },
  "pay.selectMethod": { en: "Select Payment Method", sw: "Chagua Njia ya Malipo" },
  "pay.history": { en: "Transaction History", sw: "Historia ya Muamala" },
  "pay.receipt": { en: "Receipt", sw: "Risiti" },
  "pay.rentPayment": { en: "Rent Payment", sw: "Malipo ya Kodi" },

  // Listings
  "list.propertiesFound": { en: "properties found", sw: "mali zimepatikana" },

  // Auth
  "auth.login": { en: "Sign In", sw: "Ingia" },
  "auth.signup": { en: "Sign Up", sw: "Jisajili" },
  "auth.email": { en: "Email", sw: "Barua pepe" },
  "auth.password": { en: "Password", sw: "Nenosiri" },
  "auth.fullName": { en: "Full Name", sw: "Jina Kamili" },
  "auth.phone": { en: "Phone Number", sw: "Nambari ya Simu" },
  "auth.loginSubtitle": { en: "Welcome back to RentLink", sw: "Karibu tena RentLink" },
  "auth.signupSubtitle": { en: "Create your account", sw: "Fungua akaunti yako" },
  "auth.noAccount": { en: "Don't have an account?", sw: "Huna akaunti?" },
  "auth.hasAccount": { en: "Already have an account?", sw: "Una akaunti tayari?" },
  "auth.forgotPassword": { en: "Forgot password?", sw: "Umesahau nenosiri?" },
  "auth.otp.title": { en: "Verify Your Phone", sw: "Thibitisha Simu Yako" },
  "auth.otp.subtitle": { en: "Enter the 6-digit code sent to", sw: "Ingiza msimbo wa tarakimu 6 uliotumwa kwa" },
  "auth.otp.resend": { en: "Resend code", sw: "Tuma tena msimbo" },
  "auth.otp.verify": { en: "Verify", sw: "Thibitisha" },
  "auth.kyc.title": { en: "Complete Your Profile", sw: "Kamilisha Wasifu Wako" },
  "auth.kyc.step1": { en: "Personal Info", sw: "Taarifa Binafsi" },
  "auth.kyc.step2": { en: "ID Verification", sw: "Uthibitishaji wa Kitambulisho" },
  "auth.kyc.step3": { en: "Preferences", sw: "Mapendeleo" },
  "auth.kyc.next": { en: "Continue", sw: "Endelea" },
  "auth.kyc.finish": { en: "Get Started", sw: "Anza" },
  "auth.or": { en: "or continue with", sw: "au endelea na" },

  // Property details
  "prop.amenities": { en: "Amenities", sw: "Huduma" },
  "prop.description": { en: "Description", sw: "Maelezo" },
  "prop.landlord": { en: "Landlord", sw: "Mmiliki" },
  "prop.reviews": { en: "Reviews", sw: "Maoni" },
  "prop.payRent": { en: "Pay Rent", sw: "Lipa Kodi" },
  "prop.apply": { en: "Request to Rent", sw: "Omba Kukodisha" },
  "prop.perMonth": { en: "/month", sw: "/mwezi" },
  "prop.contact": { en: "Contact Landlord", sw: "Wasiliana na Mmiliki" },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("rentlink-locale");
    return (saved === "sw" ? "sw" : "en") as Locale;
  });

  const handleSetLocale = useCallback((l: Locale) => {
    setLocale(l);
    localStorage.setItem("rentlink-locale", l);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[key]?.[locale] ?? key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
