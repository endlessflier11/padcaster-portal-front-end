import styles from './StyleReference.module.scss'
import { useEffect } from 'react';

const StyleReference = () => {
  useEffect(() => {
    const items = Array.from(document.getElementsByClassName(`${styles.item}`));
    var delay = 0.0;
    items.forEach((e) => {
      e.style.transitionDelay = `${delay}s`;
      e.style.opacity = '1.0';
      e.style.marginRight = '0';
      e.style.transform = 'scale(1.0)';
      delay += 0.1;
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1>H1 style</h1>
      </div>
      <div className={styles.item}>
        <h2>H2 style</h2>
      </div>
      <div className={styles.item}>
        <h2 className="inactive">H2 style inactive</h2>
      </div>
      <div className={styles.item}>
        <p>p style</p>
      </div>
      <div className={styles.item}>
        <small>small style</small>
      </div>
      <div className={styles.item}>
        <a href="#">Link</a>
      </div>
      <div className={styles.item}>
        <button>Primary button style</button></div >
      <div className={styles.item}>
        <button className="simple">Primary simple button style</button>
      </div>
      <div className={styles.item}>
        <button className="secondary">Secondary button style</button>
      </div>
      <div className={styles.item}>
        <button className="large">Large button style</button>
      </div>
      <div className={styles.item}>
        <button className="small">Small button style</button>
      </div>
      <div className={styles.item}>
        <button className="largeSecondary">Large secondary button style</button>
      </div>
      <div className={styles.item}>
        <button className="smallSecondary">Small secondary button style</button>
      </div>
      <div className={styles.item}>
        <button className="text">Text button style</button>
      </div>
      <div className={styles.item}>
        <input type="text" defaultValue="Form field" />
      </div>
      <div className={styles.item}>
        <div className="selectArrow" />
        <select name="Select">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </select>
      </div>
    </div>
  );
}

export default StyleReference;

