import { Slot } from '@radix-ui/react-slot';
import styles from './Card.module.css';

type CardProps = {
  asChild: boolean
  children: React.ReactNode
};

export function Card ({ asChild, children }: CardProps) {
  const Component = asChild ? Slot : 'div';

  return <Component className={styles.card}>{children}</Component>;
}
