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
  const activeQuoteWords = useMemo(
    () => activeTestimonial.quote.split(" "),
    [activeTestimonial.quote],
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
                ? `perspective(1000px) translateX(0px) translateY(${microOffsetY}px) scale(1.02) rotateX(2deg) rotateY(-2deg)`
                : `perspective(1000px) translateX(0px) translateY(${microOffsetY}px) scale(0.96) rotateX(2deg) rotateY(-2deg) translateY(22px)`
            }`
          : `${
              isEntered
                ? `translateX(0px) translateY(${microOffsetY}px) scale(1) rotateY(0deg)`
                : `translateX(0px) translateY(${microOffsetY}px) scale(0.96) rotateY(0deg) translateY(22px)`
            }`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
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
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
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
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        transitionDelay: entryDelay,
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      transitionDelay: entryDelay,
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="testimonial-container" ref={sectionRef}>
      <div className="testimonial-grid">
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => {
            const isActiveHovered =
              index === activeIndex && hoveredIndex === index;

            return (
              <div
                key={testimonial.src}
                className="testimonial-media"
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

        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="name"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="designation"
                style={{
                  color: colorDesignation,
                  fontSize: fontSizeDesignation,
                }}
              >
                {activeTestimonial.designation}
              </p>
              {activeTestimonial.href && (
                <a
                  href={activeTestimonial.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  Open project
                </a>
              )}
              <motion.p
                className="quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeQuoteWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="arrow-buttons">
            <button
              className="arrow-button prev-button"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
            >
              <FaArrowLeft size={13} color={colorArrowFg} />
            </button>
            <button
              className="arrow-button next-button"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
            >
              <FaArrowRight size={13} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-container {
          width: 100%;
          max-width: 56rem;
          padding: 1rem;
        }
        .testimonial-grid {
          display: grid;
          gap: 2rem;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 17rem;
          perspective: 1000px;
        }
        .testimonial-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
          width: 100%;
          height: 100%;
          border-radius: 1.5rem;
          overflow: hidden;
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
        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .name {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        .designation {
          margin-bottom: 1rem;
        }
        .project-link {
          display: inline-flex;
          margin-bottom: 1rem;
          text-decoration: underline;
          text-underline-offset: 4px;
          color: inherit;
          font-weight: 600;
        }
        .quote {
          line-height: 1.65;
        }
        .arrow-buttons {
          display: flex;
          gap: 0.5rem;
          padding-top: 1.1rem;
          align-items: center;
          opacity: 0.9;
        }
        .arrow-button {
          width: 2.1rem;
          height: 2.1rem;
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
        @media (min-width: 768px) {
          .testimonial-container {
            padding: 2rem;
          }
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
          }
          .image-container {
            height: 24rem;
          }
          .designation {
            margin-bottom: 2rem;
          }
          .quote {
            line-height: 1.75;
          }
          .arrow-buttons {
            padding-top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
