"use client";

import { useEffect, useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#process" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1nC1BJQ68l6B4Va2-_LUq2KatDxx_k5DD/view?usp=sharing",
    external: true,
  },
];

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const openEmail = () => {
    window.location.href = "mailto:sehgalaayu@gmail.com";
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300 ${isScrolled ? "pt-2 px-5 md:px-8" : "pt-4 px-4"}`}
    >
      <div
        className={`flex items-center justify-between rounded-full w-full relative z-10 border transition-all duration-300 ${
          isScrolled
            ? "max-w-4xl px-4 md:px-5 py-2 bg-[linear-gradient(145deg,rgba(255,255,255,0.42),rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.12))] border-white/35 shadow-[0_10px_30px_rgba(5,26,36,0.14)] backdrop-blur-xl"
            : "max-w-6xl px-6 py-3 bg-[linear-gradient(145deg,rgba(255,255,255,0.34),rgba(255,255,255,0.16)_45%,rgba(255,255,255,0.08))] border-white/25 shadow-[0_14px_34px_rgba(5,26,36,0.12)] backdrop-blur-lg"
        }`}
      >
        <div className="flex items-center">
          <div
            className={`${isScrolled ? "mr-4" : "mr-6"} transition-all duration-300`}
          >
            <a
              href="#"
              className={`font-semibold tracking-tight text-primary-ink transition-all duration-300 ${isScrolled ? "text-[15px]" : "text-base"}`}
            >
              Aayu Sehgal
            </a>
          </div>
        </div>

        <nav
          className={`hidden md:flex items-center transition-all duration-300 ${isScrolled ? "space-x-6" : "space-x-8"}`}
        >
          {navItems.map((item) => (
            <div key={item.label}>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={`font-medium text-primary-ink/72 hover:text-primary-ink transition-all duration-300 ${isScrolled ? "text-[13px]" : "text-sm"}`}
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="hidden md:block">
          <GlassButton
            size={isScrolled ? "sm" : "default"}
            onClick={openEmail}
            className="glass-button-primary"
            contentClassName={`tracking-[0.15em] uppercase transition-all duration-300 ${isScrolled ? "text-[9px]" : "text-[10px]"}`}
          >
            Get in touch
          </GlassButton>
        </div>

        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Open navigation menu"
        >
          <Menu
            className={`text-primary-ink transition-all duration-300 ${isScrolled ? "h-5 w-5" : "h-6 w-6"}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-surface z-50 pt-24 px-6 md:hidden">
          <button
            className="absolute top-6 right-6 p-2"
            onClick={toggleMenu}
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6 text-primary-ink" />
          </button>

          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="text-base text-primary-ink font-medium"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              </div>
            ))}

            <div className="pt-6">
              <GlassButton
                size="lg"
                onClick={() => {
                  toggleMenu();
                  openEmail();
                }}
                className="glass-button-primary w-full"
                contentClassName="text-base"
              >
                Get in touch
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Navbar1 };
