import React, { useState } from 'react';

interface FormData {
  name: string;
  mobile: string;
  email: string;
  referral: string;
}

export const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    referral: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwx3QkdBKieYhzLFS8fCKt6mc_hpdqkoCqdQwwePGvy_MuNAIjKCgC4hazsS5DXP9NR/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error. Please try again.");
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="glass-panel p-10 rounded-lg border-t-4 border-[#00ffff] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-[#00ffff]/40 uppercase tracking-tighter">
          Registration.Success
        </div>

        <div className="w-20 h-20 bg-[#00ffff]/10 border border-[#00ffff]/30 flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-0 animate-pulse bg-[#00ffff]/5" />
          <svg className="w-10 h-10 text-[#00ffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="font-display text-3xl font-bold text-white mb-4 uppercase tracking-tight">
          You're Registered!
        </h3>

        <p className="text-gray-400 mb-8 leading-relaxed font-light">
          Thank you for joining. We will send the{" "}
          <span className="text-[#00ffff]">Free Course</span> details to your email{" "}
          <span className="text-white">{formData.email}</span> very soon.
        </p>

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', mobile: '', email: '', referral: '' });
          }}
          className="text-[10px] text-[#00ffff] hover:text-white transition-colors tracking-[0.2em] uppercase font-bold"
        >
          &lt; Register Another Person &gt;
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-1 border-t-0 relative">
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00ffff] z-20" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00ffff] z-20" />

      <div className="p-8 md:p-10 bg-black/40">
        <div className="mb-10 flex justify-between items-start">
          <div>
            <h2 className="font-display text-3xl font-black text-white uppercase tracking-tighter mb-2">
              Join Now
            </h2>
            <p className="text-xs text-[#00ffff] font-mono tracking-widest uppercase">
              Course Value: <span className="line-through text-gray-600">₹4,999</span> → FREE
            </p>
          </div>
          <div className="text-[10px] text-gray-700 font-mono text-right">
            TYPE: WAITLIST<br />
            STATUS: ACTIVE
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "mobile", "email", "referral"].map((field) => (
            <div key={field} className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {field === "name" && "Full Name"}
                  {field === "mobile" && "Mobile Number"}
                  {field === "email" && "Email Address"}
                  {field === "referral" && "Referral Code"}
                </label>
              </div>

              <input
                required={field !== "referral"}
                type={field === "email" ? "email" : field === "mobile" ? "tel" : "text"}
                name={field}
                pattern={field === "mobile" ? "[0-9]{10}" : undefined}
                value={(formData as any)[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 text-white placeholder:text-gray-800 focus:outline-none focus:border-[#00ffff] focus:bg-white/[0.05] transition-all font-mono text-sm tracking-wider"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 border-2 border-[#00ffff] text-[#00ffff] font-black uppercase tracking-[0.3em] hover:bg-[#00ffff] hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 w-0 group-hover/btn:w-full bg-[#00ffff] transition-all duration-500 ease-out -z-10" />
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce delay-300" />
              </span>
            ) : (
              "Get My Free Access"
            )}
          </button>

          <p className="text-[9px] text-gray-700 text-center font-mono leading-tight tracking-tighter">
            SECURE // PRIVATE // FOR EVERY INDIAN STUDENT
          </p>
        </form>
      </div>
    </div>
  );
};