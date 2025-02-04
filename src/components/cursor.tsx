"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ clientX: 0, clientY: 0 });
  const scrollPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined" && cursorRef.current) {
      const cursor = cursorRef.current;

      // Mouse position handler
      const handleMouseMove = (e: MouseEvent) => {
        pos.current = {
          clientX: e.clientX,
          clientY: e.clientY,
        };
        updateCursorPosition();
      };

      // Scroll handler
      const handleScroll = () => {
        scrollPos.current = {
          x: window.scrollX,
          y: window.scrollY,
        };
        updateCursorPosition();
      };

      // Click animation handler
      const handleClick = () => {
        if (!cursor) return;

        // Pulse animation
        gsap
          .timeline()
          .to(cursor, {
            scale: 1.4,
            opacity: 0.8,
            duration: 0.1,
          })
          .to(cursor, {
            scale: 1,
            opacity: 0.5,
            duration: 0.3,
            ease: "power2.out",
          });
      };

      // Update cursor position
      const updateCursorPosition = () => {
        const docX = pos.current.clientX + scrollPos.current.x;
        const docY = pos.current.clientY + scrollPos.current.y;

        gsap.to(cursor, {
          x: docX,
          y: docY,
          duration: 0.1,
          overwrite: true,
        });
      };

      // Text hover effect
      const handleTextEnter = () => {
        cursor.classList.add("text-effect");
        gsap.to(cursor, {
          scale: 1.8,
          opacity: 0.5,
          duration: 0.3,
        });
      };

      // Get interactive elements
      const textElements = document.querySelectorAll<HTMLElement>(
        "h1, h2, h3, h4, h5, h6, button"
      );

      // Initialize positions
      scrollPos.current = { x: window.scrollX, y: window.scrollY };

      // Add event listeners
      document.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);
      document.addEventListener("mousedown", handleClick);

      textElements.forEach((el) => {
        el.addEventListener("mouseenter", handleTextEnter);
        el.addEventListener("mouseleave", () => {
          cursor.classList.remove("text-effect");
          gsap.to(cursor, {
            scale: 1,
            opacity: 0.5,
            duration: 0.3,
          });
        });
      });

      // Cleanup
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("mousedown", handleClick);
        textElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleTextEnter);
        });
      };
    }
  }, []);

  return <div ref={cursorRef} className="hidden cursor z-20 lg:block" />;
};

export default Cursor;
