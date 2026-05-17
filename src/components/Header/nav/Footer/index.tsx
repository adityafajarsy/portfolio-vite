
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { slide } from '../../animation';

export default function index() {
  const links = [
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    }
  ];

  return (
    <div className={styles.footer}>
      {links.map((link, index) => (
        <motion.a 
          key={index}
          href={link.href}
          custom={index + 4} // Continues the delay index from main nav items
          variants={slide}
          initial="initial"
          animate="enter"
          exit="exit"
          className={styles.socialLink}
        >
          {link.icon}
          {link.name}
        </motion.a>
      ))}
    </div>
  )
}
