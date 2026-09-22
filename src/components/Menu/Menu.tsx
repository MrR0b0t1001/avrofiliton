import { useEffect, useRef, useState, type MouseEvent } from "react";

import styles from "./Menu.module.css";

type MenuItem = {
  name: string;
  description: string;
};

type MenuPage = {
  id: string;
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

const menuPages: MenuPage[] = [
  {
    id: "starters",
    number: "01",
    label: "Starters",
    title: "To Begin",
    subtitle: "For the middle of the table.",
    items: [
      {
        name: "Cretan Dakos",
        description: "Barley rusk · tomato · mizithra · oregano",
      },
      {
        name: "Tzatziki",
        description: "Greek yoghurt · cucumber · garlic · olive oil",
      },
      {
        name: "Kalitsounia",
        description: "Traditional pies · local cheese · herbs",
      },
      {
        name: "Fava",
        description: "Split peas · red onion · capers · olive oil",
      },
      {
        name: "Grilled Vegetables",
        description: "Seasonal vegetables · herbs · Cretan olive oil",
      },
    ],
  },
  {
    id: "salads",
    number: "02",
    label: "Salads",
    title: "From the Garden",
    subtitle: "Simple ingredients, served fresh.",
    items: [
      {
        name: "Greek Salad",
        description: "Tomato · cucumber · feta · olives · oregano",
      },
      {
        name: "Cretan Salad",
        description: "Tomato · local cheese · rusks · herbs",
      },
      {
        name: "Village Greens",
        description: "Seasonal greens · lemon · extra virgin olive oil",
      },
      {
        name: "Avrofiliton Salad",
        description: "Seasonal leaves · local ingredients · house dressing",
      },
    ],
  },
  {
    id: "cretan",
    number: "03",
    label: "Cretan Kitchen",
    title: "From Crete",
    subtitle: "Recipes shaped by the island.",
    items: [
      {
        name: "Boureki",
        description: "Potato · courgette · mizithra · mint",
      },
      {
        name: "Apaki",
        description: "Cretan smoked pork · herbs",
      },
      {
        name: "Lamb with Staka",
        description: "Slow cooked lamb · traditional Cretan staka",
      },
      {
        name: "Stuffed Vegetables",
        description: "Tomato · pepper · rice · fresh herbs",
      },
      {
        name: "Dish of the Day",
        description: "A traditional recipe from the kitchen",
      },
    ],
  },
  {
    id: "grill",
    number: "04",
    label: "Grill",
    title: "From the Fire",
    subtitle: "Grilled simply and served generously.",
    items: [
      {
        name: "Lamb Chops",
        description: "Charcoal grilled · lemon · oregano",
      },
      {
        name: "Pork Souvlaki",
        description: "Pork · peppers · onion · herbs",
      },
      {
        name: "Grilled Chicken",
        description: "Chicken · lemon · thyme",
      },
      {
        name: "Mixed Grill",
        description: "A selection from the grill for sharing",
      },
    ],
  },
  {
    id: "sea",
    number: "05",
    label: "Sea",
    title: "From the Sea",
    subtitle: "Mediterranean flavours from the coast.",
    items: [
      {
        name: "Grilled Octopus",
        description: "Octopus · vinegar · oregano · olive oil",
      },
      {
        name: "Calamari",
        description: "Fresh lemon · sea salt",
      },
      {
        name: "Grilled Fish",
        description: "Catch of the day · lemon · olive oil",
      },
      {
        name: "Sardines",
        description: "Grilled sardines · herbs · lemon",
      },
    ],
  },
  {
    id: "desserts",
    number: "06",
    label: "Sweet",
    title: "Something Sweet",
    subtitle: "A simple finish to the table.",
    items: [
      {
        name: "Greek Yoghurt & Honey",
        description: "Thick yoghurt · Cretan honey · walnuts",
      },
      {
        name: "Loukoumades",
        description: "Honey · cinnamon · walnuts",
      },
      {
        name: "Seasonal Fruit",
        description: "Fresh fruit selected for the table",
      },
      {
        name: "House Dessert",
        description: "Ask us what was made today",
      },
    ],
  },
];

const Menu = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLElement | null)[]>([]);

  /*
   * The page currently presented as active in the UI.
   */
  const [activePage, setActivePage] = useState(0);

  /*
   * Prevent intermediate positions during a smooth programmatic scroll
   * from changing activePage.
   */
  const isProgrammaticScroll = useRef(false);
  const targetPageRef = useRef<number | null>(null);
  const scrollEndTimerRef = useRef<number | null>(null);

  const getClosestPage = () => {
    const carousel = carouselRef.current;

    if (!carousel) return 0;

    const carouselLeft = carousel.getBoundingClientRect().left;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    pageRefs.current.forEach((page, index) => {
      if (!page) return;

      const distance = Math.abs(
        page.getBoundingClientRect().left - carouselLeft,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const finishProgrammaticScroll = () => {
    if (targetPageRef.current !== null) {
      setActivePage(targetPageRef.current);
    } else {
      setActivePage(getClosestPage());
    }

    targetPageRef.current = null;
    isProgrammaticScroll.current = false;
  };

  const goToPage = (index: number) => {
    const carousel = carouselRef.current;
    const page = pageRefs.current[index];

    if (!carousel || !page) return;

    /*
     * Update the controls/category immediately so the interface responds
     * to the user's click, but lock scroll-derived state while travelling
     * through intermediate pages.
     */
    targetPageRef.current = index;
    isProgrammaticScroll.current = true;

    setActivePage(index);

    carousel.scrollTo({
      left: page.offsetLeft - carousel.offsetLeft,
      behavior: "smooth",
    });
  };

  const goPrevious = () => {
    goToPage(Math.max(0, activePage - 1));
  };

  const goNext = () => {
    goToPage(Math.min(menuPages.length - 1, activePage + 1));
  };

  const handleCategoryClick = (
    event: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.preventDefault();
    goToPage(index);
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    let frameId: number | null = null;

    const updateFromManualScroll = () => {
      /*
       * A smooth programmatic scroll can pass several other pages.
       * Ignore those intermediate positions completely.
       */
      if (isProgrammaticScroll.current) {
        frameId = null;
        return;
      }

      const closestIndex = getClosestPage();

      setActivePage((previous) =>
        previous === closestIndex ? previous : closestIndex,
      );

      frameId = null;
    };

    const handleScroll = () => {
      /*
       * scrollend is not something we need to depend on here.
       * The timeout acts as a small "scroll has settled" detector.
       */
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }

      scrollEndTimerRef.current = window.setTimeout(() => {
        if (isProgrammaticScroll.current) {
          finishProgrammaticScroll();
          return;
        }

        const closestIndex = getClosestPage();

        setActivePage((previous) =>
          previous === closestIndex ? previous : closestIndex,
        );
      }, 120);

      if (isProgrammaticScroll.current) return;

      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(updateFromManualScroll);
    };

    carousel.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      carousel.removeEventListener("scroll", handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  return (
    <section id="menu" className={styles.menu} aria-labelledby="menu-title">
      <div className={styles.container}>
        <header className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>The Menu</p>

            <h2 id="menu-title" className={styles.title}>
              From our table.
            </h2>
          </div>

          <p className={styles.introText}>
            Familiar Cretan flavours, local ingredients and food made to be
            shared around the table.
          </p>
        </header>

        <nav className={styles.categories} aria-label="Menu categories">
          {menuPages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              className={[
                styles.category,
                activePage === index ? styles.categoryActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={activePage === index}
              onClick={(event) => handleCategoryClick(event, index)}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <div className={styles.menuStage}>
          <div
            ref={carouselRef}
            className={styles.pages}
            aria-label="Restaurant menu"
          >
            {menuPages.map((page, index) => (
              <article
                key={page.id}
                ref={(element) => {
                  pageRefs.current[index] = element;
                }}
                className={styles.page}
              >
                <div className={styles.pageHeader}>
                  <span className={styles.pageNumber}>{page.number}</span>

                  <div>
                    <p className={styles.pageLabel}>Avrofiliton · Platanias</p>

                    <h3 className={styles.pageTitle}>{page.title}</h3>

                    {page.subtitle && (
                      <p className={styles.pageSubtitle}>{page.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className={styles.dishes}>
                  {page.items.map((item) => (
                    <div key={item.name} className={styles.dish}>
                      <h4 className={styles.dishName}>{item.name}</h4>

                      <p className={styles.dishDescription}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className={styles.pageFooter}>
                  <span>Since 1910</span>
                  <span>{page.number}</span>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Previous menu page"
              disabled={activePage === 0}
              onClick={goPrevious}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5L8 12L15 19" />
              </svg>
            </button>

            <p className={styles.counter}>
              <span>{String(activePage + 1).padStart(2, "0")}</span>

              <span className={styles.counterLine} />

              <span>{String(menuPages.length).padStart(2, "0")}</span>
            </p>

            <button
              type="button"
              className={styles.arrow}
              aria-label="Next menu page"
              disabled={activePage === menuPages.length - 1}
              onClick={goNext}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5L16 12L9 19" />
              </svg>
            </button>
          </div>
        </div>

        <p className={styles.note}>
          Sample menu shown for layout preview. Final dishes will be replaced
          with the restaurant&apos;s current menu.
        </p>
      </div>
    </section>
  );
};

export default Menu;
