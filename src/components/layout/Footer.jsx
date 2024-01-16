import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <a href="https://github.com/rafgpereira" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/rafael-pereira-3729b6295/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/rafgpereira" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span >Control </span> &copy; 2023
      </p>
    </footer>
  );
}
export default Footer;
