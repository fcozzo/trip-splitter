import styles from './CardList.module.css';

function CardList({ children }) {
  return <ul className={styles.list}>{children}</ul>;
}

function CardListItem({ children }) {
  return <li className={styles.listItem}>{children}</li>;
}

CardList.Item = CardListItem;

export default CardList;
