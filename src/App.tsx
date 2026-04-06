import { useEffect, useRef, useState } from "react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { GlassButton } from "@/components/ui/glass-button";
import { HoverPeek } from "@/components/ui/link-preview";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Navbar1 } from "@/components/ui/navbar-1";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import {
  blurFadeVariants,
  containerVariants,
  quoteContainerVariants,
} from "@/lib/animations";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Globe,
  Linkedin,
  Mail,
  Quote,
  Twitter,
} from "lucide-react";

const projects = [
  {
    title: "CAPShield",
    category: "DeFi Platform",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "Framer Motion",
      "Node.js",
      "Express",
      "Ethers",
      "Docker",
      "Nginx",
    ],
    image: "/project-pngs/capshield-decentralised.JPG",
    badge: "LIVE",
    href: "https://capshield-frontend.onrender.com/",
  },
  {
    title: "Ethreal Vault",
    category: "Web3 Wallet Application",
    tags: [
      "React 19",
      "TypeScript",
      "Vite 7",
      "Tailwind CSS 4",
      "Ethers",
      "@solana/web3.js",
      "bip39",
      "bip32",
      "Radix UI",
      "Framer Motion",
      "ESLint",
    ],
    image: "/project-pngs/ethreal-vault.JPG",
    badge: "LIVE",
    href: "https://web-based-wallet-32bt.vercel.app/",
  },
  {
    title: "Private Knowledge Q&A",
    category: "Internal Tooling",
    tags: ["React", "FastAPI", "MongoDB", "Node.js", "Python", "Openrouter"],
    image: "/project-pngs/private-qa.png",
    badge: "LIVE",
    href: "https://private-knowledge-q-a.vercel.app",
  },
  {
    title: "Product Feedback Platform",
    category: "SaaS Product",
    tags: ["Next.js", "PostgreSQL", "React", "Node.js"],
    image: "/project-pngs/product%20feedbaak.JPG",
    href: "https://product-feedback-webapp-1.onrender.com/",
  },
  {
    title: "Wanderlust",
    category: "Full-Stack Application",
    tags: ["Node.js", "MongoDB", "Express", "Cloudinary", "React", "Mapbox"],
    image: "/project-pngs/wanderlust.JPG",
    href: "https://wanderlust-bnb-epe7.onrender.com/",
  },
  {
    title: "Aajao — India's RSVP App",
    category: "Consumer Startup",
    tags: ["Redis", "WebSockets", "Next.js", "React", "Framer Motion"],
    image: "/project-pngs/aajao-landing%20page.JPG",
    badge: "NEW RELEASE",
    href: "https://aajao-weld.vercel.app",
  },
];

const experience = [
  {
    period: "Jan 2026 — Apr 2026",
    title: "Full-Stack/Blockchain Developer Intern",
    company: "Pitchmatter (Venture Studio)",
    description:
      "Engineered internal automation frameworks CAPShield and Zynking. Focused on high-speed deployment pipelines and cross-functional feature delivery.",
  },
  {
    period: "2022 — 2026",
    title: "B.Tech Computer Science",
    company: "Bennett University",
    description:
      "Deep specialization in distributed systems and software architecture. 4-year rigorous engineering curriculum.",
  },
];

const stack = {
  langs: ["React", "Node.js", "Python", "SQL", "JS", "TS", "C++"],
  tools: [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS",
    "Claude",
    "Cursor",
    "Antigravity",
    "MCP",
    "Figma",
    "Metamask",
    "Foundry",
  ],
};

const logos = [
  {
    src: "/logos/antigravity-color.png",
    alt: "Antigravity Logo",
  },
  {
    src: "/logos/aws-logo.webp",
    alt: "AWS Logo",
  },
  {
    src: "/logos/cursor-ai-code-icon.webp",
    alt: "Cursor Logo",
  },
  {
    src: "/logos/lovable-ai-icon.webp",
    alt: "Lovable AI Logo",
  },
  {
    src: "/logos/open-ai-logo-png-transparent-background-chatgpt--68fadfca37.png",
    alt: "OpenAI Logo",
  },
  {
    src: "/logos/windsurf-icon.webp",
    alt: "Windsurf Logo",
  },
  {
    src: "/logos/stack/react.svg",
    alt: "React Logo",
  },
  {
    src: "/logos/stack/nodedotjs.svg",
    alt: "Node.js Logo",
  },
  {
    src: "/logos/stack/typescript.svg",
    alt: "TypeScript Logo",
  },
  {
    src: "/logos/stack/python.svg",
    alt: "Python Logo",
  },
  {
    src: "/logos/stack/mongodb.svg",
    alt: "MongoDB Logo",
  },
  {
    src: "/logos/stack/postgresql.svg",
    alt: "PostgreSQL Logo",
  },
  {
    src: "/logos/stack/docker.svg",
    alt: "Docker Logo",
  },
  {
    src: "/logos/stack/redis.svg",
    alt: "Redis Logo",
  },
  {
    src: "/logos/stack/go.svg",
    alt: "Go Logo",
  },
  {
    src: "/logos/stack/nextdotjs.svg",
    alt: "Next.js Logo",
  },
  {
    src: "/logos/stack/express.svg",
    alt: "Express Logo",
  },
  {
    src: "/logos/stack/fastapi.svg",
    alt: "FastAPI Logo",
  },
];

