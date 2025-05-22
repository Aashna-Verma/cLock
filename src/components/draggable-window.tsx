// src/components/DraggableWindow.tsx
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { cva } from "class-variance-authority";
import { useState, useRef, useEffect } from "react";
import { XIcon } from "lucide-react";

const windowStyles = cva(
  `rounded shadow-lg backdrop-blur-2xl bg-pink-900/40 border overflow-hidden`,
  {
    variants: {
      focused: {
        true: "border-pink-800/30",
        false: "",
      },
    },
    defaultVariants: {
      focused: false,
    },
  }
);

let nextZ = 100;

interface DraggableWindowProps {
  id: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onDragStop: RndDragCallback;
  onResizeStop: RndResizeCallback;
  onClose: () => void;
  children: React.ReactNode;
}

function DraggableWindow({
  id,
  title,
  position,
  size,
  onDragStop,
  onResizeStop,
  onClose,
  children,
}: DraggableWindowProps) {
  const [zIndex, setZIndex] = useState(50);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Listen for other windows activating
  useEffect(() => {
    function onOtherActivate(e: Event) {
      const detail = (e as CustomEvent).detail as string;
      if (detail !== id) setFocused(false);
    }
    window.addEventListener("windowActivated", onOtherActivate);
    return () => {
      window.removeEventListener("windowActivated", onOtherActivate);
    };
  }, [id]);

  function activate() {
    setZIndex(++nextZ);
    setFocused(true);
    window.dispatchEvent(new CustomEvent("windowActivated", { detail: id }));
  }

  // click outside → unfocus
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current?.contains(e.target as Node)) return;
      setFocused(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Rnd
        bounds="window"
        size={size}
        position={position}
        onMouseDown={activate}
        onDragStart={activate}
        onResizeStart={activate}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        style={{ zIndex }}
        className={windowStyles({ focused })}
        // make the title-bar the drag handle:
        dragHandleClassName="window-header"
      >
        {/* Title bar */}
        <div
          className="window-header flex items-center justify-between px-2 py-1 border-b cursor-move"
        >
          <span className="text-xs font-extralight">{title}</span>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400"
            aria-label={`Close ${title}`}
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="p-2">
          {children}
        </div>
      </Rnd>
    </div>
  );
}

export default DraggableWindow;