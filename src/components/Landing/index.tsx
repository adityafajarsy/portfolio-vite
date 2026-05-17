import styles from './style.module.scss';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Landing() {
  const [stage, setStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMob = window.innerWidth <= 768;
    setIsMobile(isMob);

    // Animation sequence
    // Stage 0: Initial black screen
    // Stage 1: "Alekseev" drops from top to center, opacity fades in early
    // Stage 2: Grows slightly, moves down
    // Stage 3: Full layout reveals, "Alekseev" moves to final massive size at bottom with highlight
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), isMob ? 2000 : 3500);
    const t3 = setTimeout(() => setStage(3), isMob ? 2800 : 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const textVariants: any = {
    initial: {
      opacity: 0,
      scale: isMobile ? 0.4 : 0.25,
      y: isMobile ? "-80svh" : "-100svh",
    },
    stage1: {
      opacity: isMobile ? 0.4 : 0.2,
      scale: isMobile ? 0.4 : 0.25,
      y: "-45vh",
      transition: {
        y: { duration: isMobile ? 1.5 : 2, ease: "easeOut" },
        opacity: { duration: 0.5, ease: "linear" }
      }
    },
    stage2: {
      opacity: isMobile ? 0.7 : 0.5,
      scale: isMobile ? 0.5 : 0.35,
      y: "-35vh",
      transition: { duration: 1, ease: "easeInOut" }
    },
    stage3: {
      opacity: 1,
      scale: 1,
      y: 0,
      backgroundPosition: ["100% 0%", "0% 0%"],
      transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const bgVariants: any = {
    initial: { opacity: 0 },
    stage3: { opacity: 1, transition: { duration: 1.5, delay: 1, ease: "easeInOut" } }
  };

  const slideUp = {
    initial: {
      y: "100%"
    },
    open: (i: number) => ({
      y: "0%",
      transition: { duration: 0.5, delay: 1 + (0.02 * i), ease: [0.76, 0, 0.24, 1] }
    }),
    closed: {
      y: "100%",
      transition: { duration: 0.5 }
    }
  };

  const lines = [
    "Structuring Digital",
    "Experiences Where",
    "Logic Meets Pure",
    "ЭСТЕТИКА."
  ];

  const getStageName = () => {
    if (stage === 0) return "initial";
    if (stage === 1) return "stage1";
    if (stage === 2) return "stage2";
    return "stage3";
  };

  const bottomBarVariants: any = {
    initial: { opacity: 0 },
    mobileVisible: { opacity: 1, transition: { duration: 0.5 } },
    stage3: { opacity: 1, transition: { duration: 1.5, delay: 1, ease: "easeInOut" } }
  };

  return (
    <main className={styles.landing}>
      <motion.div
        className={styles.layoutContent}
        variants={bgVariants}
        initial="initial"
        animate={stage === 3 ? "stage3" : "initial"}
      >
        <div className={styles.topSection}>
          <h1>
            {lines.map((line, lineIndex) => (
              <span key={lineIndex} className={styles.line}>
                {line.split(" ").map((word, wordIndex) => {
                  const globalIndex = lineIndex * 5 + wordIndex;
                  return (
                    <span key={wordIndex} className={styles.wordWrapper}>
                      <span className={styles.mask}>
                        <motion.span
                          variants={slideUp}
                          custom={globalIndex}
                          initial="initial"
                          animate={stage === 3 ? "open" : "initial"}
                        >
                          {word}
                        </motion.span>
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
        </div>

        <div className={styles.mobileImageContainer}>
          <img src="/images/hero-mobile.jpg" alt="Hero Mobile Image" />
        </div>

        <motion.div
          className={styles.middleBar}
          initial={{ scaleY: 0 }}
          animate={stage === 3 ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span initial={{ opacity: 0 }} animate={stage === 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2 }}>Art Direction</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={stage === 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2.1 }}>Web Design</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={stage === 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2.2 }}>ГРАФИЧЕСКИЙ ДИЗАЙНЕР</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={stage === 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2.3 }}>Frontend</motion.span>
        </motion.div>
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={stage === 3 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.div>

      <div className={styles.titleContainer}>
        <motion.h1
          className={styles.alekseev}
          variants={textVariants}
          initial="initial"
          animate={getStageName()}
        >
          Alekseev™
        </motion.h1>
      </div>

      <motion.div
        className={styles.bottomBar}
        variants={bottomBarVariants}
        initial="initial"
        animate={isMobile ? "mobileVisible" : (stage === 3 ? "stage3" : "initial")}
      >
        <span>© CURATED INTERFACES ДИЗАЙН</span>
        <span>(WDX® — 02)</span>
        <span>DIGITAL DESIGNER</span>
      </motion.div>
    </main>
  );
}
