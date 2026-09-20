import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <img
        className={styles.heroImage}
        src={`${import.meta.env.BASE_URL}images/avrofiliton-hero.avif`}
        alt="Avrofiliton restaurant in Platanias, Chania"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />

      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            Platanias, Chania
            <span aria-hidden="true" />
            Since 1910
          </p>

          <h1 id="hero-title" className={styles.heroTitle}>
            At the heart of
            <br />
            Platanias since 1910.
          </h1>

          <p className={styles.heroText}>
            A family-run restaurant rooted in Cretan food, warm hospitality and
            the everyday life of the village.
          </p>

          <div className={styles.heroActions}>
            <a href="#about" className={styles.primaryButton}>
              Our Story
            </a>

            <a href="#menu" className={styles.secondaryButton}>
              View Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
