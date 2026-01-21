import React from "react";

const VendorHeader = () => {
  return (
    <header className="bg-[#607d8b] text-white font-sans sticky top-0 z-50">
      <div className="max-w-420 mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-28 h-20 rounded-lg bg-white flex items-center justify-center">
            <img 
              src="/assets/logo/BtooClogo.png" 
              alt="BtooC Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg">B Too C MarkDowns Private Limited</h1>
            <p className="text-sm text-muted-foreground">
              Vendor Registration Portal
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-base text-white hidden sm:flex items-center gap-4">
            <a 
              href="mailto:support@btooc.com" 
              className="hover:text-blue-200 transition-colors"
              title="Email us"
            >
              support@btooc.com
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="tel:+919876543210" 
              className="hover:text-blue-200 transition-colors"
              title="Call us"
            >
             +91-9876543210
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="/contact" 
              className="hover:text-blue-200 transition-colors font-medium"
              title="Contact support page"
            >
             Contact Support
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
