import { useState } from "react";
import styles from "./Visit.module.css";

type ViewMode = "map" | "street";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Avrofiliton/@35.5172566,23.9072674,683m/data=!3m1!1e3!4m14!1m7!3m6!1s0x149c6281b2055555:0xb1753f08119d6db9!2sAvrofiliton!8m2!3d35.5172523!4d23.9098423!16s%2Fg%2F12hl3mlv0!3m5!1s0x149c6281b2055555:0xb1753f08119d6db9!8m2!3d35.5172523!4d23.9098423!16s%2Fg%2F12hl3mlv0!5m1!1e1?hl=el&entry=ttu";

const FACEBOOK_URL = "https://www.facebook.com/avrofiliton/";

const LATITUDE = 35.5172523;
const LONGITUDE = 23.9098423;

// Confirm the complete reservation number before publishing.
const PHONE_DISPLAY = "+30 697 723 1045";
const PHONE_HREF = "tel:+306977231045";

const MAP_EMBED_URL =
  `https://www.google.com/maps?q=${LATITUDE},${LONGITUDE}` +
  "&z=18&output=embed";

const STREET_VIEW_EMBED_URL =
  "https://www.google.com/maps?layer=c" +
  `&cbll=${LATITUDE},${LONGITUDE}` +
  "&cbp=11,0,0,0,0&output=svembed";

const Visit = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("map");

  return (
    <section id="visit" className={styles.visit} aria-labelledby="visit-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <figure className={styles.visual}>
            <div className={styles.photoFrame}>
              <img
                className={styles.sunsetImage}
                src={`${import.meta.env.BASE_URL}images/sunset.avif`}
                alt="The back of Avrofiliton restaurant at sunset in Platanias"
                loading="lazy"
                decoding="async"
              />
            </div>

            <figcaption className={styles.imageCaption}>
              An evening at Avrofiliton, Platanias.
            </figcaption>
          </figure>

          <div className={styles.content}>
            <header className={styles.intro}>
              <p className={styles.eyebrow}>Visit &amp; reserve</p>

              <h2 id="visit-title" className={styles.title}>
                Join us in Platanias.
              </h2>

              <p className={styles.introText}>
                You’ll find Avrofiliton in the heart of the village. Come for a
                meal, settle in and enjoy an evening at our table.
              </p>
            </header>

            <section
              className={styles.reservation}
              aria-labelledby="visit-reservations-title"
            >
              <h3 id="visit-reservations-title" className={styles.detailTitle}>
                A table for you
              </h3>

              <p className={styles.reservationText}>
                Give us a call to reserve your table.
              </p>

              <a
                href={PHONE_HREF}
                className={styles.phone}
                aria-label={`Call Avrofiliton for reservations at ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </a>
            </section>

            <section
              className={styles.location}
              aria-labelledby="visit-location-title"
            >
              <header className={styles.locationHeader}>
                <div>
                  <h3 id="visit-location-title" className={styles.detailTitle}>
                    Find Avrofiliton
                  </h3>

                  <address className={styles.address}>
                    Platanias, Chania · Crete
                  </address>
                </div>

                <div
                  className={styles.viewToggle}
                  role="group"
                  aria-label="Location view"
                >
                  <button
                    type="button"
                    className={[
                      styles.viewButton,
                      viewMode === "map" ? styles.viewButtonActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={viewMode === "map"}
                    aria-controls="visit-location-frame"
                    onClick={() => setViewMode("map")}
                  >
                    Map
                  </button>

                  <button
                    type="button"
                    className={[
                      styles.viewButton,
                      viewMode === "street" ? styles.viewButtonActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={viewMode === "street"}
                    aria-controls="visit-location-frame"
                    onClick={() => setViewMode("street")}
                  >
                    Street View
                  </button>
                </div>
              </header>

              <div id="visit-location-frame" className={styles.mapFrame}>
                <iframe
                  key={viewMode}
                  className={styles.map}
                  src={
                    viewMode === "map" ? MAP_EMBED_URL : STREET_VIEW_EMBED_URL
                  }
                  title={
                    viewMode === "map"
                      ? "Map showing Avrofiliton in Platanias"
                      : "Street View of Avrofiliton in Platanias"
                  }
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className={styles.links}>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.textLink}
                >
                  Open in Google Maps
                  <span aria-hidden="true">↗</span>
                  <span className={styles.srOnly}> (opens in a new tab)</span>
                </a>

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
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visit;
