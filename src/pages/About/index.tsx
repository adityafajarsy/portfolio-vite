import React, { useEffect } from 'react';
import styles from './style.module.scss';
import SayHello from '../../components/SayHello';
import Contact from '../../components/Contact';

export default function About() {
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
      }, 500); // Shorter timeout for about page
    })();
  }, []);

  return (
    <main className={styles.aboutPage}>
      <div className={styles.contentWrapper}>
        <div className={styles.gridBackground}></div>
        
        <div className={styles.container}>
          {/* Header Section */}
          <section className={styles.headerSection}>
            <h1 className={styles.title}>about</h1>
            <h2 className={styles.heroText}>
              i'm a UI/UX designer, maker, nomad, and coffee lover obsessed with the world of digital
            </h2>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <p className={styles.label}>.experience</p>
                <p className={styles.value}>3 years</p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.label}>.location</p>
                <p className={styles.value}>Jakarta, ID</p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.label}>.freelance</p>
                <p className={styles.value}>Available</p>
              </div>
            </div>
          </section>

          {/* Image & Description Section */}
          <section className={styles.imageDescSection}>
            <div className={styles.imageContainer}>
              <img src="/images/profile-footer.jpg" alt="Aditya Fajar SY" />
            </div>
            <div className={styles.descContainer}>
              <p>
                my craft is building experiences that bring value to people and celebrate function over form. let's hide the ego and give some freedom to creativity and make the first small step changing the world to a better place
              </p>
            </div>
          </section>

          {/* Work Experience Section */}
          <section className={styles.workExperienceSection}>
            <p className={styles.sectionLabel}>.work experience</p>
            <div className={styles.experienceList}>
              
              <div className={styles.experienceItem}>
                <p className={styles.year}>2023 — Now</p>
                <div className={styles.roleInfo}>
                  <h3>Tech Innovators</h3>
                  <p>Frontend Developer</p>
                </div>
                <p className={styles.desc}>
                  Spearhead the development of cutting-edge web applications using React and Next.js, optimizing performance and delivering highly interactive user interfaces.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <p className={styles.year}>2021 — 2023</p>
                <div className={styles.roleInfo}>
                  <h3>Creative Studio</h3>
                  <p>UI/UX Designer</p>
                </div>
                <p className={styles.desc}>
                  Managed design projects from concept to delivery, collaborating with developers to ensure pixel-perfect implementations and seamless user experiences.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <p className={styles.year}>2020 — 2021</p>
                <div className={styles.roleInfo}>
                  <h3>Freelance</h3>
                  <p>Web Designer</p>
                </div>
                <p className={styles.desc}>
                  Designed and built custom portfolios and landing pages for local businesses, focusing on brutalist aesthetics and smooth animations.
                </p>
              </div>

            </div>
          </section>

          {/* Tech Stack Section */}
          <section className={styles.stackSection}>
            <p className={styles.sectionLabel}>.stack</p>
            <div className={styles.stackGrid}>
              
              <div className={styles.stackItem}>
                <div className={styles.iconPlaceholder}>⚛️</div>
                <div className={styles.info}>
                  <h3>React</h3>
                  <p>frontend framework</p>
                </div>
              </div>

              <div className={styles.stackItem}>
                <div className={styles.iconPlaceholder}>🎨</div>
                <div className={styles.info}>
                  <h3>Figma</h3>
                  <p>ui/ux design</p>
                </div>
              </div>

              <div className={styles.stackItem}>
                <div className={styles.iconPlaceholder}>🚀</div>
                <div className={styles.info}>
                  <h3>Framer Motion</h3>
                  <p>animations</p>
                </div>
              </div>

              <div className={styles.stackItem}>
                <div className={styles.iconPlaceholder}>⚡</div>
                <div className={styles.info}>
                  <h3>Vite</h3>
                  <p>build tool</p>
                </div>
              </div>

              <div className={styles.stackItem}>
                <div className={styles.iconPlaceholder}>💅</div>
                <div className={styles.info}>
                  <h3>Sass</h3>
                  <p>styling</p>
                </div>
              </div>

              <div className={styles.stackItem}>
                <div className={styles.iconPlaceholder}>🌐</div>
                <div className={styles.info}>
                  <h3>GSAP</h3>
                  <p>advanced scroll</p>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>

      <SayHello withCircle={false} />
      <Contact />
    </main>
  );
}
