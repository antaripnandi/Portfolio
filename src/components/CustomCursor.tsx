import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const CustomCursor: React.FC = () => {
  const dotElRef = useRef<HTMLDivElement>(null);
  const blobElRef = useRef<HTMLDivElement>(null);

  // Position & animation state refs to run at 120fps without React re-renders
  const mouseRef = useRef({ x: -100, y: -100 });
  const blobPosRef = useRef({ x: -100, y: -100 });
  const initializedRef = useRef(false);

  // Interaction refs
  const isHoveredRef = useRef(false);
  const isClickingRef = useRef(false);
  const hideBlobRef = useRef(false);
  const isWindowVisibleRef = useRef(true);

  // Smooth animation values for lerp
  const animStateRef = useRef({
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    opacity: 0,
    blobScale: 1
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
        blobPosRef.current = { x, y };
      }

      // Update small black dot position instantly (0ms latency)
      if (dotElRef.current) {
        const dotScale = isClickingRef.current ? 0.75 : isHoveredRef.current ? 1.3 : 1;
        dotElRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${dotScale})`;
        if (isWindowVisibleRef.current) {
          dotElRef.current.style.opacity = '1';
        }
      }

      // Inspect target element for avatar or interactive buttons
      const target = e.target as HTMLElement | null;
      if (target) {
        // Completely hide blob when hovering over avatar
        const isAvatar = Boolean(target.closest('[data-avatar="true"], .avatar-container'));
        hideBlobRef.current = isAvatar;

        // Interactive element check for subtle expansion
        const isInteractive = Boolean(
          target.closest('a, button, input, [role="button"], .cursor-pointer, [onClick]')
        );
        isHoveredRef.current = isInteractive;
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

    // Smooth fluid physics lerp loop
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animateBlob = () => {
      if (initializedRef.current && blobElRef.current) {
        const targetX = mouseRef.current.x;
        const targetY = mouseRef.current.y;

        const prevX = blobPosRef.current.x;
        const prevY = blobPosRef.current.y;

        // Fluid spring-like position lerp
        const newX = lerp(prevX, targetX, 0.18);
        const newY = lerp(prevY, targetY, 0.18);

        const dx = newX - prevX;
        const dy = newY - prevY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        blobPosRef.current.x = newX;
        blobPosRef.current.y = newY;

        // Target opacity & scale
        const shouldHide = hideBlobRef.current || !isWindowVisibleRef.current;
        const targetOpacity = shouldHide ? 0 : 1;
        const targetBlobScale = shouldHide ? 0.1 : isHoveredRef.current ? 1.4 : 1;

        // Smoothly lerp opacity and scale to avoid abrupt glitches
        const anim = animStateRef.current;
        anim.opacity = lerp(anim.opacity, targetOpacity, 0.2);
        anim.blobScale = lerp(anim.blobScale, targetBlobScale, 0.2);

        // Calculate stretch deformation based on movement speed
        const maxStretch = 0.45;
        const stretch = Math.min(speed * 0.02, maxStretch);
        const targetScaleX = 1 + stretch;
        const targetScaleY = 1 - stretch * 0.5;

        anim.scaleX = lerp(anim.scaleX, targetScaleX, 0.25);
        anim.scaleY = lerp(anim.scaleY, targetScaleY, 0.25);

        // Smooth rotation following cursor trajectory
        if (speed > 0.4) {
          const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          let diff = targetAngle - anim.rotation;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          anim.rotation += diff * 0.2;
        }

        const clickScale = isClickingRef.current ? 0.8 : 1;
        const finalScaleX = anim.scaleX * anim.blobScale * clickScale;
        const finalScaleY = anim.scaleY * anim.blobScale * clickScale;

        // Apply styles with high precision
        blobElRef.current.style.opacity = anim.opacity.toFixed(3);
        blobElRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) rotate(${anim.rotation.toFixed(
          2
        )}deg) scale(${finalScaleX.toFixed(3)}, ${finalScaleY.toFixed(3)})`;
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
      {/* Solid Pure White Follower Blob with mix-blend-difference attached directly to body */}
      <div
        ref={blobElRef}
        className="fixed top-0 left-0 -ml-6 -mt-6 w-12 h-12 rounded-full bg-white opacity-0 pointer-events-none z-[9999]"
        style={{
          willChange: 'transform, opacity',
          mixBlendMode: 'difference'
        }}
      />

      {/* Pinpoint Black Dot */}
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
