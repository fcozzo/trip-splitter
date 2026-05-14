import styles from './Home.module.css';

import { Link } from '@tanstack/react-router';

export function Home() {
  return (
    <ul className={styles.linkList}>
      <li>
        <Link to="/trips">Go to trips</Link>
      </li>
      <li>
        <Link to="/people">Go to people</Link>
      </li>
    </ul>
  );
}
