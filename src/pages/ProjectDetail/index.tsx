import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import styles from './style.module.scss';
import { projectsData } from '../../data/projects';
import Image from '../../components/Image';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

const MotionLink = motion(Link);

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const projectIndex = projectsData.findIndex(p => p.slug === slug);
  const project = projectsData[projectIndex];

  // Dynamic Clock
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const wibTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }) + " WIB";
      setTime(wibTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll smooth with Lenis
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
    })();

    // Scroll to top on mount / project change
    window.scrollTo(0, 0);

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      if (lenis) lenis.destroy();
    };
  }, [slug]);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project Not Found</h1>
        <Link to="/work">Back to Work</Link>
      </div>
    );
  }

  // Next Project computation
  const nextProjectIndex = (projectIndex + 1) % projectsData.length;
  const nextProject = projectsData[nextProjectIndex];

  // Parallax next case transition
  const nextSectionWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: nextSectionWrapperRef,
    offset: ["start end", "end end"]
  });

  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const startYOffset = isMobile ? -80 : -windowHeight * 0.45;
  const startContentYOffset = isMobile ? 50 : windowHeight * 0.18;

  const y = useTransform(scrollYProgress, [0, 1], [startYOffset, 0]);
  const curveHeight = useTransform(scrollYProgress, [0, 0.95], [100, 0]);

  // Next project elements slide up from below, following the scroll parallax timing
  const nextContentY = useTransform(scrollYProgress, [0, 1], [startContentYOffset, 0]);
  const thumbnailY = useTransform(scrollYProgress, [0.1, 0.85], [100, 50]);

  // Motion value to smoothly reveal the rest of the image on hover (from 50% translation down to 0%)
  const hoverY = useMotionValue(0);

  // Custom Cursor variables
  const [activeCursor, setActiveCursor] = useState(false);

  useEffect(() => {
    // Animating hoverY with the exact same cubic-bezier curve and duration as the CSS mask height transition
    const controls = animate(hoverY, activeCursor ? -50 : 0, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.65
    });
    return () => controls.stop();
  }, [activeCursor, hoverY]);

  const combinedY = useTransform(
    [thumbnailY, hoverY],
    ([latestThumbnailY, latestHoverY]) => {
      return `${(latestThumbnailY as number) + (latestHoverY as number)}%`;
    }
  );

  const cursorX = useMotionValue(-150);
  const cursorY = useMotionValue(-150);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  // Floating button reveal on scroll or hover magnetic follow
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <main className={styles.projectDetail}>
        {/* Intro Header */}
        <section className={styles.introHeader}>
          <h1 className={styles.mainTitle}>{project.title}</h1>
          
          <div className={styles.metadataGrid}>
            <div className={styles.metaCol}>
              <span className={styles.metaLabel}>Role / Services</span>
              <span className={styles.metaVal}>{project.role}</span>
            </div>
            <div className={styles.metaCol}>
              <span className={styles.metaLabel}>Credits</span>
              <span className={styles.metaVal}>{project.credits}</span>
            </div>
            <div className={styles.metaCol}>
              <span className={styles.metaLabel}>Location & Year</span>
              <span className={styles.metaVal}>{project.locationYear}</span>
            </div>
            <div className={styles.liveSiteButtonWrapper}>
              <Magnetic>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveBadgeLink}>
                  <Rounded backgroundColor="#334BD3" className={styles.liveBadge}>
                    <span>Live site ↗</span>
                  </Rounded>
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section ref={heroRef} className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <Image 
              src={`/images/${project.image}`} 
              alt={project.title} 
              fill={true} 
            />
          </div>
        </section>

        {/* Dynamic Website Showcase Screens */}
        <section className={styles.showcaseGallery}>
          {project.showcase.map((item, idx) => {
            const backgroundCol = item.bgColor || '#F1F1F1';

            if (item.type === 'desktop') {
              return (
                <div key={idx} className={styles.showcaseItem} style={{ backgroundColor: backgroundCol }}>
                  <div className={styles.desktopMockup}>
                    <div className={styles.browserHeader}>
                      <div className={styles.dots}>
                        <span className={styles.dotRed}></span>
                        <span className={styles.dotYellow}></span>
                        <span className={styles.dotGreen}></span>
                      </div>
                      <div className={styles.addressField}>https://{project.slug}.com</div>
                    </div>
                    <div className={styles.desktopScreen}>
                      <img src={`/images/${item.src}`} alt="Desktop website screenshot" />
                    </div>
                    <div className={styles.desktopStand}></div>
                    <div className={styles.desktopBase}></div>
                  </div>
                </div>
              );
            }

            if (item.type === 'tablet') {
              return (
                <div key={idx} className={styles.showcaseItem} style={{ backgroundColor: backgroundCol }}>
                  <div className={styles.tabletMockup}>
                    <div className={styles.tabletScreen}>
                      <div className={styles.tabletCamera}></div>
                      <img src={`/images/${item.src}`} alt="Tablet website screenshot" />
                    </div>
                  </div>
                </div>
              );
            }

            // Default fallback is 'flat'
            return (
              <div key={idx} className={styles.showcaseItem} style={{ backgroundColor: backgroundCol }}>
                <div className={styles.flatFrame}>
                  <img src={`/images/${item.src}`} alt="Flat website screenshot" />
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Next Case Parallax Curve Footer */}
      <div ref={nextSectionWrapperRef} className={styles.nextCaseWrapper}>
        <motion.div 
          style={{ y }} 
          className={styles.nextCaseSection}
          onMouseMove={handleMouseMove}
        >
          {/* Parallax Curve overlay */}
          <motion.div style={{ height: curveHeight }} className={styles.circleContainer}>
            <div className={styles.circle}></div>
          </motion.div>

          <div className={styles.nextCaseContent}>
            <MotionLink 
              to={`/work/${nextProject.slug}`}
              className={styles.nextCaseMainArea}
              style={{ y: nextContentY }}
              onMouseEnter={() => setActiveCursor(true)}
              onMouseLeave={() => setActiveCursor(false)}
            >
              <p className={styles.nextCaseLabel}>Next case</p>
              <div className={styles.nextTitleLink}>
                <h2 className={styles.nextCaseTitle}>{nextProject.title}</h2>
              </div>

              {/* Pocket Thumbnail reveal */}
              <div className={styles.pocketContainer}>
                <div className={styles.pocketLine}></div>
                <div className={styles.pocketMask}>
                  <motion.div 
                    style={{ y: combinedY }} 
                    className={styles.pocketImageWrapper}
                  >
                    <Image src={`/images/${nextProject.image}`} alt={nextProject.title} fill={true} />
                  </motion.div>
                </div>
              </div>
            </MotionLink>

            {/* All Work Button */}
            <div className={styles.allWorkBtnContainer}>
              <Link to="/work" style={{ textDecoration: 'none' }}>
                <Rounded className={styles.allWorkBtn} backgroundColor="#1C1D20">
                  <p>All work ({projectsData.length})</p>
                </Rounded>
              </Link>
            </div>

            {/* Bottom Footer Info */}
            <div className={styles.footerInfo}>
              <div className={styles.footerLeft}>
                <span>
                  <h3>Version</h3>
                  <p>2026 © Edition</p>
                </span>
                <span>
                  <h3>Local time</h3>
                  <p>{time}</p>
                </span>
              </div>
              <div className={styles.footerRight}>
                <span>
                  <h3>socials</h3>
                  <div className={styles.socialLinks}>
                    <Magnetic>
                      <a href="https://www.instagram.com/adityafajarsyy/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </Magnetic>
                    <Magnetic>
                      <a href="https://www.linkedin.com/in/adityafajarsy/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                    </Magnetic>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom blue circle cursor for next project area */}
      <motion.div 
        className={styles.customCursor}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: activeCursor ? 1 : 0,
          opacity: activeCursor ? 1 : 0
        }}
        transition={{
          scale: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
          opacity: { duration: 0.2 }
        }}
      >
        <span>Next case</span>
      </motion.div>
    </>
  );
}
