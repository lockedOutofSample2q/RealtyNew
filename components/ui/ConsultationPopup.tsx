"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "./Button";

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#book') {
        setIsOpen(true);
        window.history.replaceState(null, '', window.location.pathname);
      }
    };
    
    window.addEventListener('hashchange', checkHash);
    checkHash();
    
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 md:p-10 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-display font-medium mb-2 text-charcoal">Book your free call</h3>
        <p className="text-muted mb-6">15 minutes. One honest answer.</p>
        
        <form className="space-y-4" action="https://formspree.io/f/mqkopwvv" method="POST" onSubmit={() => setTimeout(() => setIsOpen(false), 1000)}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal">Project type</label>
            <select name="project_type" className="w-full h-11 px-4 rounded-xl border border-border bg-gray-50 text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal transition-all">
              <option>Flat / Apartment</option>
              <option>Independent House</option>
              <option>Land / Plot</option>
              <option>NRI Investment</option>
              <option>Not sure yet</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal">Contact method</label>
            <div className="grid grid-cols-3 gap-2">
              {['Phone', 'WhatsApp', 'Email'].map(method => (
                <label key={method} className="flex items-center justify-center border border-border text-charcoal rounded-xl h-11 cursor-pointer hover:bg-charcoal/5 transition-colors has-[:checked]:bg-charcoal has-[:checked]:text-white has-[:checked]:border-charcoal">
                  <input type="radio" name="contact_method" value={method} className="sr-only" defaultChecked={method === 'Phone'} />
                  <span className="text-sm font-medium">{method}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal">Your number / email</label>
            <input type="text" name="contact_detail" required className="w-full h-11 px-4 rounded-xl border border-border bg-gray-50 text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal transition-all" placeholder="Where should we reach you?" />
          </div>
          
          <Button size="lg" className="w-full h-12 text-base mt-2 group">
            Book the free call
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>
    </div>
  );
}
