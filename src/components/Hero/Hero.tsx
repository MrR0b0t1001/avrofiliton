import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <header className={styles.welcome}>
          <p className={styles.location}>Platanias · Chania · Crete</p>

          <h1 id="hero-title" className={styles.wordmark}>
            Avrofiliton
          </h1>

          <p className={styles.heritage}>A family table since 1910</p>

          <div className={styles.divider} aria-hidden="true">
            <span />
          </div>

          <p className={styles.introduction}>
            From the village kafeneion to our family restaurant, a place for
            Cretan food and a warm welcome in Platanias.
          </p>

          <nav className={styles.actions} aria-label="Discover Avrofiliton">
            <a href="#about" className={styles.storyLink}>
              Our Story
            </a>

            <a href="#menu" className={styles.menuLink}>
              View Menu
            </a>
          </nav>
        </header>

        <figure className={styles.photograph}>
          <div className={styles.photoFrame}>
            <img
              className={styles.heroImage}
              src={`${import.meta.env.BASE_URL}images/avrofiliton-hero.avif`}
              alt="Avrofiliton restaurant in Platanias, Chania"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </div>

          <figcaption className={styles.caption}>
            Avrofiliton, in the heart of Platanias.
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
