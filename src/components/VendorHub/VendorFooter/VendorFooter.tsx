import React from 'react';

const VendorFooter = () => {
  return (
    <footer className="bg-black text-white mt-auto py-4 font-sans">
        <div className="max-w-420 mx-auto px-4 text-center text-base font-semibold text-muted-foreground">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p>© {new Date().getFullYear()} M2C MarkDowns Private Limited. All rights reserved.</p>
            
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
              <span>|</span>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default VendorFooter;