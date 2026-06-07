import React, { useEffect } from 'react';
import styles from './style.module.scss';
import SayHello from '../../components/SayHello';
import Contact from '../../components/Contact';

export default function About() {
  useEffect(() => {
    let lenis: any = null;
    let reqId: number;

    (async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis();

      function raf(time: number) {
        if (lenis) {
          lenis.raf(time);
          reqId = requestAnimationFrame(raf);
        }
      }
      reqId = requestAnimationFrame(raf);

      setTimeout(() => {
        document.body.style.cursor = 'default';
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        window.scrollTo(0, 0);
      }, 500); // Shorter timeout for about page
    })();

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      if (lenis) lenis.destroy();
    };
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
                <p className={styles.year}>Nov 2025 — May 2026</p>
                <div className={styles.roleInfo}>
                  <h3>Kementerian PANRB</h3>
                  <p>Frontend Developer Intern</p>
                </div>
                <p className={styles.desc}>
                  Contributed to two web platforms at Indonesia's Ministry of Administrative and Bureaucratic Reform. Led the design and development process from UI/UX and user flows to frontend implementation, CMS development, database integration, and deployment infrastructure.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <p className={styles.year}>Sep - Dec 2024 </p>
                <div className={styles.roleInfo}>
                  <h3>Hacktiv8</h3>
                  <p>React Frontend Developer</p>
                </div>
                <p className={styles.desc}>
                  Started my frontend journey through Hacktiv8's ReactJS for Frontend Development bootcamp. Learned web fundamentals, React, Redux, API integration, and Atomic Design, leading to my first deployed e-commerce project. Since then, I've been continuously building projects and exploring modern frontend technologies.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <p className={styles.year}>2022 — 2024</p>
                <div className={styles.roleInfo}>
                  <h3>Student Organizations & Committees</h3>
                  <p>Creative Lead & Multimedia Designer</p>
                </div>
                <p className={styles.desc}>
                  Worked across graphic design, multimedia, social media, and video production. This period shaped my design taste, communication skills, and understanding of digital trends, forming the foundation of how I approach products and user experiences today.
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
