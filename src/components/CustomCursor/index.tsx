import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import styles from './style.module.scss';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  useEffect(() => {
    // Detect mobile by screen size or pointer capabilities
    const checkMobile = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(hasTouch || window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hide default cursor
    document.body.classList.add('no-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('no-cursor');
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <motion.div
      className={styles.cursor}
      style={{
        x: mouse.x,
        y: mouse.y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0
      }}
    />
  );
}
