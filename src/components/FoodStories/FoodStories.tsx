import styles from "./FoodStories.module.css";

type KitchenQuote = {
  text: string;
  author: string;
};

type FoodStory = {
  id: string;
  name: string;
  image: string;
  alt: string;
  imagePosition?: string;
  story: string[];
  preparation?: string;
  kitchenQuote?: KitchenQuote;
};

const foodStories: FoodStory[] = [
  {
    id: "dakos",
    name: "Dakos",
    image: `${import.meta.env.BASE_URL}images/dakos.avif`,
    alt: "Traditional Cretan dakos served at Avrofiliton",
    imagePosition: "center",
    story: [
      "Before it became one of Crete's most recognisable dishes, the barley rusk was practical food. Baked until dry, it could be kept for long periods and carried by farmers, shepherds and families across the island.",
      "Softened with ripe tomato and olive oil, then finished with local cheese and oregano, those simple ingredients became a dish closely tied to the everyday food of Crete.",
    ],
  },
  {
    id: "gamopilafo",
    name: "Gamopilafo",
    image: `${import.meta.env.BASE_URL}images/gamopilafo.avif`,
    alt: "Traditional Cretan gamopilafo served at Avrofiliton",
    imagePosition: "center",
    story: [
      "Gamopilafo has long been connected with large gatherings and celebrations in Crete. Its name reflects that tradition, with the dish historically associated with weddings and tables shared by many.",
      "Cooked slowly in a rich broth and served simply, it represents a style of Cretan cooking where the occasion around the food can be just as important as the recipe itself.",
    ],
  },
  {
    id: "kalitsounia",
    name: "Kalitsounia",
    image: `${import.meta.env.BASE_URL}images/kalitsounia.avif`,
    alt: "Traditional Cretan kalitsounia served at Avrofiliton",
    imagePosition: "center",
    story: [
      "Across Crete, small pies appear in many forms. Their fillings, shapes and preparation can change from one village or family to another, often reflecting what was available locally.",
      "Cheese, greens and herbs are among the ingredients most closely associated with them, creating the kind of recipe that survives because generations continue making it.",
    ],
  },
];

const FoodStories = () => {
  return (
    <section
      id="food-stories"
      className={styles.section}
      aria-labelledby="food-stories-title"
    >
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>The Avrofiliton kitchen</p>

          <h2 id="food-stories-title" className={styles.title}>
            The stories behind our plates.
          </h2>

          <p className={styles.introText}>
            A closer look at the food we serve, where it comes from and how it
            reaches your table.
          </p>
        </header>

        <div className={styles.stories}>
          {foodStories.map((dish, index) => (
            <article
              key={dish.id}
              className={[
                styles.story,
                index % 2 !== 0 ? styles.storyReversed : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-labelledby={`food-story-${dish.id}`}
            >
              <figure className={styles.photograph}>
                <div className={styles.imageFrame}>
                  <img
                    className={styles.image}
                    src={dish.image}
                    alt={dish.alt}
                    style={{
                      objectPosition: dish.imagePosition ?? "center",
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <figcaption className={styles.caption}>
                  <span>{dish.name}</span>
                  <span>At Avrofiliton</span>
                </figcaption>
              </figure>

              <div className={styles.content}>
                <h3 id={`food-story-${dish.id}`} className={styles.dishName}>
                  {dish.name}
                </h3>

                <div className={styles.storyBody}>
                  {dish.story.map((paragraph, paragraphIndex) => (
                    <p key={`${dish.id}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>

                {dish.preparation && (
                  <div className={styles.preparation}>
                    <h4 className={styles.preparationTitle}>
                      How we prepare it
                    </h4>

                    <p>{dish.preparation}</p>
                  </div>
                )}

                {dish.kitchenQuote && (
                  <figure className={styles.kitchenNote}>
                    <blockquote>
                      <p>“{dish.kitchenQuote.text}”</p>
                    </blockquote>

                    <figcaption>— {dish.kitchenQuote.author}</figcaption>
                  </figure>
                )}
              </div>
            </article>
          ))}
        </div>

        <footer className={styles.footer}>
          <p>There is more on the table.</p>

          <a href="#menu" className={styles.menuLink}>
            Explore our menu
            <span aria-hidden="true"> →</span>
          </a>
        </footer>
      </div>
    </section>
  );
};

export default FoodStories;