const quoteLines = [
  <>
    Scaling systems is not just about code, it is about understanding the{" "}
    <span className="quote-highlight-shimmer not-italic font-semibold bg-gradient-to-r from-cyan-200 via-white to-cyan-100 bg-clip-text text-transparent underline decoration-white/35 decoration-1 underline-offset-4">
      architecture of intent
    </span>
    .
  </>,
  <>
    I{" "}
    <span className="not-italic font-sans font-bold text-white/85 mondwest-accent">
      shipped
    </span>{" "}
    production-grade solutions that bridged raw{" "}
    <span className="not-italic font-sans font-bold text-white/85 mondwest-accent">
      full-stack
    </span>{" "}
    complexity and seamless user experience.
  </>,
];

const orderedProjects = [
  ...projects.filter((project) => project.title.includes("Aajao")),
  ...projects.filter((project) => !project.title.includes("Aajao")),
];

const workTestimonials: Array<{
  quote: string;
  name: string;
  designation: string;
  src: string;
  href: string;
  imagePosition: "center" | "top" | "bottom";
}> = orderedProjects.map((project) => ({
  quote: `Stack: ${project.tags.join(" • ")}`,
  name: project.title,
  designation: project.category,
  src: project.image,
  href: project.href,
  imagePosition:
    project.title === "CAPShield"
      ? "center"
      : project.title === "Ethreal Vault"
        ? "center"
        : project.title.includes("Private Knowledge")
          ? "top"
          : project.title.includes("Airbnb")
            ? "center"
            : project.title.includes("Aajao")
              ? "top"
              : "center",
}));

function CountUp({
  value,
  suffix = "",
  duration = 1000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    let rafId = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setDisplayValue(Math.floor(progress * value));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [duration, value]);

  return (
    <span
      ref={ref}
      className="text-3xl md:text-4xl font-semibold tracking-tight text-primary-ink"
    >
      {displayValue}
      {suffix}
    </span>
  );
}

