import { useState } from "react";
import styles from "./Visit.module.css";

type ViewMode = "map" | "street";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Avrofiliton/@35.5172566,23.9072674,683m/data=!3m1!1e3!4m14!1m7!3m6!1s0x149c6281b2055555:0xb1753f08119d6db9!2sAvrofiliton!8m2!3d35.5172523!4d23.9098423!16s%2Fg%2F12hl3mlv0!3m5!1s0x149c6281b2055555:0xb1753f08119d6db9!8m2!3d35.5172523!4d23.9098423!16s%2Fg%2F12hl3mlv0!5m1!1e1?hl=el&entry=ttu";

const FACEBOOK_URL = "https://www.facebook.com/avrofiliton/";

const LATITUDE = 35.5172523;
const LONGITUDE = 23.9098423;

/*
 * Replace this with the restaurant's real reservation number.
 *
 * Example:
 * display: +30 28210 12345
 * href: tel:+302821012345
 */
const PHONE_DISPLAY = "+30 28210 XXXXX";
const PHONE_HREF = "tel:+3028210XXXXX";

const Visit = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("map");

  const mapEmbedUrl =
    `https://www.google.com/maps?q=${LATITUDE},${LONGITUDE}` +
    "&z=18&output=embed";

  const streetViewEmbedUrl =
    `https://www.google.com/maps?layer=c` +
    `&cbll=${LATITUDE},${LONGITUDE}` +
    "&cbp=11,0,0,0,0&output=svembed";

  return (
    <section id="visit" className={styles.visit} aria-labelledby="visit-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.visual}>
            <img
              className={styles.sunsetImage}
              src={`${import.meta.env.BASE_URL}images/sunset.avif`}
              alt="Sunset seen from Avrofiliton in Platanias"
              loading="lazy"
              decoding="async"
            />

            <div className={styles.imageOverlay} aria-hidden="true" />

            <div className={styles.imageCaption}>
              <span className={styles.imageCaptionLabel}>
                Platanias · Chania
              </span>

              <p>
                An evening at the table,
                <br />
                with the sun setting over Crete.
              </p>
            </div>
          </div>

          <div className={styles.content}>
            <header className={styles.intro}>
              <p className={styles.eyebrow}>Visit &amp; Reserve</p>

              <h2 id="visit-title" className={styles.title}>
                Come find us in
                <br />
                Platanias.
              </h2>

              <p className={styles.introText}>
                Join us in the heart of Platanias for Cretan food, a relaxed
                table and an evening by the village.
              </p>
            </header>

            <div className={styles.reservation}>
              <div className={styles.reservationCopy}>
                <p className={styles.reservationLabel}>Reservations</p>

                <p className={styles.reservationText}>
                  Give us a call to reserve your table.
                </p>
              </div>

              <a
                href={PHONE_HREF}
                className={styles.phone}
                aria-label={`Call Avrofiliton for reservations at ${PHONE_DISPLAY}`}
              >
                <span className={styles.phoneIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.1 3.5 9.3 8c.3.7.1 1.5-.5 2l-1.1.9a14.7 14.7 0 0 0 5.4 5.4l.9-1.1c.5-.6 1.3-.8 2-.5l4.5 2.2c.7.3 1.1 1 .9 1.8l-.5 2c-.2.8-.9 1.3-1.7 1.3C9.7 22 2 14.3 2 4.8c0-.8.5-1.5 1.3-1.7l2-.5c.8-.2 1.5.2 1.8.9Z" />
                  </svg>
                </span>

                <span>
                  <small>Call to reserve</small>
                  {PHONE_DISPLAY}
                </span>
              </a>
            </div>

            <div className={styles.location}>
              <div className={styles.locationHeader}>
                <div>
                  <p className={styles.locationLabel}>Find us</p>

                  <p className={styles.locationName}>Avrofiliton</p>

                  <p className={styles.locationAddress}>
                    Platanias, Chania · Crete
                  </p>
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
                    onClick={() => setViewMode("street")}
                  >
                    Street View
                  </button>
                </div>
              </div>

              <div className={styles.mapFrame}>
                <iframe
                  key={viewMode}
                  className={styles.map}
                  src={viewMode === "map" ? mapEmbedUrl : streetViewEmbedUrl}
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
                  rel="noreferrer"
                  className={styles.primaryLink}
                >
                  <span>Open in Google Maps</span>

                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>

                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.secondaryLink}
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visit;
