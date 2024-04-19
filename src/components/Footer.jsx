import { FaTelegram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const linkedin_url = import.meta.env.VITE_LINKEDIN_URL;
  const telegram_url = import.meta.env.VITE_TELEGRAM_URL;
  return (
    <footer className="footer">
      <div className="social-icons">
        <a
          className="footer-item"
          href={linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          className="footer-item"
          href={telegram_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram />
        </a>
        &copy; 2024 Portfolio Damien Riandiere. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
