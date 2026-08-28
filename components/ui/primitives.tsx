"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ============================================================
   PAYLAŞILAN PRIMITIVE'LER
   Yeni renk/spacing TANIMLAMA; app/globals.css token'larını kullan.
   Hareketin tamamı `prefers-reduced-motion`'a saygı duyar.
   ============================================================ */

/* ---------- Container ---------- */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide" | "full";
}) {
  const w = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-[92rem]",
    full: "max-w-none",
  }[size];
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", w, className)}>
      {children}
    </div>
  );
}

/* ---------- Section ---------- */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-(--spacing-section)", className)}>
      {children}
    </section>
  );
}

/* ---------- Bölüm etiketi: "01 - ODALAR" ---------- */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {index && <span className="grad-text font-black tabular-nums">{index}</span>}
      <span className="h-px w-8 grad" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/* ---------- Scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "span" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      animate={
        inView || reduce
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(8px)" }
      }
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------- Kelime kelime maskeli başlık ----------
   Ekran okuyuculara tam metin sr-only verilir, parçalar aria-hidden. */
const wordVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, delay: 0.045 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function SplitText({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  /** Son N kelimeyi gradyanla boyar - başlığa vurgu için. */
  gradientLastWords = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  gradientLastWords?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const gradFrom = words.length - gradientLastWords;

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <span key={i} className={i >= gradFrom && gradientLastWords > 0 ? "grad-text" : undefined}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden className="inline">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className={cn(
                "inline-block",
                i >= gradFrom && gradientLastWords > 0 && "grad-text"
              )}
              custom={i + delay * 22}
              variants={wordVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ---------- Manyetik sarmalayıcı ----------
   İçindekini imlece doğru hafifçe çeker. Dokunmatikte ve reduced-motion'da
   hiç devreye girmez. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ---------- Buton ---------- */
type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "light" | "whatsapp";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  magnetic?: boolean;
  "aria-label"?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  external,
  magnetic = true,
  ...rest
}: ButtonProps) {
  const base =
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-(--radius-pill) font-semibold " +
    "transition-[transform,box-shadow,background-color,color,border-color] duration-500 ease-(--ease-out-expo) " +
    "active:scale-[.97] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

  const variants = {
    primary: "grad text-white shadow-(--shadow-soft) hover:shadow-(--shadow-glow)",
    outline:
      "border border-line bg-paper/60 text-ink backdrop-blur hover:border-grape hover:text-grape hover:shadow-(--shadow-soft)",
    ghost: "text-ink hover:text-fuchsia",
    light: "bg-white text-ink shadow-(--shadow-soft) hover:shadow-(--shadow-lift)",
    whatsapp: "bg-whatsapp text-white shadow-(--shadow-soft) hover:bg-whatsapp-deep",
  }[variant];

  const sizes = {
    sm: "h-10 px-5 text-[0.8125rem]",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-[0.9375rem]",
  }[size];

  const cls = cn(base, variants, sizes, className);

  // Birincil butonda üstten geçen ışık parıltısı
  const sheen =
    variant === "primary" || variant === "whatsapp" ? (
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-[1.1s] ease-(--ease-out-expo) group-hover/btn:translate-x-full"
      />
    ) : null;

  const inner = (
    <>
      {sheen}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const isExternal =
    external || href?.startsWith("http") || href?.startsWith("tel:") || href?.startsWith("mailto:");

  const node = href ? (
    isExternal ? (
      <a
        href={href}
        className={cls}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    )
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>
      {inner}
    </button>
  );

  return magnetic ? <Magnetic strength={0.2}>{node}</Magnetic> : node;
}

/* ---------- Sayı sayacı ---------- */
export function Counter({
  to,
  suffix,
  duration = 1.4,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const done = useRef(false);
  const text = `${to}${suffix ?? ""}`;

  /* Sayı DOM'a doğrudan yazılır, state ile değil. İki sebepten:
     1) Sunucudan gelen HTML gerçek değeri taşır - Google ve JS'siz
        ziyaretçi "0" görmez.
     2) Kare başına render tetiklenmez.
     Bölüm ekranın altındayken sessizce sıfırlanır, görünüme girince sayar. */

  useEffect(() => {
    if (reduce || done.current || inView) return;
    const el = ref.current;
    if (el) el.textContent = `0${suffix ?? ""}`;
  }, [reduce, inView, suffix]);

  useEffect(() => {
    if (!inView || reduce || done.current) return;
    done.current = true;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // easeOutExpo
      el.textContent = `${Math.round(eased * to)}${suffix ?? ""}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}

/* ---------- İstatistik ---------- */
export function Stat({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number | string;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="border-t-2 border-line pt-4">
      <p className="font-display text-h2 font-bold leading-none">
        <span className="grad-text">
          {typeof value === "number" ? <Counter to={value} suffix={suffix} /> : value}
          {typeof value === "string" && suffix}
        </span>
      </p>
      <p className="mt-2 text-sm text-ink-soft">{label}</p>
    </Reveal>
  );
}

/* ---------- Sonsuz kayan şerit ---------- */
export function Marquee({
  items,
  duration = 34,
  className,
}: {
  items: ReactNode[];
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn("marquee-host relative overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((it, i) => (
              <li key={i} className="flex items-center gap-6 px-6">
                {it}
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full grad" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* ---------- Kaydırmaya bağlı paralaks sarmalayıcı ---------- */
export function Parallax({
  children,
  amount = 60,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ---------- 3B eğilen kart ---------- */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX: rx, rotateY: ry, perspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Renk lekeleri zemini ---------- */
export function Blobs({
  className,
  tone = "violet",
}: {
  className?: string;
  tone?: "violet" | "pink" | "mixed";
}) {
  const sets = {
    violet: ["#c4a6ff", "#e9d5ff", "#a78bfa"],
    pink: ["#ffb6dd", "#ffd6ea", "#ff9dc7"],
    mixed: ["#c4a6ff", "#ffb6dd", "#ffd0ae"],
  }[tone];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <span className="blob h-[38rem] w-[38rem] -left-40 -top-40" style={{ background: sets[0] }} />
      <span
        className="blob h-[30rem] w-[30rem] right-[-8rem] top-10"
        style={{ background: sets[1], animationDelay: "-6s" }}
      />
      <span
        className="blob h-[26rem] w-[26rem] left-1/3 bottom-[-10rem]"
        style={{ background: sets[2], animationDelay: "-12s" }}
      />
    </div>
  );
}

/* ---------- Sayfa üstü kaydırma göstergesi ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left grad"
    />
  );
}

/* ---------- Açılır kapanır satır (SSS) ---------- */
export function Accordion({
  items,
  className,
}: {
  items: Array<{ q: string; a: string }>;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const on = open === i;
        return (
          <li key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                aria-controls={`faq-panel-${i}`}
                id={`faq-btn-${i}`}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-display text-h3 font-semibold transition-colors duration-500 ease-(--ease-out-expo)",
                    on ? "text-grape" : "group-hover:text-fuchsia"
                  )}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-(--ease-out-expo)",
                    on ? "grad rotate-45 border-transparent text-white" : "border-line text-ink-soft group-hover:border-fuchsia"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-7 pr-12 text-pretty text-ink-soft">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
