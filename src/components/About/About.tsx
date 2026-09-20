import styles from "./About.module.css";

const storyItems = [
  {
    year: "1910",
    title: "Where it began",
    text: "Avrofiliton began as a small traditional kafenion in the heart of Platanias, a place where locals gathered for coffee, conversation and everyday village life.",
  },
  {
    year: "The Kafenion",
    title: "A meeting place",
    text: "For generations, the kafenion remained part of the rhythm of the village — a familiar place to meet, exchange news, enjoy a Greek coffee, an ouzo and a meze.",
  },
  {
    year: "Family",
    title: "Passed through generations",
    text: "Avrofiliton remained in the hands of the family, preserving the character and hospitality that had shaped the establishment from the beginning.",
  },
  {
    year: "Today",
    title: "Still at the heart of Platanias",
    text: "Over time, the original kafenion evolved into the restaurant Avrofiliton is today, while keeping its family character and connection to the village.",
  },
];

const About = () => {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Our Story · Since 1910</p>

          <h2 id="about-title" className={styles.title}>
            More than a restaurant.
            <br />A part of Platanias for over a century.
          </h2>

          <p className={styles.introText}>
            Avrofiliton has grown with Platanias for generations, evolving from
            a traditional village kafenion into the family restaurant it is
            today.
          </p>
        </header>

        <div className={styles.timeline}>
          {storyItems.map((item) => (
            <article key={item.year} className={styles.storyItem}>
              <p className={styles.storyYear}>{item.year}</p>

              <div className={styles.storyContent}>
                <h3 className={styles.storyTitle}>{item.title}</h3>

                <p className={styles.storyText}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.people}>
          <article className={styles.feature}>
            <div className={styles.featureImage}>
              <img
                src={`${import.meta.env.BASE_URL}images/vaggelis+julie.avif`}
                alt="Vagelis and Julie at Avrofiliton Restaurant"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={styles.featureContent}>
              <p className={styles.featureLabel}>The family today</p>

              <h3 className={styles.featureTitle}>Vagelis & Julie</h3>

              <p className={styles.featureText}>
                Today, Vagelis and Julie continue the family tradition,
                welcoming locals and travellers into the same establishment that
                has been part of Platanias since 1910.
              </p>
            </div>
          </article>

          <article className={styles.feature}>
            <div className={styles.featureImage}>
              <img
                src={`${import.meta.env.BASE_URL}images/alekos.avif`}
                alt="Alekos, the parrot of Avrofiliton"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={styles.featureContent}>
              <p className={styles.featureLabel}>A familiar face</p>

              <h3 className={styles.featureTitle}>Alekos</h3>

              <p className={styles.featureText}>
                Alekos the parrot has been part of Avrofiliton for generations
                and has become one of the most recognisable characters of the
                place.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
