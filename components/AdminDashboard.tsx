
import React, { useState, useEffect } from 'react';

interface Submission {
  name: string;
  mobile: string;
  email: string;
  referral: string;
  timestamp: string;
}

interface AdminDashboardProps {
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [data, setData] = useState<Submission[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('edunetic_submissions') || '[]');
    setData(saved);
  }, []);

  const clearData = () => {
    if (confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
      localStorage.removeItem('edunetic_submissions');
      setData([]);
    }
  };

  const downloadCSV = () => {
    if (data.length === 0) return;
    const headers = ["Name", "Mobile", "Email", "Referral", "Timestamp"];
    const rows = data.map(item => [item.name, item.mobile, item.email, item.referral, item.timestamp]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `edunetic_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-black p-4 md:p-10 font-mono text-xs overflow-auto">
      <div className="absolute inset-0 dot-pattern opacity-5 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#00ffff] uppercase tracking-tighter">System Database</h1>
            <p className="text-gray-500 mt-1 uppercase tracking-widest">Submissions: {data.length} entries detected</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={downloadCSV}
              className="px-4 py-2 border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all uppercase tracking-widest"
            >
              Export CSV
            </button>
            <button 
              onClick={clearData}
              className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest"
            >
              Purge Database
            </button>
            <button 
              onClick={onExit}
              className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 transition-all uppercase tracking-widest"
            >
              Exit Terminal
            </button>
          </div>
        </div>

        <div className="glass-panel overflow-hidden border border-[#00ffff]/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00ffff]/10 text-[#00ffff] uppercase tracking-widest font-bold">
                <th className="p-4 border-b border-[#00ffff]/20">ID</th>
                <th className="p-4 border-b border-[#00ffff]/20">Name</th>
                <th className="p-4 border-b border-[#00ffff]/20">Mobile</th>
                <th className="p-4 border-b border-[#00ffff]/20">Email</th>
                <th className="p-4 border-b border-[#00ffff]/20">Referral</th>
                <th className="p-4 border-b border-[#00ffff]/20">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                [...data].reverse().map((item, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300">
                    <td className="p-4 text-[#00ffff]/50">{data.length - index}</td>
                    <td className="p-4 font-bold text-white">{item.name}</td>
                    <td className="p-4">{item.mobile}</td>
                    <td className="p-4">{item.email}</td>
                    <td className="p-4">{item.referral || '---'}</td>
                    <td className="p-4 text-gray-500">{item.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-600 uppercase tracking-widest italic">
                    Zero records found in local memory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
