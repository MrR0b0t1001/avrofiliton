import styles from "./Footer.module.css";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Avrofiliton/@35.5172566,23.9072674,683m/data=!3m1!1e3!4m14!1m7!3m6!1s0x149c6281b2055555:0xb1753f08119d6db9!2sAvrofiliton!8m2!3d35.5172523!4d23.9098423!16s%2Fg%2F12hl3mlv0!3m5!1s0x149c6281b2055555:0xb1753f08119d6db9!8m2!3d35.5172523!4d23.9098423!16s%2Fg%2F12hl3mlv0!5m1!1e1?hl=el&entry=ttu";

const FACEBOOK_URL = "https://www.facebook.com/avrofiliton/";

// Confirm the complete reservation number before publishing.
const PHONE_DISPLAY = "+30 697 723 1045";
const PHONE_HREF = "tel:+306977231045";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Our Story" },
  { href: "#menu", label: "Menu" },
  { href: "#food-stories", label: "Food Stories" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#visit", label: "Visit & Reserve" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.identity}>
          <a
            href="#home"
            className={styles.brand}
            aria-label="Avrofiliton home"
          >
            <span className={styles.brandName}>Avrofiliton</span>
            <span className={styles.brandSince}>Since 1910</span>
          </a>

          <p className={styles.brandText}>
            From the village kafeneion to the family table.
          </p>

          <div className={styles.ornament} aria-hidden="true">
            <span />
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailGroup}>
            <h2 className={styles.detailHeading}>Find us</h2>

            <address className={styles.address}>
              Platanias, Chania
              <br />
              Crete, Greece
            </address>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              Google Maps
              <span aria-hidden="true">↗</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </div>

          <div className={styles.detailGroup}>
            <h2 className={styles.detailHeading}>Reserve a table</h2>

            <p className={styles.detailText}>Give us a call.</p>

            <a
              href={PHONE_HREF}
              className={styles.phone}
              aria-label={`Call Avrofiliton for reservations at ${PHONE_DISPLAY}`}
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className={styles.detailGroup}>
            <h2 className={styles.detailHeading}>Keep in touch</h2>

            <p className={styles.detailText}>Follow Avrofiliton on Facebook.</p>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              Facebook
              <span aria-hidden="true">↗</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.bottom}>
          <p>© {currentYear} Avrofiliton</p>
          <p>Platanias · Chania · Crete</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
