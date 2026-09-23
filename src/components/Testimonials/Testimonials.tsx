import styles from "./Testimonials.module.css";

type Testimonial = {
  id: number;
  name: string;
  location?: string;
  year?: string;
  quote: string;
};

/*
 * Development placeholders only.
 *
 * Replace these with genuine testimonials before the website
 * is published.
 */
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Guest",
    quote:
      "We ended up having dinner here every evening of our holiday, and it became one of the highlights of the trip. The food always felt genuinely Greek, made with quality ingredients and great attention to detail. What stayed with us most was the hospitality — every night we were welcomed so warmly that it quickly felt like returning to friends. Finishing the evening with a small dessert and raki became part of the experience. We left with some wonderful memories and would happily come back again.",
  },
  {
    id: 2,
    name: "Guest",
    quote:
      "A lovely place for traditional Greek food, with plenty of choice, fair prices and very enjoyable house wine. The service was friendly and the starters always arrived quickly. During our holidays in Platanias we found ourselves returning almost every evening, both in 2024 and 2025. It was recommended to us by someone local, and we were very glad we listened. We are already looking forward to visiting again.",
  },
  {
    id: 3,
    name: "Guest",
    quote:
      "A genuine hidden gem with a warm atmosphere, lovely surroundings and excellent Greek food. It is the kind of place where you can settle in and really enjoy the evening. The stifado, courgette balls and orange cake were particular favourites for us. Definitely somewhere worth discovering.",
  },
  {
    id: 4,
    name: "Guest",
    quote:
      "We came for dinner and were impressed by both the food and the service. Despite being close to the main road, the restaurant still managed to feel comfortable, private and relaxed. We tried the beef steak, scampi risotto and moussaka, and everything was excellent. Many restaurants in Platanias may offer similar dishes, but the quality and authenticity here really stood out. The complimentary cake and raki at the end were a lovely finishing touch.",
  },
  {
    id: 5,
    name: "Guest",
    quote:
      "From the outside it would be easy to assume this was simply another restaurant on the busy main street, but our experience was completely different. We first stopped for lunch and enjoyed it so much that we returned a few days later for dinner. The food was traditional, full of flavour and clearly prepared with care. In the evening especially, the atmosphere felt very genuine and relaxed, with local families dining alongside visitors. The staff were friendly, attentive and made the whole experience memorable.",
  },
];

const Testimonials = () => {
  return (
    <section
      className={styles.testimonials}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Guestbook</p>

          <h2 id="testimonials-title" className={styles.title}>
            Words from our guests.
          </h2>

          <p className={styles.introText}>
            A few memories and kind words shared with us by people who have
            joined our table over the years.
          </p>
        </header>

        <div className={styles.entries}>
          {testimonials.map((testimonial, index) => {
            const reversed = index % 2 !== 0;

            return (
              <article
                key={testimonial.id}
                className={[styles.entry, reversed ? styles.entryReversed : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.entryInner}>
                  <p className={styles.entryNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <blockquote className={styles.quote}>
                    <p>{testimonial.quote}</p>
                  </blockquote>

                  <footer className={styles.author}>
                    <span className={styles.authorName}>
                      {testimonial.name}
                    </span>

                    {(testimonial.location || testimonial.year) && (
                      <span className={styles.authorDetails}>
                        {[testimonial.location, testimonial.year]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    )}
                  </footer>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.tripadvisor}>
          <div>
            <p className={styles.tripadvisorLabel}>Looking for more?</p>

            <p className={styles.tripadvisorText}>
              Read independent guest reviews and experiences on Tripadvisor.
            </p>
          </div>

          {/*
           * Replace "#" with the actual Avrofiliton Tripadvisor page.
           */}
          <a
            href="https://www.tripadvisor.com/Restaurant_Review-g635605-d3431070-Reviews-Avrofiliton-Platanias_Chania_Prefecture_Crete.html"
            className={styles.tripadvisorLink}
            target="_blank"
            rel="noreferrer"
          >
            View on Tripadvisor
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
