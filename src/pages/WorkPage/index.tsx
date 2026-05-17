import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Contact from '../../components/Contact';
import { motion, useMotionValue, useSpring } from 'framer-motion';

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
    (async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis();

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      setTimeout(() => {
        document.body.style.cursor = 'default';
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
      }, 500);
    })();
  }, []);

  const projects = [
    {
      title: "Sonder Goods",
      image: "c2montreal.png",
      index: "(01)",
      category: "Branding"
    },
    {
      title: "Studio Office",
      image: "officestudio.png",
      index: "(02)",
      category: "Web Design"
    },
    {
      title: "Locomotive",
      image: "locomotive.png",
      index: "(03)",
      category: "Development"
    },
    {
      title: "Silencio",
      image: "silencio.png",
      index: "(04)",
      category: "UI/UX"
    },
    {
      title: "Personal Brand",
      image: "profile-footer.jpg",
      index: "(05)",
      category: "Art Direction"
    }
  ];

  return (
    <>
      <main className={styles.workPage}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>
            All<br />Works
            <span className={styles.count}>(5)</span>
          </h1>
        </div>
        
        <div className={styles.rightSide}>
          {projects.map((project, idx) => (
            <div key={idx} className={styles.projectItem}>
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
            </div>
          ))}
        </div>
      </main>
      <div style={{ height: "500px", backgroundColor: "#000", width: "100%" }}></div>
      <Contact />

      <motion.div 
        className={styles.customCursor}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
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
