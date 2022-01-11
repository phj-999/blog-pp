import styles from './index.less';
import LayoutSide from './LayoutSide';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <LayoutSide />
    </div>
  );
}
