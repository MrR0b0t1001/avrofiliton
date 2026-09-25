import styles from "./Testimonials.module.css";

type Testimonial = {
  id: string;
  name: string;
  location?: string;
  date?: string;
  quote: string;
  status: "draft" | "published";
};

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Restaurant_Review-g635605-d3431070-Reviews-Avrofiliton-Platanias_Chania_Prefecture_Crete.html";

/*
 * These existing adapted texts are layout drafts.
 * They are shown only during development.
 *
 * Replace each with a genuine guest message supplied for publication,
 * add the guest's chosen attribution, and set status to "published".
 *
 * Keep messages in the guest's own voice.
 * Location and date are optional.
 */
const testimonials: Testimonial[] = [
  {
    id: "guest-1",
    name: "Guest",
    status: "published",
    quote:
      "We ended up having dinner here every evening of our holiday, and it became one of the highlights of the trip. The food always felt genuinely Greek, made with quality ingredients and great attention to detail. What stayed with us most was the hospitality — every night we were welcomed so warmly that it quickly felt like returning to friends. Finishing the evening with a small dessert and raki became part of the experience. We left with some wonderful memories and would happily come back again.",
  },
  {
    id: "guest-2",
    name: "Guest",
    status: "published",
    quote:
      "A lovely place for traditional Greek food, with plenty of choice, fair prices and very enjoyable house wine. The service was friendly and the starters always arrived quickly. During our holidays in Platanias we found ourselves returning almost every evening, both in 2024 and 2025. It was recommended to us by someone local, and we were very glad we listened. We are already looking forward to visiting again.",
  },
  {
    id: "guest-3",
    name: "Guest",
    status: "published",
    quote:
      "A genuine hidden gem with a warm atmosphere, lovely surroundings and excellent Greek food. It is the kind of place where you can settle in and really enjoy the evening. The stifado, courgette balls and orange cake were particular favourites for us. Definitely somewhere worth discovering.",
  },
  {
    id: "guest-4",
    name: "Guest",
    status: "published",
    quote:
      "We came for dinner and were impressed by both the food and the service. Despite being close to the main road, the restaurant still managed to feel comfortable, private and relaxed. We tried the beef steak, scampi risotto and moussaka, and everything was excellent. Many restaurants in Platanias may offer similar dishes, but the quality and authenticity here really stood out. The complimentary cake and raki at the end were a lovely finishing touch.",
  },
  {
    id: "guest-5",
    name: "Guest",
    status: "published",
    quote:
      "From the outside it would be easy to assume this was simply another restaurant on the busy main street, but our experience was completely different. We first stopped for lunch and enjoyed it so much that we returned a few days later for dinner. The food was traditional, full of flavour and clearly prepared with care. In the evening especially, the atmosphere felt very genuine and relaxed, with local families dining alongside visitors. The staff were friendly, attentive and made the whole experience memorable.",
  },
];

const Testimonials = () => {
  const visibleTestimonials = testimonials.filter(
    (testimonial) => testimonial.status === "published" || import.meta.env.DEV,
  );

  const hasEntries = visibleTestimonials.length > 0;

  const hasDrafts = visibleTestimonials.some(
    (testimonial) => testimonial.status === "draft",
  );

  return (
    <section
      id="testimonials"
      className={styles.testimonials}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Avrofiliton · Platanias</p>

          <h2 id="testimonials-title" className={styles.title}>
            {hasEntries ? "Our guestbook" : "From our guests"}
          </h2>

          <p className={styles.introText}>
            {hasEntries
              ? "Notes and memories from people who have spent time at our tables."
              : "Read about visits to Avrofiliton, shared by our guests on Tripadvisor."}
          </p>

          <div className={styles.ornament} aria-hidden="true">
            <span />
          </div>
        </header>

        {hasDrafts && (
          <p className={styles.draftNotice}>
            Development preview: draft entries are shown for layout only and are
            excluded from the production build.
          </p>
        )}

        {hasEntries && (
          <div className={styles.entries}>
            {visibleTestimonials.map((testimonial) => {
              const details = [testimonial.location, testimonial.date]
                .filter(Boolean)
                .join(" · ");

              return (
                <figure key={testimonial.id} className={styles.entry}>
                  {testimonial.status === "draft" && (
                    <p className={styles.draftLabel}>
                      Draft text · Not for publication
                    </p>
                  )}

                  <blockquote className={styles.quote}>
                    <p>{testimonial.quote}</p>
                  </blockquote>

                  <figcaption className={styles.signature}>
                    <span className={styles.authorName}>
                      {testimonial.name}
                    </span>

                    {details && (
                      <span className={styles.authorDetails}>{details}</span>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}

        <footer className={styles.tripadvisor}>
          {hasEntries && (
            <p className={styles.tripadvisorText}>
              More visits, memories and guest reviews on Tripadvisor.
            </p>
          )}

          <a
            href={TRIPADVISOR_URL}
            className={styles.tripadvisorLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our Tripadvisor reviews
            <span aria-hidden="true">↗</span>
            <span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
        </footer>
      </div>
    </section>
  );
};

export default Testimonials;
