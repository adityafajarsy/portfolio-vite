
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import { Link } from 'react-router-dom';
export default function index() {

    const phrase = "A React Frontend Developer who enjoys building clean and thoughtful web experiences. With a background in design, I care about how things look, feel, and work.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                    {
                        phrase.split(" ").map((word, index) => {
                            const isBold = index >= 1 && index <= 3;
                            return (
                                <span key={index} className={styles.mask}>
                                    <motion.span
                                        variants={slideUp}
                                        custom={index}
                                        animate={isInView ? "open" : "closed"}
                                        className={isBold ? styles.bold : ""}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            )
                        })
                    }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>This Website Portfolio Built with Vite, React, TypeScript, SCSS, and GSAP. Designed and developed from scratch to showcase my work and creative process.</motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded className={styles.button}>
                        <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                            <p>About me</p>
                        </Link>
                    </Rounded>
                </div>
            </div>
        </div>
    )
}
