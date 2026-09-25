import styles from "./About.module.css";

const About = () => {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Our story · Platanias, since 1910</p>

          <h2 id="about-title" className={styles.title}>
            A village kafeneion.
            <br />A family story.
          </h2>

          <p className={styles.introText}>
            Before Avrofiliton became the restaurant you see today, it was a
            place where Platanias came together — for a coffee, a conversation
            and the company of familiar faces.
          </p>
        </header>

        <div className={styles.history}>
          <div className={styles.historyMargin}>
            <p className={styles.year}>1910</p>
            <p className={styles.yearCaption}>
              Our beginnings
              <br />
              in Platanias
            </p>
          </div>

          <div className={styles.historyContent}>
            <h3 className={styles.chapterTitle}>
              Part of everyday village life
            </h3>

            <p>
              Avrofiliton began as a small traditional kafeneion in the heart of
              Platanias. Locals gathered here to exchange news, enjoy a Greek
              coffee and spend time together. It became part of the everyday
              rhythm of the village.
            </p>

            <p>
              Through the generations, the establishment remained in the family.
              As Platanias changed around it, the kafeneion gradually grew into
              a restaurant, carrying forward its connection to the village and
              the people who gathered here.
            </p>

            <p>
              That history still shapes Avrofiliton today: a family restaurant
              welcoming travellers, and a familiar meeting place for the local
              community.
            </p>
          </div>
        </div>

        <article className={styles.family} aria-labelledby="about-family-title">
          <figure className={styles.familyPortrait}>
            <div className={styles.photoFrame}>
              <img
                className={styles.familyImage}
                src={`${import.meta.env.BASE_URL}images/vaggelis+julie.avif`}
                alt="Vagelis and Julie at Avrofiliton Restaurant"
                loading="lazy"
                decoding="async"
              />
            </div>

            <figcaption className={styles.caption}>
              Vagelis and Julie at Avrofiliton.
            </figcaption>
          </figure>

          <div className={styles.familyContent}>
            <p className={styles.chapterLabel}>The family today</p>

            <h3 id="about-family-title" className={styles.featureTitle}>
              Vagelis & Julie
            </h3>

            <div className={styles.prose}>
              <p>
                Today, Vagelis and Julie continue the family tradition,
                welcoming locals and travellers into the establishment that has
                been part of Platanias since 1910.
              </p>

              <p>
                Their chapter belongs to a longer story — one that began with
                the village kafeneion and continues around the tables of
                Avrofiliton.
              </p>
            </div>
          </div>
        </article>

        <article className={styles.alekos} aria-labelledby="about-alekos-title">
          <figure className={styles.alekosPortrait}>
            <div className={styles.photoFrame}>
              <img
                className={styles.alekosImage}
                src={`${import.meta.env.BASE_URL}images/alekos.avif`}
                alt="Alekos, the parrot who has been part of Avrofiliton for generations"
                loading="lazy"
                decoding="async"
              />
            </div>

            <figcaption className={styles.caption}>
              Alekos, a familiar presence through the generations.
            </figcaption>
          </figure>

          <div className={styles.alekosContent}>
            <p className={styles.chapterLabel}>Part of the place</p>

            <h3 id="about-alekos-title" className={styles.featureTitle}>
              And, of course, Alekos.
            </h3>

            <div className={styles.prose}>
              <p>
                Alekos the parrot has been with the family for generations. Over
                the years, he has become one of Avrofiliton’s most recognisable
                characters, with a place of his own in its history.
              </p>

              <p>
                Alongside the family and the old kafeneion, Alekos is part of
                what makes this place familiar. His story belongs here too.
              </p>
            </div>
          </div>
        </article>

        <footer className={styles.closing}>
          <span className={styles.closingRule} aria-hidden="true" />

          <p>
            From the village kafeneion to the family restaurant,
            <br className={styles.desktopBreak} />
            still part of Platanias.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default About;
