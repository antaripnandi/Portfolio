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

    const updatePointerPosition = (e: MouseEvent | PointerEvent) => {
      if (typeof e.clientX !== 'number' || typeof e.clientY !== 'number') return;

      const x = e.clientX;
      const y = e.clientY;

      mouseRef.current = { x, y };

      if (!initializedRef.current) {
        initializedRef.current = true;
        currentBlobRef.current.x = x - 24;
        currentBlobRef.current.y = y - 24;
      }

      // Check buttons state (if buttons === 0, user released mouse button)
      if ('buttons' in e && e.buttons === 0) {
        isClickingRef.current = false;
      } else if ('buttons' in e && e.buttons > 0) {
        isClickingRef.current = true;
      }

      // Inspect target element for scrollbars, avatar or morph targets
      const target = (e.target || document.elementFromPoint(x, y)) as HTMLElement | null;
      let overScrollbar = x >= window.innerWidth - 18;

      if (target) {
        // Check if mouse is over a container's vertical scrollbar
        const scrollContainer = target.closest('.overflow-y-auto, .custom-scrollbar') as HTMLElement | null;
        if (scrollContainer && scrollContainer.scrollHeight > scrollContainer.clientHeight + 1) {
          const rect = scrollContainer.getBoundingClientRect();
          if (x >= rect.right - 18 && x <= rect.right + 4) {
            overScrollbar = true;
          }
        }

        // Morph target check (e.g., song cards)
        const morphEl = target.closest('[data-cursor-morph="true"]') as HTMLElement | null;
        morphTargetRef.current = morphEl;

        // Completely hide blob when hovering over avatar or scrollbar
        const isAvatar = Boolean(target.closest('[data-avatar="true"], .avatar-container'));
        hideBlobRef.current = isAvatar || overScrollbar;

        // Interactive element check for subtle follower size increase
        const isInteractive = Boolean(
          target.closest('a, button, input, [role="button"], .cursor-pointer, [onClick]')
        );
        isHoveredRef.current = isInteractive;
      } else {
        hideBlobRef.current = overScrollbar;
      }

      // Update black pinpoint dot instantly (0ms latency)
      if (dotElRef.current) {
        const dotScale = isClickingRef.current ? 0.75 : isHoveredRef.current ? 1.3 : 1;
        dotElRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${dotScale})`;
        if (isWindowVisibleRef.current) {
          dotElRef.current.style.opacity = overScrollbar ? '0' : '1';
        }
      }
    };

    const onPointerDown = (e: PointerEvent | MouseEvent) => {
      isClickingRef.current = true;
      updatePointerPosition(e);
    };

    const onPointerUp = (e: PointerEvent | MouseEvent) => {
      isClickingRef.current = false;
      updatePointerPosition(e);
    };

    const onMouseLeave = () => {
      isWindowVisibleRef.current = false;
      if (dotElRef.current) dotElRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isWindowVisibleRef.current = true;
      if (dotElRef.current) dotElRef.current.style.opacity = '1';
    };

    // Use capturing pointermove and mousemove listeners for smooth 1:1 hardware mouse tracking
    window.addEventListener('pointermove', updatePointerPosition, { capture: true, passive: true });
    window.addEventListener('mousemove', updatePointerPosition, { capture: true, passive: true });
    window.addEventListener('dragover', updatePointerPosition, { capture: true, passive: true });

    window.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true });
    window.addEventListener('pointerup', onPointerUp, { capture: true, passive: true });
    window.addEventListener('mousedown', onPointerDown, { capture: true, passive: true });
    window.addEventListener('mouseup', onPointerUp, { capture: true, passive: true });

    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    // Scroll listener to update cursor hover state when element under cursor moves during scroll
    const onScroll = () => {
      if (!isClickingRef.current && mouseRef.current.x >= 0 && mouseRef.current.y >= 0) {
        const x = mouseRef.current.x;
        const y = mouseRef.current.y;
        const el = document.elementFromPoint(x, y) as HTMLElement | null;
        let overScrollbar = x >= window.innerWidth - 18;

        if (el) {
          const scrollContainer = el.closest('.overflow-y-auto, .custom-scrollbar') as HTMLElement | null;
          if (scrollContainer && scrollContainer.scrollHeight > scrollContainer.clientHeight + 1) {
            const rect = scrollContainer.getBoundingClientRect();
            if (x >= rect.right - 18 && x <= rect.right + 4) {
              overScrollbar = true;
            }
          }

          const morphEl = el.closest('[data-cursor-morph="true"]') as HTMLElement | null;
          morphTargetRef.current = morphEl;
          hideBlobRef.current = Boolean(el.closest('[data-avatar="true"], .avatar-container')) || overScrollbar;
          isHoveredRef.current = Boolean(el.closest('a, button, input, [role="button"], .cursor-pointer, [onClick]'));
        } else {
          morphTargetRef.current = null;
          isHoveredRef.current = false;
          hideBlobRef.current = overScrollbar;
        }

        if (dotElRef.current && isWindowVisibleRef.current) {
          dotElRef.current.style.opacity = overScrollbar ? '0' : '1';
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animateBlob = () => {
      if (initializedRef.current && blobElRef.current) {
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;

        // Verify if active morph target is still valid and pointer is within bounds
        // Crucial: While clicking or holding mouse down (holding scrollbar / drag), DO NOT lock to morph target so cursor stays free!
        let morphEl = isClickingRef.current ? null : morphTargetRef.current;
        if (morphEl) {
          if (!document.body.contains(morphEl)) {
            morphTargetRef.current = null;
            morphEl = null;
          } else {
            const rect = morphEl.getBoundingClientRect();
            const threshold = 16; // Margin threshold
            const isInside =
              mouseX >= rect.left - threshold &&
              mouseX <= rect.right + threshold &&
              mouseY >= rect.top - threshold &&
              mouseY <= rect.bottom + threshold;

            if (!isInside) {
              morphTargetRef.current = null;
              morphEl = null;
            }
          }
        }

        const shouldHide = hideBlobRef.current || !isWindowVisibleRef.current;

        let targetX: number;
        let targetY: number;
        let targetW: number;
        let targetH: number;
        let targetRadius: number;

        if (morphEl && !shouldHide) {
          const rect = morphEl.getBoundingClientRect();
          const pad = 8; // Expand 8px beyond the card so white blob fully covers edges
          targetX = rect.left - pad;
          targetY = rect.top - pad;
          targetW = rect.width + pad * 2;
          targetH = rect.height + pad * 2;

          const computedStyle = window.getComputedStyle(morphEl);
          const parsedRadius = parseFloat(computedStyle.borderRadius);
          targetRadius = (isNaN(parsedRadius) ? 16 : parsedRadius) + pad;
        } else {
          // Normal circular cursor follower - always free and natural
          const size = isClickingRef.current ? 36 : isHoveredRef.current ? 64 : 48;
          targetW = size;
          targetH = size;
          targetX = mouseX - size / 2;
          targetY = mouseY - size / 2;
          targetRadius = size / 2;
        }

        const targetOpacity = shouldHide ? 0 : 1;

        // Smooth convergence physics lerp - 0.2 factor for smooth fluid feeling
        const curr = currentBlobRef.current;
        const factor = morphEl ? 0.28 : 0.22;

        curr.x = lerp(curr.x, targetX, factor);
        curr.y = lerp(curr.y, targetY, factor);
        curr.w = lerp(curr.w, targetW, factor);
        curr.h = lerp(curr.h, targetH, factor);
        curr.radius = lerp(curr.radius, targetRadius, factor);
        curr.opacity = lerp(curr.opacity, targetOpacity, 0.25);

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
      window.removeEventListener('pointermove', updatePointerPosition, { capture: true } as any);
      window.removeEventListener('mousemove', updatePointerPosition, { capture: true } as any);
      window.removeEventListener('dragover', updatePointerPosition, { capture: true } as any);

      window.removeEventListener('pointerdown', onPointerDown, { capture: true } as any);
      window.removeEventListener('pointerup', onPointerUp, { capture: true } as any);
      window.removeEventListener('mousedown', onPointerDown, { capture: true } as any);
      window.removeEventListener('mouseup', onPointerUp, { capture: true } as any);

      window.removeEventListener('scroll', onScroll, { capture: true } as any);
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

