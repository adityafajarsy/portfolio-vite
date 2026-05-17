import { useRef } from 'react';
import styles from './style.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function SayHello({ withCircle = true }: { withCircle?: boolean }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  return (
    <section ref={container} className={styles.sayHelloSection}>
      <div className={styles.gridWrapper}>
        <motion.div style={{ opacity: gridOpacity }} className={styles.gridBackground}></motion.div>
      </div>
      <div className={styles.container}>
        <p className={styles.label}>.say hello</p>
        <h2 className={styles.title}>
          i'm open for freelance projects, feel free to email me to see how can we collaborate
        </h2>
        <div className={styles.btnContainer}>
            <Magnetic>
                <div className={styles.contactBtn}>contact me ↗</div>
            </Magnetic>
        </div>
      </div>
      {withCircle && (
        <motion.div style={{height}} className={styles.circleContainer}>
            <div className={styles.circle}></div>
        </motion.div>
      )}
    </section>
  )
}
