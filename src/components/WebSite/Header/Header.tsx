"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  Heart,
  Globe,
  ChevronDown,
  X,
  User,
} from "lucide-react";
import { IconUserFilled } from '@tabler/icons-react';
import { categories } from "@/components/mockData/products";
import Category from "./CategoryBar/CategoryBar";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageCurrencyOpen, setIsLanguageCurrencyOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const searchModalRef = useRef<HTMLDivElement>(null);

  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "de", label: "Deutsch", flag: "🇩🇪" },
    { value: "it", label: "Italiano", flag: "🇮🇹" },
    { value: "pt", label: "Português", flag: "🇵🇹" },
  ];

  const currencies = [
    { value: "USD", label: "USD - US Dollar", symbol: "$" },
    { value: "EUR", label: "EUR - Euro", symbol: "€" },
    { value: "GBP", label: "GBP - British Pound", symbol: "£" },
    { value: "CAD", label: "CAD - Canadian Dollar", symbol: "C$" },
    { value: "AUD", label: "AUD - Australian Dollar", symbol: "A$" },
    { value: "JPY", label: "JPY - Japanese Yen", symbol: "¥" },
    { value: "INR", label: "INR - Indian Rupee", symbol: "₹" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node) &&
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node) &&
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target as Node) &&
        searchModalRef.current &&
        !searchModalRef.current.contains(event.target as Node)
      ) {
        setIsLanguageCurrencyOpen(false);
        setShowLanguageDropdown(false);
        setShowCurrencyDropdown(false);
        setShowAccountDropdown(false);
        setShowSearchModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="sticky top-0 z-50 font-sans">
         {/* Top Section */}
      <div className="h-12 bg-[#222222] flex items-center justify-center">
        <p className="text-white text-sm sm:text-base font-medium">Bath Towel Collection on 50% off</p>
      </div>
      {/* Main Header */}
      <header className="bg-white shadow-lg border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl xl:max-w-420 mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-[25%_50%_25%] items-center h-22 gap-2 sm:gap-3 md:gap-4">
            {/* Section 1: Logo (25%) */}
            <div className="flex justify-start p-2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/logo/logo2.png"
                  alt="Company Logo"
                  width={120}
                  height={80}
                  className="h-8 sm:h-20 w-36 object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Section 2: Logo (Center - 40%) */}
            <div className="flex justify-center">
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <div>
                  <h1 className="text-lg sm:text-3xl font-bold bg-linear-to-l from-[#212121] to-[#222222] bg-clip-text text-transparent">
                    M2C MarkDowns Private Limited
                  </h1>
                </div>
              </Link>
            </div>

            {/* Section 3: Wishlist, Cart, Search, Globe, Account*/}
            <div className="flex items-center justify-end gap-2">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-[#222222] hover:text-white hover:bg-[#212121] rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <Heart className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1.5 sm:-right-1.5 bg-[#212121] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium text-xs">
                  0
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-[#222222] hover:text-white hover:bg-[#212121] rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <ShoppingCart className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1.5 sm:-right-1.5 bg-[#212121] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium text-xs">
                  0
                </span>
              </Link>

              {/* Search Icon */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2.5 text-[#222222] hover:text-white hover:bg-[#212121] rounded-lg transition-all duration-200 transform hover:scale-110"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              {/* Globe Icon - Language & Currency Selector */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsLanguageCurrencyOpen(!isLanguageCurrencyOpen)
                  }
                  className="p-2.5 text-[#222222] hover:text-white hover:bg-[#212121] rounded-xl transition-all duration-200 transform hover:scale-110"
                  aria-label="Language and Currency"
                >
                  <Globe className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>

                {/* Language & Currency Modal */}
                {isLanguageCurrencyOpen && (
                  <div
                    ref={modalRef}
                    className="absolute top-full -right-4 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-xl z-50 overflow-visible animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {/* Triangle indicator pointing to Globe icon */}
                    <div className="absolute -top-2 right-4 sm:right-6 w-4 h-4 bg-gray-50 transform rotate-45 z-10"></div>

                    <div className="bg-gray-50 p-4 sm:p-6">
                      <h3 className="font-bold text-gray-900 text-lg">
                        Preferences
                      </h3>
                      <p className="text-sm text-slate-900 mt-1">
                        Customize your language and currency
                      </p>
                    </div>

                    <div className="p-4 sm:p-6 space-y-5">
                      {/* Language Selection */}
                      <div ref={languageDropdownRef} className="relative">
                        <label className="block text-sm font-semibold text-slate-800 mb-3">
                          Language
                        </label>
                        <button
                          onClick={() =>
                            setShowLanguageDropdown(!showLanguageDropdown)
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium bg-white border-2 border-slate-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-lg">
                              {
                                languages.find(
                                  (l) => l.label === selectedLanguage,
                                )?.flag
                              }
                            </span>
                            <span className="text-slate-800">
                              {selectedLanguage}
                            </span>
                          </span>
                          <ChevronDown className="w-4 h-4 text-slate-600" />
                        </button>
                        {showLanguageDropdown && (
                          <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {languages.map((lang) => (
                              <button
                                key={lang.value}
                                onClick={() => {
                                  setSelectedLanguage(lang.label);
                                  setShowLanguageDropdown(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 text-left hover:bg-gray-50 hover:text-gray-600 transition-colors duration-150"
                              >
                                <span className="text-lg">{lang.flag}</span>
                                <span className="font-medium">
                                  {lang.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Currency Selection */}
                      <div ref={currencyDropdownRef} className="relative">
                        <label className="block text-sm font-semibold text-slate-800 mb-3">
                          Currency
                        </label>
                        <button
                          onClick={() =>
                            setShowCurrencyDropdown(!showCurrencyDropdown)
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium bg-white border-2 border-slate-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-lg font-bold text-slate-800">
                              {
                                currencies.find(
                                  (c) => c.value === selectedCurrency,
                                )?.symbol
                              }
                            </span>
                            <span className="text-slate-800">
                              {selectedCurrency}
                            </span>
                          </span>
                          <ChevronDown className="w-4 h-4 text-slate-600" />
                        </button>
                        {showCurrencyDropdown && (
                          <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {currencies.map((currency) => (
                              <button
                                key={currency.value}
                                onClick={() => {
                                  setSelectedCurrency(currency.value);
                                  setShowCurrencyDropdown(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 text-left hover:bg-gray-50 hover:text-gray-600 transition-colors duration-150"
                              >
                                <span className="w-6 text-center font-bold">
                                  {currency.symbol}
                                </span>
                                <span className="font-medium">
                                  {currency.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={() => {
                          setIsLanguageCurrencyOpen(false);
                          setShowLanguageDropdown(false);
                          setShowCurrencyDropdown(false);
                        }}
                        className="w-full bg-[#222222] hover:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Account Dropdown */}
              <div
                className="hidden md:block relative"
                ref={accountDropdownRef}
              >
                <button
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  className="flex items-center gap-2 px-3 sm:px-2.5 py-2.5 text-[#222222] bg-white rounded-lg transition-all duration-200 text-sm sm:text-base font-semibold hover:scale-105 transform"
                >
                  <IconUserFilled className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>

                {showAccountDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-gray-50 hover:text-gray-600 transition-all duration-150 font-medium"
                        onClick={() => setShowAccountDropdown(false)}
                      >
                        <IconUserFilled className="w-6 h-6" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/order"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-gray-50 hover:text-gray-600 transition-all duration-150 font-medium"
                        onClick={() => setShowAccountDropdown(false)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>
                      <hr className="my-2 border-slate-100" />
                      <button
                        onClick={() => {
                          setShowAccountDropdown(false);
                          // Add logout logic here
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700 transition-all duration-150 text-left font-medium"
                      >
                        <X className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 text-slate-700 hover:text-gray-600 hover:bg-slate-100 rounded-lg transition-all duration-200 transform hover:scale-110"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t-2 border-slate-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
              <Link
                href="/"
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveLink("/")
                    ? "bg-linear-to-r from-gray-500 to-gray-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-gray-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/products"
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveLink("/products")
                    ? "bg-linear-to-r from-gray-500 to-gray-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-gray-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveLink("/about")
                    ? "bg-linear-to-r from-gray-500 to-gray-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-gray-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveLink("/contact")
                    ? "bg-linear-to-r from-gray-500 to-gray-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-gray-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/orders"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveLink("/orders")
                    ? "bg-linear-to-rrom-gray-500 to-gray-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-gray-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>My Orders</span>
                <span className="ml-auto bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  0
                </span>
              </Link>

              <hr className="my-3 sm:my-4 border-slate-200" />

              <Link
                href="/account"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-gray-600 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <IconUserFilled className="w-4 h-4" />
                My Account
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Category Bar */}
      <Category />

      {/* Search Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-12 sm:pt-16 md:pt-20 px-3 sm:px-4 animate-in fade-in duration-200"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            ref={searchModalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              {/* Search Input Section */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 bg-linear-to-r from-gray-600 to-gray-700 px-5 py-4 sm:py-5 rounded-xl shadow-lg">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                <input
                  type="text"
                  placeholder="Search for products, categories, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-base sm:text-lg font-medium outline-none bg-transparent text-white placeholder-ble-100"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="p-2 sm:p-2.5 hover:bg-gray-600 rounded-lg transition-all duration-200 shrink-0"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>

              {searchQuery && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 mb-4">
                    Search results for{" "}
                    <span className="text-gray-600 font-bold">
                      "{searchQuery}"
                    </span>
                  </p>
                  <div className="text-center py-12 sm:py-16">
                    <div className="mb-3 sm:mb-4 flex justify-center">
                      <Search className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 font-semibold">
                      No results found
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                      Try searching with different keywords
                    </p>
                  </div>
                </div>
              )}

              {!searchQuery && (
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                      Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {[
                        "Cotton Fabric",
                        "Silk Textiles",
                        "Denim",
                        "Linen",
                        "Wool",
                        "Cotton Blend",
                      ].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-4 sm:px-5 py-2.5 sm:py-3 bg-linear-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 hover:border-gray-400 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
