import { FaTelegram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
<footer className="footer">
  <div className="social-icons">
    <a className= "footer-item" href="https://www.linkedin.com/in/damien-riandiere/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin />
    </a>
    <a className= "footer-item" href="https://t.me/kerpopronos" target="_blank" rel="noopener noreferrer">
      <FaTelegram />
    </a>
    &copy; 2024 Portfolio Damien Riandiere. Tous droits réservés.
  </div>
</footer>
  );
}

export default Footer;