import styles from "./FoodStories.module.css";

type FoodStory = {
  id: string;
  number: string;
  name: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  alt: string;
};

const foodStories: FoodStory[] = [
  {
    id: "dakos",
    number: "01",
    name: "Dakos",
    heading: "Born from necessity.",
    alt: "Traditional Cretan dakos served at Avrofiliton",
    paragraphs: [
      "Before it became one of Crete's most recognisable dishes, the barley rusk was practical food. Baked until dry, it could be kept for long periods and carried by farmers, shepherds and families across the island.",
      "Softened with ripe tomato and olive oil, then finished with local cheese and oregano, those simple ingredients became a dish closely tied to the everyday food of Crete.",
    ],
    image: `${import.meta.env.BASE_URL}images/dakos.avif`,
  },
  {
    id: "gamopilafo",
    number: "02",
    name: "Gamopilafo",
    heading: "A dish made for gathering.",
    alt: "Traditional Cretan gamopilafo served at Avrofiliton",
    paragraphs: [
      "Gamopilafo has long been connected with large gatherings and celebrations in Crete. Its name reflects that tradition, with the dish historically associated with weddings and tables shared by many.",
      "Cooked slowly in a rich broth and served simply, it represents a style of Cretan cooking where the occasion around the food can be just as important as the recipe itself.",
    ],
    image: `${import.meta.env.BASE_URL}images/gamopilafo.avif`,
  },
  {
    id: "kalitsounia",
    number: "03",
    name: "Kalitsounia",
    heading: "Passed from one kitchen to another.",
    alt: "Traditional Cretan kalitsounia served at Avrofiliton",
    paragraphs: [
      "Across Crete, small pies appear in many forms. Their fillings, shapes and preparation can change from one village or family to another, often reflecting what was available locally.",
      "Cheese, greens and herbs are among the ingredients most closely associated with them, creating the kind of recipe that survives because generations continue making it.",
    ],
    image: `${import.meta.env.BASE_URL}images/kalitsounia.avif`,
  },
];

const FoodStories = () => {
  return (
    <section className={styles.section} aria-labelledby="food-stories-title">
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Cretan Table · Stories</p>

          <h2 id="food-stories-title" className={styles.title}>
            Food with a past.
          </h2>

          <p className={styles.introText}>
            Some dishes tell you as much about a place as its people, traditions
            and history.
          </p>
        </header>

        <div className={styles.stories}>
          {foodStories.map((story, index) => {
            const reversed = index % 2 !== 0;

            return (
              <article
                key={story.id}
                className={[styles.story, reversed ? styles.storyReversed : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.imageColumn}>
                  {story.image ? (
                    <img
                      className={styles.image}
                      src={story.image}
                      alt={story.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className={styles.imagePlaceholder}
                      role="img"
                      aria-label={`${story.name} photography placeholder`}
                    >
                      <span className={styles.placeholderName}>
                        {story.name}
                      </span>

                      <span className={styles.placeholderText}>
                        Plate photography
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.storyContent}>
                  <div className={styles.storyMeta}>
                    <span className={styles.storyNumber}>{story.number}</span>

                    <span className={styles.storyRule} />

                    <span className={styles.storyTotal}>
                      {String(foodStories.length).padStart(2, "0")}
                    </span>
                  </div>

                  <p className={styles.dishName}>{story.name}</p>

                  <h3 className={styles.storyHeading}>{story.heading}</h3>

                  <div className={styles.storyBody}>
                    {story.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FoodStories;
