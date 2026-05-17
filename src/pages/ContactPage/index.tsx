import React, { useEffect } from 'react';
import styles from './style.module.scss';
import Magnetic from '../../common/Magnetic';

export default function ContactPage() {
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
        document.body.style.overflowX = 'hidden';
        window.scrollTo(0, 0);
      }, 500);
    })();
  }, []);

  return (
    <main className={styles.contactPage}>
      <div className={styles.contentWrapper}>

        {/* The white band behind the image */}
        <div className={styles.whiteBand}>
          <p>Call Me</p>
          <p>24/7 Support</p>
          <p>Remote</p>
        </div>

        <div className={styles.mainContent}>

          <div className={styles.imageContainer}>
            <img src="/images/profile-footer.jpg" alt="Aditya Fajar SY" />
          </div>

          <div className={styles.linksContainer}>
            <a href="https://goo.gl/maps/jakarta" target="_blank" rel="noopener noreferrer">
              <span>Office: Jakarta, ID.</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a href="https://www.instagram.com/adityafajarsyy/" target="_blank" rel="noopener noreferrer">
              <span>Follow me on Instagram</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a href="https://wa.me/6287741583948?text=Hello%20Aditya,%20I%20just%20saw%20your%20portfolio%20and%20I'm%20interested%20in%20working%20together.%20Let's%20discuss!" target="_blank" rel="noopener noreferrer">
              <span>+6287741583948</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a href="mailto:adityafajar.sy90@gmail.com" target="_blank" rel="noopener noreferrer">
              <span>adityafajar.sy90@gmail.com</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      <h1 className={styles.hugeText}>Contact Now</h1>

      <div className={styles.footerBar}>
        <span>© HELP CENTER ПОДДЕРЖКА</span>
        <span>[WDX® — 01]</span>
        <span>CLARIFICATIONS</span>
      </div>
    </main>
  );
}
