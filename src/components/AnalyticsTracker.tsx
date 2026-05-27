"use client";

import { useEffect } from "react";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    bgAnalytics?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
      getEvents: () => any[];
      clearEvents: () => void;
    };
  }
}

export function AnalyticsTracker() {
  useEffect(() => {
    // 1. Suppress browser console warnings from external SDKs or preload speculator engines
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        args[0] &&
        typeof args[0] === "string" &&
        (args[0].includes("Datadog Browser SDK") ||
         args[0].includes("No storage available for session") ||
         args[0].includes("was preloaded using link preload") ||
         args[0].includes("preloaded using link preload"))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    // 2. Initialize LocalStorage structure
    const initStorage = () => {
      localStorage.setItem("bg_cookie_consent", "all");
      if (!localStorage.getItem("bg_analytics_events")) {
        localStorage.setItem("bg_analytics_events", JSON.stringify([]));
      }
      if (!localStorage.getItem("bg_analytics_session")) {
        localStorage.setItem(
          "bg_analytics_session",
          JSON.stringify({
            startTime: Date.now(),
            duration: 0,
            pageViews: 0,
          })
        );
      }
    };
    initStorage();

    // Helper to log event
    const logEvent = (name: string, data: Record<string, any> = {}) => {
      try {
        const events = JSON.parse(localStorage.getItem("bg_analytics_events") || "[]");
        events.push({
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          name,
          data,
        });
        // Limit local storage size to last 200 events to prevent bloating
        if (events.length > 200) events.shift();
        localStorage.setItem("bg_analytics_events", JSON.stringify(events));
        
        // Dispatch custom event for dashboard real-time updates
        window.dispatchEvent(new CustomEvent("bg_analytics_update"));
      } catch (e) {
        console.error("Failed to write to analytics log", e);
      }
    };

    // Attach tracking interface to window object
    window.bgAnalytics = {
      track: (name, data) => logEvent(name, data),
      getEvents: () => JSON.parse(localStorage.getItem("bg_analytics_events") || "[]"),
      clearEvents: () => {
        localStorage.setItem("bg_analytics_events", JSON.stringify([]));
        window.dispatchEvent(new CustomEvent("bg_analytics_update"));
      },
    };

    // 2. Track Page View on Mount
    const currentPath = window.location.pathname;
    const referrer = document.referrer || "Direct";
    logEvent("Page View", { path: currentPath, referrer });

    const session = JSON.parse(localStorage.getItem("bg_analytics_session") || "{}");
    session.pageViews = (session.pageViews || 0) + 1;
    localStorage.setItem("bg_analytics_session", JSON.stringify(session));

    // 3. Track Session Duration (every 5 seconds)
    const durationInterval = setInterval(() => {
      const sess = JSON.parse(localStorage.getItem("bg_analytics_session") || "{}");
      if (sess.startTime) {
        sess.duration = Math.round((Date.now() - sess.startTime) / 1000);
        localStorage.setItem("bg_analytics_session", JSON.stringify(sess));
        window.dispatchEvent(new CustomEvent("bg_analytics_update"));
      }
    }, 5000);

    // 4. Track Scroll Depth Milestones (25%, 50%, 75%, 100%)
    const milestonesTracked = {
      "25": false,
      "50": false,
      "75": false,
      "100": false,
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

      // Check milestones
      Object.keys(milestonesTracked).forEach((key) => {
        const threshold = parseInt(key);
        const milestoneKey = key as keyof typeof milestonesTracked;
        if (scrollPercentage >= threshold && !milestonesTracked[milestoneKey]) {
          milestonesTracked[milestoneKey] = true;
          logEvent("Scroll Depth", { depth: `${threshold}%` });
        }
      });
    };

    // Throttle scroll events for performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null as any;
        }, 300);
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    // 5. Track Clicks globally (on key elements like CTAs, buttons, links)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Traverse up to find a clickable container (a or button, or elements with analytic tags)
      let current: HTMLElement | null = target;
      let clickable: HTMLElement | null = null;
      
      while (current && current !== document.body) {
        if (
          current.tagName === "A" ||
          current.tagName === "BUTTON" ||
          current.getAttribute("data-analytics-id")
        ) {
          clickable = current;
          break;
        }
        current = current.parentElement;
      }

      if (clickable) {
        const analyticsId = clickable.getAttribute("data-analytics-id");
        const text = clickable.innerText?.trim().substring(0, 50) || "";
        const href = clickable.getAttribute("href") || "";
        const tag = clickable.tagName;

        logEvent("CTA Click", {
          id: analyticsId || `generic_${tag.toLowerCase()}`,
          text: text || clickable.getAttribute("aria-label") || "unlabeled",
          destination: href || "none",
          element: tag.toLowerCase(),
        });
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      clearInterval(durationInterval);
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("click", handleClick);
      console.warn = originalWarn;
    };
  }, []);

  return null; // Silent component
}
