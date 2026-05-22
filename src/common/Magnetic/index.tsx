
import React, { useEffect, useRef, ReactElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const magnetic = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, 'x', { duration: 0.45, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(magnetic.current, 'y', { duration: 0.45, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic.current) return;
      const { clientX, clientY } = e;
      const rect = magnetic.current.getBoundingClientRect();
      
      const currentX = gsap.getProperty(magnetic.current, "x") as number || 0;
      const currentY = gsap.getProperty(magnetic.current, "y") as number || 0;
      
      const left = rect.left - currentX;
      const top = rect.top - currentY;
      
      const x = clientX - (left + rect.width / 2);
      const y = clientY - (top + rect.height / 2);
      
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magnetic.current.addEventListener('mousemove', handleMouseMove);
    magnetic.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (magnetic.current) {
        magnetic.current.removeEventListener('mousemove', handleMouseMove);
        magnetic.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Use type assertion to silence the ref clone error
  return React.cloneElement(children, { ref: magnetic } as any);
}
