
import styles from './page.module.scss';
import { useEffect } from 'react';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import Articles from '../components/Articles';
import ParallaxGallery from '../components/ParallaxGallery';
import SayHello from '../components/SayHello';
import About from '../components/About';
import Contact from '../components/Contact';

export default function Home() {

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
      }, 2000);
    })();

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <main className={styles.main}>
      <Landing />
      <Description />
      <Projects />
      <About />
      <Articles />
      <SayHello />
      <ParallaxGallery />
      <Contact />
    </main>
  );
}
