import { Slot } from '@radix-ui/react-slot';
import styles from './Card.module.css';

type CardProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

export default function Card({ asChild, children }: CardProps) {
  const Component = (asChild ?? false) ? Slot : 'div';

  return <Component className={styles.card}>{children}</Component>;
}