export default function App() {
  const goToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openEmail = () => {
    window.location.href = "mailto:sehgalaayu@gmail.com";
  };

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (revealNodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-clip">
      <SpotlightCursor
        config={{
          radius: 130,
          brightness: 0.22,
          color: "#59d6ff",
        }}
        className="mix-blend-screen"
      />

      {/* Navigation */}
      <Navbar1 />

      <main className="pt-24 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 md:pt-40 flex flex-col items-start">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,_rgba(3,15,23,0.10)_0%,_rgba(3,15,23,0.03)_42%,_transparent_72%)]"
          ></div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-24 hidden md:block h-[20rem] w-[18rem] rounded-full bg-[radial-gradient(circle,_rgba(7,40,59,0.08)_0%,_rgba(7,40,59,0.02)_45%,_transparent_78%)]"
          ></div>
          <motion.div
            className="relative z-10 max-w-2xl w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-primary-ink/60 mb-8 uppercase block">
              Full-Stack Developer — Building products people actually use
            </span>
            <motion.h1
              variants={blurFadeVariants}
              className="text-[clamp(40px,11vw,96px)] font-medium tracking-tighter text-primary-ink mb-6 w-full leading-[0.95]"
            >
              Ship <span className="editorial-accent">fast</span>. Build things{" "}
              <span className="editorial-accent">that last.</span>
            </motion.h1>
            <motion.div
              variants={blurFadeVariants}
              className="space-y-4 md:space-y-6 text-base leading-relaxed text-primary-ink/80 font-light mb-8 md:mb-12"
            >
              <p>
                I am a{" "}
                <span className="editorial-accent font-normal text-primary-ink">
                  Full-Stack
                </span>{" "}
                developer focused on shipping production-ready code that solves
                real problems. My philosophy centers on speed of execution
                without sacrificing structural integrity.
              </p>
              <p>
                Recently, I spent my time at{" "}
                <span className="text-primary-ink font-medium">
                  Pitchmatter
                </span>
                , a venture studio where I architected internal tools like
                CAPShield and Zynking, moving them from ideation to deployment
                in record cycles.
              </p>
            </motion.div>
          </motion.div>

          <div className="hero-cta-wrap relative z-20 flex flex-wrap gap-3 md:gap-4 bg-transparent">
            <GlassButton
              size="default"
              onClick={openEmail}
              className="glass-button-primary hero-cta-btn"
              contentClassName="flex items-center gap-3"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </GlassButton>
            <GlassButton
              size="default"
              onClick={goToWork}
              className="glass-button-secondary hero-cta-btn"
            >
              See my work
            </GlassButton>
          </div>
        </section>

        {/* Marquee */}
        <section className="py-8 md:py-12 mb-20 md:mb-32 overflow-hidden">
          <p className="mb-4 text-center text-[10px] font-mono uppercase tracking-[0.22em] text-primary-ink/55">
            Tools and technologies I work with
          </p>
          <LogoCloud logos={logos} className="py-2" />
        </section>

        {/* Selected Works */}
        <section id="work" className="mb-20 md:mb-32">
          <div
            data-reveal="work-heading"
            className="reveal-up flex flex-wrap items-baseline gap-3 md:gap-6 mb-10 md:mb-14"
            style={{ transitionDelay: "0.08s" }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary-ink">
              Selected <span className="mondwest-accent">Works</span>
            </h2>
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="hidden md:block text-[10px] uppercase tracking-[0.22em] text-primary-ink/45">
              2025 ARCHIVE
            </span>
          </div>

          <div
            data-reveal="work-carousel"
            className="reveal-up bg-transparent border border-black/5 p-4 sm:p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] min-h-[300px] flex flex-wrap gap-4 md:gap-6 items-center justify-center relative"
            style={{ transitionDelay: "0.18s" }}
          >
            <div
              className="items-center justify-center relative flex w-full"
              style={{ maxWidth: "1200px" }}
            >
              <CircularTestimonials
                testimonials={workTestimonials}
                autoplay={true}
                colors={{
                  name: "#0a0a0a",
                  designation: "#4b5563",
                  testimony: "#111827",
                  arrowBackground: "rgba(5, 26, 36, 0.18)",
                  arrowForeground: "rgba(5, 26, 36, 0.72)",
                  arrowHoverBackground: "rgba(5, 26, 36, 0.3)",
                }}
                fontSizes={{
                  name: "clamp(1.25rem, 4.8vw, 1.75rem)",
                  designation: "clamp(0.95rem, 3.4vw, 1.125rem)",
                  quote: "clamp(0.95rem, 3.4vw, 1.125rem)",
                }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Quote Section */}
      <section
        id="about"
        className="relative isolate bg-primary-ink py-20 md:py-40 mb-20 md:mb-32 overflow-hidden"
      >
        <span
          aria-hidden="true"
          className="quote-mark-parallax pointer-events-none absolute left-1/2 top-6 md:top-8 -translate-x-1/2 font-serif text-[110px] md:text-[240px] leading-none text-white/[0.04]"
        >
          &ldquo;
        </span>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
          <Quote className="w-10 h-10 md:w-12 md:h-12 text-white/15 mx-auto mb-8 md:mb-10" />
          <motion.blockquote
            className="text-xl md:text-3xl lg:text-4xl font-serif text-white leading-snug mb-12 md:mb-16 italic space-y-3 md:space-y-4"
            variants={quoteContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {quoteLines.map((line, idx) => (
              <motion.span
                key={idx}
                className="block"
                variants={blurFadeVariants}
              >
                {line}
              </motion.span>
            ))}
          </motion.blockquote>
          <cite className="not-italic block">
            <span className="text-white font-semibold block text-lg mb-3">
              Pitchmatter — Jan 2026 to Apr 2026
            </span>
            <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.25em]">
              The Digital Architect
            </span>
          </cite>
        </div>
      </section>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        {/* Experience & Skills Bento */}
        <section
          id="process"
          data-reveal="experience-section"
          className="reveal-up grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32"
          style={{ transitionDelay: "0.06s" }}
        >
          {/* Timeline */}
          <div
            data-reveal="experience-timeline"
            className="reveal-up experience-card lg:col-span-2 bg-primary-ink/5 rounded-3xl p-6 sm:p-8 md:p-12"
            style={{ transitionDelay: "0.14s" }}
          >
            <h3 className="text-xs tracking-[0.2em] uppercase font-mono text-primary-ink/60 mb-12">
              Where I've Been
            </h3>
            <div className="relative space-y-10 md:space-y-16">
              <div
                data-reveal="timeline-rail"
                className="timeline-gradient-line"
                aria-hidden="true"
              />
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  data-reveal={`timeline-item-${idx}`}
                  className="timeline-item reveal-up relative pl-8"
                  style={{ transitionDelay: `${0.12 + idx * 0.1}s` }}
                >
                  <div
                    className={`timeline-dot absolute -left-1.5 top-0 w-3 h-3 rounded-full ${idx === 0 ? "bg-primary-ink" : "bg-primary-ink/35"}`}
                  ></div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary-ink/50 mb-3 block">
                    {item.period}
                  </span>
                  <h4 className="text-xl font-bold text-primary-ink mb-2">
                    {item.title}
                  </h4>
                  <p className="text-primary-ink font-semibold mb-4">
                    {item.company}
                  </p>
                  <p className="text-primary-ink/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Column */}
          <div
            data-reveal="experience-stack"
            className="reveal-up stack-card lg:-translate-y-4 bg-primary-ink text-white rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col justify-between"
            style={{ transitionDelay: "0.24s" }}
          >
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-mono text-white/40 mb-12">
                Stack
              </h3>
              <div className="space-y-10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 block mb-5">
                    Langs & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stack.langs.map((lang) => (
                      <span
                        key={lang}
                        className="border border-white/10 bg-white/5 px-4 py-1.5 rounded-full text-xs"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 block mb-5">
                    Storage & Tools
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stack.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-white/10 bg-white/5 px-4 py-1.5 rounded-full text-xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-10 md:pt-16">
              <span className="text-xl font-semibold mondwest-accent">
                Architecture First.
              </span>
            </div>
          </div>
        </section>

        {/* Impact Strip */}
        <section
          data-reveal="impact-strip"
          className="reveal-up mb-20 md:mb-32 border-t border-b border-black/5 py-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
            <div
              data-reveal="impact-item-1"
              className="reveal-up text-center md:px-6 md:border-r md:border-black/10"
              style={{ transitionDelay: "0.06s" }}
            >
              <CountUp value={400} suffix="+" />
              <p className="mt-3 text-xs uppercase tracking-wider text-black/50">
                Production commits shipped
              </p>
            </div>

            <div
              data-reveal="impact-item-2"
              className="reveal-up text-center md:px-6 md:border-r md:border-black/10"
              style={{ transitionDelay: "0.14s" }}
            >
              <CountUp value={250} suffix="+" />
              <p className="mt-3 text-xs uppercase tracking-wider text-black/50">
                Core data structures & algorithm problems solved
              </p>
            </div>

            <div
              data-reveal="impact-item-3"
              className="reveal-up text-center md:px-6 md:border-r md:border-black/10"
              style={{ transitionDelay: "0.22s" }}
            >
              <HoverPeek
                url="https://medium.com/aws-in-plain-english/how-to-deploy-a-full-stack-app-to-aws-beginner-friendly-devops-guide-f3c3465949c5"
                isStatic
                imageSrc="/previews/aws-medium-article.png"
                enableLensEffect={false}
              >
                <a
                  href="https://medium.com/aws-in-plain-english/how-to-deploy-a-full-stack-app-to-aws-beginner-friendly-devops-guide-f3c3465949c5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-3xl md:text-4xl font-semibold tracking-tight text-primary-ink hover:text-primary-ink/80 transition-colors"
                >
                  Published
                </a>
              </HoverPeek>
              <p className="mt-3 text-xs uppercase tracking-wider text-black/50">
                Technical writing on AWS Medium
              </p>
            </div>

            <div
              data-reveal="impact-item-4"
              className="reveal-up text-center md:px-6"
              style={{ transitionDelay: "0.3s" }}
            >
              <p className="text-3xl md:text-4xl font-semibold tracking-tight text-primary-ink">
                Certified
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-black/50">
                Microsoft GenAI certified
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-signature mb-20 md:mb-32 rounded-[2rem] md:rounded-[4rem] py-16 sm:py-20 md:py-32 px-5 sm:px-8 md:px-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-10 md:mb-12">
              Let's build <br />
              <span className="mondwest-accent">something real.</span>
            </h2>
            <GlassButton
              size="lg"
              onClick={openEmail}
              className="glass-button-primary cta-action-btn"
              contentClassName="inline-flex items-center gap-4"
            >
              Start a conversation
              <Mail size={24} />
            </GlassButton>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-[#030F17] text-white py-14 md:py-20 px-4 sm:px-6 md:px-12">
        <div className="footer-top-glow" aria-hidden="true"></div>
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center pb-12 md:pb-20 border-b border-white/8 gap-6 md:gap-0">
            <div className="mb-10 md:mb-0">
              <span className="text-white font-semibold text-xl tracking-tight">
                Aayu Sehgal
              </span>
              <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest mt-2">
                © 2026 ALL RIGHTS RESERVED
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-10 md:mb-0">
              <span className="status-dot w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                India · Remote · OPEN TO WORK
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="https://github.com/sehgalaayu/"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sehgalaayu/"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/sehgalaayu1"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
                aria-label="X"
                title="X"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:sehgalaayu@gmail.com"
                className="footer-link"
                aria-label="Email"
                title="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://aajao-weld.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
                aria-label="Aajao"
                title="Aajao"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
