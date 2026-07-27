import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const CustomCursor: React.FC = () => {
  const dotElRef = useRef<HTMLDivElement>(null);
  const blobElRef = useRef<HTMLDivElement>(null);

  // Position & state refs for 120fps animation loop without React re-renders
  const mouseRef = useRef({ x: -100, y: -100 });
  const initializedRef = useRef(false);

  // Interaction refs
  const isHoveredRef = useRef(false);
  const isClickingRef = useRef(false);
  const hideBlobRef = useRef(false);
  const isWindowVisibleRef = useRef(true);
  const morphTargetRef = useRef<HTMLElement | null>(null);

  // Smooth blob animated state
  const currentBlobRef = useRef({
    x: -100,
    y: -100,
    w: 48,
    h: 48,
    radius: 24,
    opacity: 0
  });

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only run on fine pointer devices (desktop/mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouseRef.current = { x, y };

      if (!initializedRef.current) {
        initializedRef.current = true;
        currentBlobRef.current.x = x - 24;
        currentBlobRef.current.y = y - 24;
      }

      // Inspect target element for avatar or morph targets
      const target = e.target as HTMLElement | null;
      if (target) {
        // Morph target check (e.g., song cards)
        const morphEl = target.closest('[data-cursor-morph="true"]') as HTMLElement | null;
        morphTargetRef.current = morphEl;

        // Completely hide blob when hovering over avatar
        const isAvatar = Boolean(target.closest('[data-avatar="true"], .avatar-container'));
        hideBlobRef.current = isAvatar;

        // Interactive element check for subtle follower size increase
        const isInteractive = Boolean(
          target.closest('a, button, input, [role="button"], .cursor-pointer, [onClick]')
        );
        isHoveredRef.current = isInteractive;
      }

      // Update black pinpoint dot instantly (0ms latency)
      if (dotElRef.current) {
        const dotScale = isClickingRef.current ? 0.75 : isHoveredRef.current ? 1.3 : 1;
        dotElRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${dotScale})`;
        if (isWindowVisibleRef.current) {
          dotElRef.current.style.opacity = '1';
        }
      }
    };

    const onMouseDown = () => {
      isClickingRef.current = true;
      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) scale(0.75)`;
      }
    };

    const onMouseUp = () => {
      isClickingRef.current = false;
      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${
          mouseRef.current.y
        }px, 0) scale(${isHoveredRef.current ? 1.3 : 1})`;
      }
    };

    const onMouseLeave = () => {
      isWindowVisibleRef.current = false;
      if (dotElRef.current) dotElRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isWindowVisibleRef.current = true;
      if (dotElRef.current) dotElRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animateBlob = () => {
      if (initializedRef.current && blobElRef.current) {
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;

        const morphEl = morphTargetRef.current;
        const shouldHide = hideBlobRef.current || !isWindowVisibleRef.current;

        let targetX: number;
        let targetY: number;
        let targetW: number;
        let targetH: number;
        let targetRadius: number;

        if (morphEl && !shouldHide) {
          const rect = morphEl.getBoundingClientRect();
          const pad = 8; // Expand 8px beyond the card so white blob fully covers edges even on fast movement
          targetX = rect.left - pad;
          targetY = rect.top - pad;
          targetW = rect.width + pad * 2;
          targetH = rect.height + pad * 2;

          const computedStyle = window.getComputedStyle(morphEl);
          const parsedRadius = parseFloat(computedStyle.borderRadius);
          targetRadius = (isNaN(parsedRadius) ? 16 : parsedRadius) + pad;
        } else {
          // Normal circular cursor follower
          const size = isHoveredRef.current ? 64 : 48;
          targetW = size;
          targetH = size;
          targetX = mouseX - size / 2;
          targetY = mouseY - size / 2;
          targetRadius = size / 2;
        }

        const targetOpacity = shouldHide ? 0 : 1;

        // Smooth convergence physics lerp - responsive factor when locked to morph target
        const curr = currentBlobRef.current;
        const factor = morphEl ? 0.28 : 0.15;

        curr.x = lerp(curr.x, targetX, factor);
        curr.y = lerp(curr.y, targetY, factor);
        curr.w = lerp(curr.w, targetW, factor);
        curr.h = lerp(curr.h, targetH, factor);
        curr.radius = lerp(curr.radius, targetRadius, factor);
        curr.opacity = lerp(curr.opacity, targetOpacity, 0.2);

        blobElRef.current.style.transform = `translate3d(${curr.x.toFixed(2)}px, ${curr.y.toFixed(2)}px, 0)`;
        blobElRef.current.style.width = `${curr.w.toFixed(2)}px`;
        blobElRef.current.style.height = `${curr.h.toFixed(2)}px`;
        blobElRef.current.style.borderRadius = `${curr.radius.toFixed(2)}px`;
        blobElRef.current.style.opacity = curr.opacity.toFixed(3);
      }

      animationFrameRef.current = requestAnimationFrame(animateBlob);
    };

    animationFrameRef.current = requestAnimationFrame(animateBlob);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Portaled directly to document.body so no parent stacking context isolates mix-blend-mode
  return ReactDOM.createPortal(
    <>
      {/* Solid Pure White Follower Blob that morphs smoothly into target elements */}
      <div
        ref={blobElRef}
        className="fixed top-0 left-0 bg-white opacity-0 pointer-events-none z-[9999]"
        style={{
          willChange: 'transform, width, height, border-radius, opacity',
          mixBlendMode: 'difference'
        }}
      />

      {/* Pinpoint Black Dot Crosshair Pointer */}
      <div
        ref={dotElRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-black shadow-[0_0_4px_rgba(0,0,0,0.8)] opacity-0 pointer-events-none z-[10000]"
        style={{
          willChange: 'transform, opacity'
        }}
      />
    </>,
    document.body
  );
};

