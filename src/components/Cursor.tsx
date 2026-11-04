import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(max-width: 599px)").matches) return;

    const mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorPos = { x: 0, y: 0 };
    let frameId = 0;
    let disposed = false;

    const updatePosition = () => {
      frameId = 0;
      if (disposed || hover) return;

      cursorPos.x += (mousePos.x - cursorPos.x) / 6;
      cursorPos.y += (mousePos.y - cursorPos.y) / 6;
      cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;

      if (
        Math.abs(mousePos.x - cursorPos.x) > 0.1 ||
        Math.abs(mousePos.y - cursorPos.y) > 0.1
      ) {
        frameId = window.requestAnimationFrame(updatePosition);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      if (!frameId && !hover) {
        frameId = window.requestAnimationFrame(updatePosition);
      }
    };

    const cursorItems = document.querySelectorAll("[data-cursor]");
    const cursorHandlers: {
      element: HTMLElement;
      onMouseOver: (event: MouseEvent) => void;
      onMouseOut: () => void;
    }[] = [];

    cursorItems.forEach((item) => {
      const element = item as HTMLElement;
      const onMouseOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onMouseOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
        if (!frameId) {
          frameId = window.requestAnimationFrame(updatePosition);
        }
      };

      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);
      cursorHandlers.push({ element, onMouseOver, onMouseOut });
    });

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMouseMove);
      cursorHandlers.forEach(({ element, onMouseOver, onMouseOut }) => {
        element.removeEventListener("mouseover", onMouseOver);
        element.removeEventListener("mouseout", onMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
