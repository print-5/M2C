"use client";

import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <div className="bg-[#222222] text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2" >Join the Haven Home Family</h3>
          <p className="text-gray-300 text-sm mb-6">
            Subscribe for exclusive offers, styling tips, and 10% off your first order.
          </p>
          <div className="max-w-4xl mx-auto flex items-center gap-4 mb-6">
            <h3 className="text-white font-medium whitespace-nowrap">Subscribe Newsletters</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 flex-1">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Write your email here" className="flex-1 px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"/>
              <button type="submit" className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">Submit</button>
            </form>
          </div>
          <p className="text-gray-300 text-sm mb-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;