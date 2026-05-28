import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Contact from '../../components/Contact';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';

export default function WorkPage() {
  const [activeCursor, setActiveCursor] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    let lenis: any = null;
    let reqId: number;

    (async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis();

      function raf(time: number) {
        if (lenis) {
          lenis.raf(time);
          reqId = requestAnimationFrame(raf);
        }
      }
      reqId = requestAnimationFrame(raf);

      setTimeout(() => {
        document.body.style.cursor = 'default';
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        window.scrollTo(0, 0);
      }, 500);
    })();

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      if (lenis) lenis.destroy();
    };
  }, []);

  const projects = projectsData.map(p => ({
    title: p.title,
    image: p.image,
    index: p.index,
    category: p.category,
    slug: p.slug
  }));

  return (
    <>
      <main className={styles.workPage}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>
            All<br />Works
            <span className={styles.count}>({projects.length})</span>
          </h1>
        </div>
        
        <div className={styles.rightSide}>
          {projects.map((project, idx) => (
            <Link 
              key={idx} 
              to={`/work/${project.slug}`} 
              className={styles.projectItem}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                className={styles.imageContainer}
                onMouseEnter={() => setActiveCursor(true)}
                onMouseLeave={() => setActiveCursor(false)}
              >
                <img src={`/images/${project.image}`} alt={project.title} />
                <div className={styles.hoverOverlay}>
                  <div className={styles.hoverBand}>
                    <p>{project.category}</p>
                  </div>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <span className={styles.index}>{project.index}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Contact />

      <motion.div 
        className={styles.customCursor}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: activeCursor ? 1 : 0,
          opacity: activeCursor ? 1 : 0
        }}
        transition={{
          scale: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
          opacity: { duration: 0.2 }
        }}
      >
        <p>VIEW</p>
      </motion.div>
    </>
  );
}
