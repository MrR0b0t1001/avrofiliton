import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

type NavItem = {
  href: string;
  label: string;
  isCta?: boolean;
};

const navItems: NavItem[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Our Story" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit & Reserve", isCta: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);

  /*
   * Header state + active section tracking.
   *
   * requestAnimationFrame prevents the scroll handler from causing
   * unnecessary work during rapid scrolling.
   */
  useEffect(() => {
    let frameId: number | null = null;

    const updateNavigationState = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight ?? 80;

      setScrolled(scrollPosition > 24);

      let currentSection = "home";

      for (const item of navItems) {
        const sectionId = item.href.slice(1);
        const section = document.getElementById(sectionId);

        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + scrollPosition;

        if (scrollPosition + headerHeight + 80 >= sectionTop) {
          currentSection = sectionId;
        }
      }

      setActiveId((previous) =>
        previous === currentSection ? previous : currentSection,
      );

      frameId = null;
    };

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(updateNavigationState);
    };

    updateNavigationState();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /*
   * Mobile navigation behavior.
   *
   * - Prevent background scrolling.
   * - Move focus into the drawer when opened.
   * - Allow Escape to close it.
   */
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    mobileCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setMobileOpen(false);
      mobileToggleRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const closeMobileNavigation = () => {
    setMobileOpen(false);
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    const sectionId = href.slice(1);
    const section = document.getElementById(sectionId);

    if (!section) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 80;

    const targetPosition =
      section.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", href);

    setActiveId(sectionId);
    setMobileOpen(false);
  };

  const getLinkClassName = (href: string, isCta = false) => {
    const sectionId = href.slice(1);

    return [
      styles.navLink,
      activeId === sectionId ? styles.activeLink : "",
      isCta ? styles.navCta : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <header
      ref={headerRef}
      className={[
        styles.header,
        scrolled || mobileOpen ? styles.headerScrolled : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.headerInner}>
        <a
          href="#home"
          className={styles.brand}
          aria-label="Avrofiliton Restaurant home"
          onClick={(event) => handleNavClick(event, "#home")}
        >
          <span className={styles.brandName}>Avrofiliton</span>
          <span className={styles.brandSince}>Since 1910</span>
        </a>

        <nav className={styles.navigation} aria-label="Main navigation">
          <div className={styles.desktopLinks}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={getLinkClassName(item.href, item.isCta)}
                aria-current={
                  activeId === item.href.slice(1) ? "page" : undefined
                }
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            ref={mobileToggleRef}
            type="button"
            className={styles.mobileToggle}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </nav>
      </div>

      <button
        type="button"
        className={[styles.overlay, mobileOpen ? styles.overlayOpen : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label="Close navigation menu"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={closeMobileNavigation}
      />

      <aside
        id="mobile-navigation"
        className={[
          styles.mobileDrawer,
          mobileOpen ? styles.mobileDrawerOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileTop}>
          <div className={styles.mobileBrand}>
            <span className={styles.mobileBrandName}>Avrofiliton</span>
            <span className={styles.mobileBrandSince}>Since 1910</span>
          </div>

          <button
            ref={mobileCloseRef}
            type="button"
            className={styles.mobileClose}
            aria-label="Close navigation menu"
            tabIndex={mobileOpen ? 0 : -1}
            onClick={closeMobileNavigation}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileLinks} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={getLinkClassName(item.href, item.isCta)}
              aria-current={
                activeId === item.href.slice(1) ? "page" : undefined
              }
              tabIndex={mobileOpen ? 0 : -1}
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.mobileFooter}>
          <span>Platanias, Chania</span>
          <span>Crete · Greece</span>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
