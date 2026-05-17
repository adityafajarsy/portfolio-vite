import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

let isInitialLoad = true;

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;
    const button = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isInitial, setIsInitial] = useState(isInitialLoad || pathname === '/');
    const [showNavbar, setShowNavbar] = useState(!isInitial);

    useEffect(() => {
        isInitialLoad = false;
    }, []);

    useEffect(() => {
        if (isInitial) {
            const timer = setTimeout(() => setShowNavbar(true), 4500);
            return () => clearTimeout(timer);
        } else {
            setShowNavbar(true);
        }
    }, [isInitial]);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    useEffect(() => {
        if (isActive) setIsActive(false)
    }, [pathname])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        let mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            gsap.to(button.current, {
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 0,
                    end: 100, // Changed from window.innerHeight to 100 to trigger earlier
                    onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                    onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }); setIsActive(false); }
                }
            })
        });

        return () => mm.revert();
    }, [])

    return (
        <>
            <motion.div
                ref={header}
                className={styles.header}
                initial={isInitial ? { opacity: 0, y: "-100%" } : { opacity: 1, y: 0 }}
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
                    <p className={styles.role}>UI/UX Designer + Frontend Dev</p>
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
                initial={isInitial ? { opacity: 0 } : { opacity: 1 }}
                animate={showNavbar ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div ref={button} className={styles.headerButtonContainer}>
                    <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.buttonContainerEmpty}`}>
                        <motion.div 
                            className={styles.buttonInner}
                            initial={isInitial ? { borderRadius: "0%", scale: 0, rotate: -180, backgroundColor: "#ffffff" } : { borderRadius: "50%", scale: 1, rotate: 0, backgroundColor: "#1C1D20" }}
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
