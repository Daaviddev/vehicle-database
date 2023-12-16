import { Link } from 'react-router-dom';
import styles from '../../styles/SidePanelNav.module.css';

const SidePanelNav = () => {
  <div className={styles.sidePanelWrapper}>
    {/* LOGO */}
    <div className={styles.sidePanelHeaderWrapper}>
      <h2>Vehicle Database</h2>
    </div>
    {/* NAVIGATION */}
    <div className={styles.sidePanelDividerWrapper}>
      <h6>NAVIGATION</h6>
    </div>
    {/* NAVIGATION LINKS */}
    <nav>
      <ul className={styles.sidePanelLinkWrapper}>
        {/* NAVIGATION LINK */}
        <li>
          <Link className={styles.sidePanelLinkStyle} to="/vehicle-makes">
            <h6>Vehicle Makes</h6>
          </Link>
        </li>
        {/* NESTED LINK */}
        <ul className={styles.sidePanelSublinkWrapper}>
          <li>
            <Link className={styles.sidePanelSublinkStyle} to="/vehicle-makes">
              <h6>Create New</h6>
            </Link>
          </li>
        </ul>
        {/* NAVIGATION LINK */}
        <li>
          <Link className={styles.sidePanelLinkStyle} to="/vehicle-makes">
            <h6>Vehicle Models</h6>
          </Link>
        </li>
        {/* NESTED LINK */}
        <ul className={styles.sidePanelSublinkWrapper}>
          <li>
            <Link className={styles.sidePanelSublinkStyle} to="/vehicle-makes">
              <h6>Create New</h6>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  </div>;
};

export default SidePanelNav;
