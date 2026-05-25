import React, { useState, useRef, useEffect } from 'react'
import styles from './style.module.scss';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ArticleProps {
  index: number;
  title: string;
  date: string;
  src: string;
  slug: string;
}

export default function Article({index, title, date, src, slug}: ArticleProps) {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    const isActive = isMobile ? isInView : isHovered;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/article/${slug}`);
    };

    return (
        <div 
            onClick={handleClick}
            ref={ref}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            className={`${styles.article} ${isActive ? styles.active : ''}`}
        >
            <div className={styles.textContainer}>
                <h2>{title}</h2>
                <p>{date}</p>
            </div>
            
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        initial={{ opacity: 0, x: -150, scale: 0.9, filter: "blur(5px)" }}
                        animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -50, scale: 0.95, filter: "blur(5px)" }}
                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                        className={styles.hoverImage}
                    >
                        <img src={src} alt={title} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.arrow}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H8.5M17 7V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
}
