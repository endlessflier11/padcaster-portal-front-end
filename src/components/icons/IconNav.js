import styles from './IconNav.module.scss'

const IconNav = () => {
  return (
    <div className={styles.container}>
      <svg version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
        <path d="m4 10h24c1.104 0 2-0.896 2-2s-0.896-2-2-2h-24c-1.104 0-2 0.896-2 2s0.896 2 2 2zm24 4h-24c-1.104 0-2 0.896-2 2s0.896 2 2 2h24c1.104 0 2-0.896 2-2s-0.896-2-2-2zm0 8h-24c-1.104 0-2 0.896-2 2s0.896 2 2 2h24c1.104 0 2-0.896 2-2s-0.896-2-2-2z" />
      </svg>
    </div>
  );
}

export default IconNav;
