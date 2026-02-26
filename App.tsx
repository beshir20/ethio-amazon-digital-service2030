
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Assistant from './components/Assistant';
import Vault from './components/Vault';
import Auth from './components/Auth';
import { SERVICES } from './constants';
import { auth } from './services/firebase';
// Fix: Import functions as values and User as a type from the modular auth package
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

const ServicesList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      {SERVICES.map((service) => (
        <div key={service.id} className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all group">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl shadow-lg ${
            service.color === 'blue' ? 'bg-blue-600 shadow-blue-100' :
            service.color === 'orange' ? 'bg-orange-600 shadow-orange-100' :
            service.color === 'green' ? 'bg-green-600 shadow-green-100' :
            service.color === 'purple' ? 'bg-purple-600 shadow-purple-100' :
            service.color === 'red' ? 'bg-red-600 shadow-red-100' : 'bg-teal-600 shadow-teal-100'
          }`}>
            <i className={`fa-solid ${service.icon}`}></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">{service.description}</p>
          <button className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
            Access Service <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

const StatsPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 animate-pulse">
        <i className="fa-solid fa-chart-pie text-2xl"></i>
    </div>
    <h2 className="text-2xl font-bold text-slate-800">Advanced Analytics Coming Soon</h2>
    <p className="text-slate-500 max-w-md">We are building detailed transparency reports to show service efficiency across different regions of Ethiopia.</p>
  </div>
);

const VerificationPrompt: React.FC<{ user: User }> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(user);
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await user.reload();
      if (user.emailVerified) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center text-blue-600 text-3xl">
          <i className="fa-solid fa-envelope-circle-check animate-bounce"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Verify your email</h2>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          We've sent a verification link to <span className="font-bold text-slate-800">{user.email}</span>. 
          Please check your inbox and click the link to activate your account.
        </p>

        <div className="space-y-3">
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : "I've Verified My Email"}
          </button>
          
          <button 
            onClick={handleResend}
            disabled={loading || sent}
            className={`w-full py-3 text-sm font-bold rounded-2xl border transition-all ${
              sent ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sent ? <><i className="fa-solid fa-check mr-2"></i> Sent!</> : "Resend Verification Email"}
          </button>
        </div>

        <button 
          onClick={() => signOut(auth)}
          className="mt-8 text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors"
        >
          Sign out and use another email
        </button>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Fix: Pass the auth instance as the first argument to onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <i className="fa-solid fa-circle-notch animate-spin text-blue-600 text-3xl"></i>
          <p className="text-sm font-bold text-slate-500">Initializing Portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (!user.emailVerified) {
    return <VerificationPrompt user={user} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'services': return <ServicesList />;
      case 'vault': return <Vault />;
      case 'assistant': return <Assistant />;
      case 'stats': return <StatsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
