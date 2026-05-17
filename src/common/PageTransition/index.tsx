import React from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';

const slideIn = {
  initial: {
    top: "100vh"
  },
  animate: {
    top: "100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    top: "0vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }
};

const slideOut = {
  initial: {
    top: "0vh"
  },
  animate: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  },
  exit: {
    top: "-100vh"
  }
};

const pageSlide = {
  initial: {
    y: "0vh"
  },
  animate: {
    y: "0vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    y: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div 
        variants={pageSlide}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%", minHeight: "100vh" }}
      >
        {children}
      </motion.div>
      <motion.div 
        className={styles.slideIn}
        variants={slideIn}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      <motion.div 
        className={styles.slideOut}
        variants={slideOut}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </>
  );
}
