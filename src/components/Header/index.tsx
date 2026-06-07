import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;
    const button = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const isHome = pathname === '/';
    const [showNavbar, setShowNavbar] = useState(!isHome);

    useEffect(() => {
        if (isHome) {
            setShowNavbar(false);
            const timer = setTimeout(() => setShowNavbar(true), 4500);
            return () => clearTimeout(timer);
        } else {
            setShowNavbar(true);
        }
    }, [isHome]);

    const isActiveRef = useRef(isActive);
    useEffect(() => {
        isActiveRef.current = isActive;
    }, [isActive]);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    useEffect(() => {
        if (isActive) setIsActive(false)
    }, [pathname])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        let mm = gsap.matchMedia();
        let isVisible = false;

        mm.add("(min-width: 769px)", () => {
            ScrollTrigger.create({
                trigger: document.documentElement,
                start: 0,
                end: "max",
                onUpdate: (self) => {
                    const scrollPos = self.scroll();
                    const direction = self.direction;

                    // If the sidebar is currently open, it must stay visible
                    if (isActiveRef.current) {
                        if (!isVisible) {
                            isVisible = true;
                            gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
                        }
                        return;
                    }

                    if (scrollPos < 100) {
                        if (isVisible) {
                            isVisible = false;
                            gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" });
                        }
                    } else {
                        if (direction === 1 && !isVisible) {
                            isVisible = true;
                            gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
                        } else if (direction === -1 && isVisible) {
                            isVisible = false;
                            gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" });
                        }
                    }
                }
            });
        });

        mm.add("(max-width: 768px)", () => {
            isVisible = true;
            gsap.set(button.current, { scale: 1 });

            ScrollTrigger.create({
                trigger: document.documentElement,
                start: 0,
                end: "max",
                onUpdate: (self) => {
                    const scrollPos = self.scroll();
                    const direction = self.direction;

                    // If the sidebar is currently open, it must stay visible
                    if (isActiveRef.current) {
                        if (!isVisible) {
                            isVisible = true;
                            gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
                        }
                        return;
                    }

                    if (scrollPos < 100) {
                        if (!isVisible) {
                            isVisible = true;
                            gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
                        }
                    } else {
                        if (direction === 1 && !isVisible) {
                            isVisible = true;
                            gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
                        } else if (direction === -1 && isVisible) {
                            isVisible = false;
                            gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" });
                        }
                    }
                }
            });
        });

        return () => mm.revert();
    }, [])

    const isProjectDetail = pathname.startsWith('/work/') && pathname !== '/work';

    return (
        <>
            <motion.div
                ref={header}
                className={`${styles.header} ${isProjectDetail ? styles.headerInverted : ""}`}
                initial={isHome ? { opacity: 0, y: "-100%" } : { opacity: 1, y: 0 }}
                animate={showNavbar ? { opacity: 1, y: 0 } : { opacity: 0, y: "-100%" }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            >
                <Link to="/" className={styles.logo} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.name}>
                        <p className={styles.codeBy}>Alekseev®</p>
                        <div className={styles.hoverText}>
                            <p className={styles.dennis}> by Aditya</p>
                            <p className={styles.snellenberg}>Fajar SY</p>
                        </div>
                    </div>
                </Link>
                <div className={styles.middleText}>
                    <p className={styles.location}>Based in Jakarta Джакaрт</p>
                    <p className={styles.role}>UI/UX Designer + React Frontend Dev</p>
                </div>
                <div className={styles.nav}>
                    <Magnetic>
                        <div className={styles.el}>
                            <Link to="/work">Work</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <Link to="/about">About</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <Link to="/contact">Contact</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                </div>
            </motion.div>
            <motion.div
                className={styles.headerButtonWrapper}
                initial={isHome ? { opacity: 0 } : { opacity: 1 }}
                animate={showNavbar ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div ref={button} className={styles.headerButtonContainer}>
                    <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.buttonContainerEmpty}`}>
                        <motion.div
                            className={styles.buttonInner}
                            initial={isHome ? { borderRadius: "0%", scale: 0, rotate: -180, backgroundColor: "#ffffff" } : { borderRadius: "50%", scale: 1, rotate: 0, backgroundColor: "#1C1D20" }}
                            animate={showNavbar ? { borderRadius: "50%", scale: 1, rotate: 0, backgroundColor: "#1C1D20" } : { borderRadius: "0%", scale: 0, rotate: -180, backgroundColor: "#ffffff" }}
                            transition={{
                                duration: 1.5,
                                type: "spring",
                                bounce: 0.6
                            }}
                        >
                            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                        </motion.div>
                    </Rounded>
                </div>
            </motion.div>
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    )
}
