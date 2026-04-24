"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Product", href: "/#product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "#", external: false, comingSoon: true },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Add backdrop blur on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape, return focus to trigger
  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, closeMenu]);

  // Focus trap inside drawer
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [mobileOpen]);

  return (
    <header
      role="banner"
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300",
        scrolled
          ? "bg-gt-bg/90 backdrop-blur-md border-b border-gt-border/50"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Wordmark */}
          <a
            href="/"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded-md"
            aria-label="GreenTensor — home"
          >
            {/* SVG logo mark — green G, blue T */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="40" height="40" rx="8" fill="#0F1923"/>
              {/* G */}
              <text x="4" y="28" fontSize="22" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#22C55E">G</text>
              {/* T */}
              <text x="20" y="28" fontSize="22" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#3B82F6">T</text>
            </svg>
            <span className="text-gt-text font-semibold text-lg tracking-tight">
              GreenTensor
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="relative text-gt-muted hover:text-gt-text transition-colors duration-150 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded group"
              >
                {link.label}
                {link.comingSoon && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gt-surface border border-gt-border text-gt-muted align-middle">
                    Soon
                  </span>
                )}
                {link.external && (
                  <span className="sr-only"> (opens in new tab)</span>
                )}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" href="#waitlist">
              Join Waitlist
            </Button>
            <Button variant="primary" size="sm" href="#trial">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 rounded-lg text-gt-muted hover:text-gt-text hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-72 bg-gt-surface border-l border-gt-border z-50 flex flex-col p-6 gap-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-gt-text font-semibold">Menu</span>
              <button
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="p-2 rounded-lg text-gt-muted hover:text-gt-text hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green"
              >
                <X size={20} />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={closeMenu}
                  className="flex items-center justify-between text-gt-text hover:text-gt-green transition-colors duration-150 font-medium py-2 border-b border-gt-border/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
                >
                  {link.label}
                  {link.comingSoon && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gt-surface border border-gt-border text-gt-muted">
                      Soon
                    </span>
                  )}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-auto">
              <Button variant="ghost" size="md" href="#waitlist" onClick={closeMenu}>
                Join Waitlist
              </Button>
              <Button variant="primary" size="md" href="#trial" onClick={closeMenu}>
                Start Free Trial
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
