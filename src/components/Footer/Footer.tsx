import styles from "./Footer.module.css";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Avrofiliton/@35.5172566,23.9072674,683m/data=!3m1!1e3!4m14!1m7!3m6!1s0x149c6281b2055555:0xb1753f08119d6db9!2sAvrofiliton!8m2!3d35.5172523!4d23.9098423!16s%2Fg%2F12hl3mlv0!3m5!1s0x149c6281b2055555:0xb1753f08119d6db9!8m2!3d35.5172523!4d23.9098423!16s%2Fg%2F12hl3mlv0!5m1!1e1?hl=el&entry=ttu";

const FACEBOOK_URL = "https://www.facebook.com/avrofiliton/";

/*
 * Replace with the real restaurant number.
 */
const PHONE_DISPLAY = "+30 697 723 104";
const PHONE_HREF = "tel:+30697723104";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Our Story" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit & Reserve" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brandColumn}>
            <a
              href="#home"
              className={styles.brand}
              aria-label="Avrofiliton home"
            >
              <span className={styles.brandName}>Avrofiliton</span>
              <span className={styles.brandSince}>Since 1910</span>
            </a>

            <p className={styles.brandText}>
              A family table in the heart of Platanias for more than a century.
            </p>
          </div>

          <div className={styles.visitColumn}>
            <p className={styles.columnLabel}>Visit</p>

            <div className={styles.address}>
              <span>Platanias, Chania</span>
              <span>Crete · Greece</span>
            </div>

            <a
              href={PHONE_HREF}
              className={styles.phone}
              aria-label={`Call Avrofiliton at ${PHONE_DISPLAY}`}
            >
              {PHONE_DISPLAY}
            </a>

            <div className={styles.externalLinks}>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                Google Maps
                <span aria-hidden="true">↗</span>
              </a>

              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                Facebook
                <span aria-hidden="true">↗</span>
              </a>
            </div>
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

          <p>Platanias · Crete · Since 1910</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
