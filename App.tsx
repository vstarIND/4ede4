
import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { AdminDashboard } from './components/AdminDashboard';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminAccess = () => {
    // Adding a small delay to ensure click events finish
    setTimeout(() => {
      const password = window.prompt("TERMINAL ACCESS REQUIRED\nEnter Credentials:");
      if (password === "ruthvikgautamarnav@eduneticindia.in") {
        setIsAdmin(true);
      } else if (password !== null) {
        alert("ACCESS DENIED: UNAUTHORIZED CREDENTIALS");
      }
    }, 100);
  };

  // Expose to window for emergency console access
  useEffect(() => {
    (window as any).openAdmin = handleAdminAccess;
    return () => { delete (window as any).openAdmin; };
  }, []);

  return (
    <main className="min-h-screen w-full bg-black relative">
      {isAdmin ? (
        <AdminDashboard onExit={() => setIsAdmin(false)} />
      ) : (
        <HeroSection onAdminClick={handleAdminAccess} />
      )}
    </main>
  );
};

export default App;
