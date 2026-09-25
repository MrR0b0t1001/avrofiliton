import styles from "./Menu.module.css";

type MenuItem = {
  name: string;
  description: string;
  price?: string;
};

type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
};

const menuCategories: MenuCategory[] = [
  {
    id: "starters",
    title: "Starters",
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
    title: "Salads",
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
    title: "Cretan Kitchen",
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
    title: "From the Grill",
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
    title: "Fish & Seafood",
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
    title: "Desserts",
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
  return (
    <section id="menu" className={styles.menu} aria-labelledby="menu-title">
      <div className={styles.paper}>
        <header className={styles.header}>
          <p className={styles.location}>Platanias · Chania · Crete</p>

          <p className={styles.restaurant}>Avrofiliton</p>

          <p className={styles.since}>Since 1910</p>

          <div className={styles.ornament} aria-hidden="true">
            <span />
          </div>

          <h2 id="menu-title" className={styles.title}>
            Our Menu
          </h2>

          <p className={styles.intro}>
            Familiar Cretan flavours, local ingredients and food made to be
            shared around the table.
          </p>
        </header>

        <nav className={styles.index} aria-label="Menu categories">
          {menuCategories.map((category) => (
            <a
              key={category.id}
              href={`#menu-${category.id}`}
              className={styles.indexLink}
            >
              {category.title}
            </a>
          ))}
        </nav>

        <div className={styles.categories}>
          {menuCategories.map((category) => (
            <section
              key={category.id}
              id={`menu-${category.id}`}
              className={styles.category}
              aria-labelledby={`menu-${category.id}-title`}
            >
              <header className={styles.categoryHeader}>
                <h3
                  id={`menu-${category.id}-title`}
                  className={styles.categoryTitle}
                >
                  {category.title}
                </h3>

                <p className={styles.categorySubtitle}>{category.subtitle}</p>
              </header>

              <ul className={styles.dishes}>
                {category.items.map((item) => (
                  <li key={item.name} className={styles.dish}>
                    <div className={styles.dishHeading}>
                      <h4 className={styles.dishName}>{item.name}</h4>

                      {item.price && (
                        <>
                          <span
                            className={styles.dishLeader}
                            aria-hidden="true"
                          />

                          <span className={styles.dishPrice}>{item.price}</span>
                        </>
                      )}
                    </div>

                    <p className={styles.dishDescription}>{item.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className={styles.footer}>
          <p>Avrofiliton · Platanias, Chania</p>
        </footer>
      </div>
    </section>
  );
};

export default Menu;
