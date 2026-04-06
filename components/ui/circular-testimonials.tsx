"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  description?: string;
  stack?: string[];
  name: string;
  designation: string;
  src: string;
  href?: string;
  imagePosition?: "center" | "top" | "bottom";
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [entryAnimating, setEntryAnimating] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    typeof document === "undefined"
      ? true
      : document.visibilityState === "visible",
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const entryTimeoutRef = useRef<number | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  );
  const activeStack = useMemo(
    () => activeTestimonial.stack ?? [],
    [activeTestimonial.stack],
  );
  const activeDescription = useMemo(
    () => activeTestimonial.description ?? activeTestimonial.quote,
    [activeTestimonial.description, activeTestimonial.quote],
  );

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDocumentVisible) return;

    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current)
        clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength, isDocumentVisible]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonialsLength) % testimonialsLength,
    );
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsEntered(true);
            setEntryAnimating(true);
            observer.disconnect();

            entryTimeoutRef.current = window.setTimeout(() => {
              setEntryAnimating(false);
            }, 900);
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (entryTimeoutRef.current) {
        window.clearTimeout(entryTimeoutRef.current);
      }
    };
  }, []);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const microOffsetY = ((index % 3) - 1) * 3;
    const sideLiftOffset = index % 2 === 0 ? -6 : 8;
    const sideScale = index % 2 === 0 ? 0.84 : 0.865;
    const isActive = index === activeIndex;
    const isHovered = hoveredIndex === index;
    const isLeft =
      (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    const entryOrder = isLeft ? 0 : isActive ? 1 : isRight ? 2 : 0;
    const entryDelay = entryAnimating ? `${entryOrder * 0.1}s` : "0s";

    if (isActive) {
      return {
        zIndex: 3,
        opacity: isEntered ? 1 : 0,
        pointerEvents: "auto",
        transform: isHovered
          ? `${
              isEntered
                ? `perspective(1000px) translateX(0px) translateY(${microOffsetY - 6}px) scale(1.03) rotateX(2deg) rotateY(-2deg)`
                : `perspective(1000px) translateX(0px) translateY(${microOffsetY}px) scale(0.96) rotateX(2deg) rotateY(-2deg) translateY(22px)`
            }`
          : `${
              isEntered
                ? `translateX(0px) translateY(${microOffsetY}px) scale(1) rotateY(0deg)`
                : `translateX(0px) translateY(${microOffsetY}px) scale(0.96) rotateY(0deg) translateY(22px)`
            }`,
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: entryDelay,
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: isEntered ? 1 : 0,
        pointerEvents: "auto",
        transform: isEntered
          ? `translateX(-${gap}px) translateY(-${maxStickUp + sideLiftOffset}px) scale(${sideScale}) rotateY(15deg)`
          : `translateX(-${gap}px) translateY(-${maxStickUp + sideLiftOffset}px) scale(${sideScale - 0.03}) rotateY(15deg) translateY(22px)`,
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: entryDelay,
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: isEntered ? 1 : 0,
        pointerEvents: "auto",
        transform: isEntered
          ? `translateX(${gap}px) translateY(-${maxStickUp - sideLiftOffset}px) scale(${sideScale}) rotateY(-15deg)`
          : `translateX(${gap}px) translateY(-${maxStickUp - sideLiftOffset}px) scale(${sideScale - 0.03}) rotateY(-15deg) translateY(22px)`,
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: entryDelay,
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: entryDelay,
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="testimonial-section" ref={sectionRef}>
      <div className="work-card-shell">
        <div className="preview-pane" ref={imageContainerRef}>
          <div className="preview-glow" aria-hidden="true" />
          {testimonials.map((testimonial, index) => {
            const isActiveHovered =
              index === activeIndex && hoveredIndex === index;
            const isActiveCard = index === activeIndex;

            return (
              <div
                key={testimonial.src}
                className={`testimonial-media ${isActiveCard ? "is-active" : ""}`}
                data-index={index}
                style={getImageStyle(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {testimonial.href ? (
                  <a
                    href={testimonial.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${testimonial.name}`}
                    className="media-link"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      className={`testimonial-image ${testimonial.imagePosition === "top" ? "focus-top" : testimonial.imagePosition === "bottom" ? "focus-bottom" : "focus-center"}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ) : (
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className={`testimonial-image ${testimonial.imagePosition === "top" ? "focus-top" : testimonial.imagePosition === "bottom" ? "focus-bottom" : "focus-center"}`}
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <div
                  className={`light-sweep ${isActiveHovered ? "is-hovered" : ""}`}
                />
              </div>
            );
          })}
        </div>

        <div className="info-pane">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="info-pane-body"
            >
              <div className="project-top">
                <div className="project-meta-row">
                  <span className="project-index">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(testimonialsLength).padStart(2, "0")}
                  </span>
                  <span className="project-type">
                    {activeTestimonial.designation}
                  </span>
                </div>

                <h3
                  className="project-name"
                  style={{ color: colorName, fontSize: fontSizeName }}
                >
                  {activeTestimonial.name}
                </h3>

                <p
                  className="project-desc"
                  style={{
                    color: colorDesignation,
                    fontSize: fontSizeDesignation,
                  }}
                >
                  {activeDescription}
                </p>
              </div>

              <div className="stack-section">
                <p className="stack-label">STACK</p>
                <div
                  className="stack-tags"
                  role="list"
                  aria-label="Project stack"
                >
                  {activeStack.slice(0, 10).map((item, idx) => (
                    <span
                      key={`${activeTestimonial.name}-${item}`}
                      role="listitem"
                      className={`stack-tag ${idx < 3 ? "is-highlight" : ""}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="card-footer">
            {activeTestimonial.href ? (
              <a
                href={activeTestimonial.href}
                target="_blank"
                rel="noreferrer"
                className="open-btn"
              >
                Open project <span className="arrow-up">↗</span>
              </a>
            ) : (
              <span className="open-btn disabled">Open project</span>
            )}

            <div className="footer-controls">
              <div className="dot-nav-wrap" aria-hidden="true">
                {testimonials.map((_, idx) => (
                  <span
                    key={`dot-${idx}`}
                    className={`dot-nav ${idx === activeIndex ? "is-active" : ""}`}
                  />
                ))}
              </div>
              <div className="arrow-buttons">
                <button
                  className="arrow-button prev-button"
                  onClick={handlePrev}
                  style={{
                    backgroundColor: hoverPrev
                      ? colorArrowHoverBg
                      : colorArrowBg,
                  }}
                  onMouseEnter={() => setHoverPrev(true)}
                  onMouseLeave={() => setHoverPrev(false)}
                  aria-label="Previous testimonial"
                >
                  <FaArrowLeft size={12} color={colorArrowFg} />
                </button>
                <button
                  className="arrow-button next-button"
                  onClick={handleNext}
                  style={{
                    backgroundColor: hoverNext
                      ? colorArrowHoverBg
                      : colorArrowBg,
                  }}
                  onMouseEnter={() => setHoverNext(true)}
                  onMouseLeave={() => setHoverNext(false)}
                  aria-label="Next testimonial"
                >
                  <FaArrowRight size={12} color={colorArrowFg} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-section {
          width: 100%;
          overflow: hidden;
        }

        .work-card-shell {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 420px;
          border: 1px solid rgba(5, 26, 36, 0.12);
          border-radius: 16px;
          overflow: hidden;
          -webkit-clip-path: inset(0 round 16px);
          clip-path: inset(0 round 16px);
          background: linear-gradient(180deg, #ffffff, #f7f9fb);
          box-shadow: 0 18px 44px rgba(3, 15, 23, 0.08);
        }

        .preview-pane {
          position: relative;
          width: 100%;
          min-height: 21rem;
          perspective: 1000px;
          background-color: transparent;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          overflow: hidden;
          -webkit-clip-path: inset(0);
          clip-path: inset(0);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.2rem;
        }

        .preview-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 40% 62%, rgba(66, 160, 255, 0.18) 0%, transparent 70%);
        }

        .testimonial-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: transform 680ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .testimonial-image.focus-center {
          object-position: center center;
        }
        .testimonial-image.focus-top {
          object-position: center 28%;
        }
        .testimonial-image.focus-bottom {
          object-position: center 72%;
        }
        .testimonial-media {
          position: absolute;
          width: calc(100% - 2.4rem);
          height: calc(100% - 3.7rem);
          top: 2.3rem;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .testimonial-media.is-active::after {
          content: "";
          position: absolute;
          top: -25%;
          left: -55%;
          width: 34%;
          height: 160%;
          transform: rotate(16deg);
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0)
          );
          animation: active-sheen 6.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          opacity: 0.42;
        }
        .testimonial-media:hover .testimonial-image {
          transform: scale(1.05);
        }
        .media-link {
          display: block;
          width: 100%;
          height: 100%;
        }
        .light-sweep {
          position: absolute;
          top: -25%;
          left: -45%;
          width: 42%;
          height: 150%;
          transform: rotate(18deg);
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.16),
            rgba(255, 255, 255, 0)
          );
        }
        .light-sweep.is-hovered {
          opacity: 1;
          animation: sweep 1.2s linear infinite;
        }
        @keyframes sweep {
          from {
            transform: translateX(-140%) rotate(18deg);
          }
          to {
            transform: translateX(280%) rotate(18deg);
          }
        }
        @keyframes active-sheen {
          0%,
          62% {
            transform: translateX(-120%) rotate(16deg);
            opacity: 0;
          }
          76% {
            opacity: 0.42;
          }
          100% {
            transform: translateX(310%) rotate(16deg);
            opacity: 0;
          }
        }
        .info-pane {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.2rem;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
        }

        .info-pane-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          min-height: 0;
        }

        .project-top {
          display: flex;
          flex-direction: column;
        }

        .project-meta-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 0.9rem;
        }

        .project-index {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.66rem;
          letter-spacing: 0.09em;
          color: rgba(5, 26, 36, 0.46);
        }

        .project-type {
          font-size: 0.66rem;
          color: rgba(5, 26, 36, 0.58);
          border: 1px solid rgba(5, 26, 36, 0.16);
          border-radius: 999px;
          padding: 0.2rem 0.48rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .project-name {
          font-weight: 600;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .project-desc {
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .stack-section {
          margin-top: 1rem;
          margin-bottom: 0.95rem;
        }

        .stack-label {
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: rgba(5, 26, 36, 0.45);
          text-transform: uppercase;
          margin-bottom: 0.52rem;
        }

        .stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.34rem;
        }

        .stack-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.7rem;
          line-height: 1;
          padding: 0.36rem 0.58rem;
          border-radius: 999px;
          border: 1px solid rgba(5, 26, 36, 0.14);
          color: rgba(5, 26, 36, 0.72);
          background: rgba(5, 26, 36, 0.03);
        }

        .stack-tag.is-highlight {
          border-color: rgba(50, 43, 141, 0.38);
          color: #312c84;
          background: #efeeff;
        }

        .card-footer {
          margin-top: auto;
          padding-top: 0.88rem;
          border-top: 1px solid rgba(5, 26, 36, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.8rem;
        }

        .open-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          text-decoration: none;
          color: #051a24;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.45rem 0.78rem;
          border: 1px solid rgba(5, 26, 36, 0.2);
          border-radius: 0.72rem;
          transition: background-color 180ms ease;
          white-space: nowrap;
        }

        .open-btn:hover {
          background: rgba(5, 26, 36, 0.05);
        }

        .open-btn.disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .arrow-up {
          font-size: 0.9rem;
          line-height: 1;
        }

        .footer-controls {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .dot-nav-wrap {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .dot-nav {
          width: 0.34rem;
          height: 0.34rem;
          border-radius: 999px;
          background: rgba(5, 26, 36, 0.26);
          transition: width 220ms ease, background-color 220ms ease;
        }

        .dot-nav.is-active {
          width: 0.95rem;
          background: rgba(5, 26, 36, 0.72);
          border-radius: 999px;
        }

        .arrow-buttons {
          display: flex;
          gap: 0.4rem;
          padding-top: 0;
          align-items: center;
          opacity: 0.9;
        }
        .arrow-button {
          width: 1.95rem;
          height: 1.95rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition:
            background-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(6px);
        }
        .arrow-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
        }
        .arrow-button:active {
          transform: translateY(0);
        }
        .arrow-button:focus-visible {
          outline: 2px solid rgba(0, 166, 251, 0.55);
          outline-offset: 2px;
        }
        @media (max-width: 767px) {
          .work-card-shell {
            min-height: 0;
            border: 1px solid rgba(5, 26, 36, 0.12);
            border-radius: 16px;
            overflow: hidden;
          }

          .preview-pane {
            min-height: 16.5rem;
            padding: 0.9rem;
          }

          .info-pane {
            padding: 1rem;
          }

          .project-meta-row {
            margin-bottom: 0.7rem;
          }

          .project-name {
            margin-bottom: 0.4rem;
          }

          .project-desc {
            margin-bottom: 0.75rem;
          }

          .stack-section {
            margin-top: 0.7rem;
            margin-bottom: 0.8rem;
          }

          .card-footer {
            padding-top: 0.7rem;
            gap: 0.6rem;
            flex-wrap: wrap;
          }

          .footer-controls {
            width: 100%;
            justify-content: flex-end;
          }
        }
        @media (min-width: 768px) {
          .work-card-shell {
            grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
            column-gap: 0.8rem;
            border-radius: 16px;
            overflow: hidden;
          }

          .preview-pane {
            min-height: 25.5rem;
            padding: 1.5rem;
            border-top-right-radius: 0;
            border-bottom-left-radius: 16px;
            border-bottom: 0;
            border-right: 0;
          }

          .testimonial-media {
            width: calc(100% - 3rem);
            height: calc(100% - 4.4rem);
            top: 2.8rem;
          }

          .info-pane {
            padding: 1.9rem;
            border-bottom-left-radius: 0;
            border-top-right-radius: 16px;
          }

          .project-name {
            margin-bottom: 0.62rem;
          }

          .project-desc {
            margin-bottom: 1.15rem;
          }

          .quote {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
