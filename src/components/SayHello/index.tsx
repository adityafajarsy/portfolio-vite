import { useRef } from 'react';
import styles from './style.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function SayHello() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);
  const fadeY = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);

  return (
    <section ref={container} className={styles.sayHelloSection}>
      <div className={styles.gridWrapper}>
        <div className={styles.gridBackground}></div>
        <motion.div style={{ y: fadeY }} className={styles.gridFade}></motion.div>
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
      <motion.div style={{height}} className={styles.circleContainer}>
          <div className={styles.circle}></div>
      </motion.div>
    </section>
  )
}
