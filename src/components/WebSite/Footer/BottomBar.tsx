import Link from "next/link";

const BottomBar = () => {
  return (
    <div className="bg-[#000000] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} M2C MarkDowns Private Limited. All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/returns"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Returns & FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;