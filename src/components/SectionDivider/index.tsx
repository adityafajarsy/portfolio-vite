import styles from './style.module.scss';

interface SectionDividerProps {
  leftText: string;
  centerText: string;
  rightText: string;
  theme?: 'light' | 'dark';
}

export default function SectionDivider({
  leftText,
  centerText,
  rightText,
  theme = 'light',
}: SectionDividerProps) {
  return (
    <div className={`${styles.dividerContainer} ${styles[theme]}`}>
      <span>{leftText}</span>
      <span>{centerText}</span>
      <span>{rightText}</span>
    </div>
  );
}
