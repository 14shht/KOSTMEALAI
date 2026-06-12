"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CountUpTextProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  locale?: string;
  className?: string;
};

export function CountUpText({
  value,
  prefix = "",
  suffix = "",
  duration = 1100,
  locale = "id-ID",
  className,
}: CountUpTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let frameId = 0;

    if (!inView) {
      frameId = requestAnimationFrame(() => setCurrent(0));
      return () => cancelAnimationFrame(frameId);
    }

    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [duration, inView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {current.toLocaleString(locale)}
      {suffix}
    </span>
  );
}
