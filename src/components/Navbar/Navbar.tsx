import { useEffect, useRef, useState, type MouseEvent } from "react";
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
  { href: "#food-stories", label: "Food Stories" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#visit", label: "Visit & Reserve", isCta: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /*
   * Track the section currently reached.
   * Actual page positions determine the active link,
   * regardless of the order of navItems.
   */
  useEffect(() => {
    let frameId: number | null = null;

    const updateNavigation = () => {
      frameId = null;

      const headerHeight = headerRef.current?.offsetHeight ?? 84;
      const threshold = headerHeight + 80;

      const sections = navItems
        .map((item) => {
          const id = item.href.slice(1);
          const element = document.getElementById(id);

          return element
            ? { id, top: element.getBoundingClientRect().top }
            : null;
        })
        .filter(
          (section): section is { id: string; top: number } => section !== null,
        )
        .sort((a, b) => a.top - b.top);

      let currentId = sections[0]?.id ?? "home";

      for (const section of sections) {
        if (section.top <= threshold) {
          currentId = section.id;
        }
      }

      const atBottom =
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4;

      if (atBottom && sections.length > 0) {
        currentId = sections[sections.length - 1].id;
      }

      setScrolled(window.scrollY > 24);
      setActiveId(currentId);
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateNavigation);
      }
    };

    updateNavigation();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /*
   * A native modal dialog handles focus containment and Escape.
   * Restore the body's previous scrolling style on close.
   */
  useEffect(() => {
    if (!mobileOpen) return;

    const dialog = dialogRef.current;

    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;

      if (dialog.open) {
        dialog.close();
      }
    };
  }, [mobileOpen]);

  /*
   * Close the mobile menu when returning to the desktop layout.
   * Keep this breakpoint aligned with the CSS.
   */
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1201px)");

    const handleBreakpointChange = () => {
      if (desktopQuery.matches) {
        dialogRef.current?.close();
        setMobileOpen(false);
      }
    };

    desktopQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      desktopQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  const closeMobileNavigation = () => {
    dialogRef.current?.close();
    setMobileOpen(false);
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Preserve standard browser behaviour for modified clicks.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const sectionId = href.slice(1);
    const section = document.getElementById(sectionId);

    if (!section) return;

    event.preventDefault();
    closeMobileNavigation();

    window.requestAnimationFrame(() => {
      const headerHeight = headerRef.current?.offsetHeight ?? 84;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const targetPosition =
        sectionId === "home"
          ? 0
          : section.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            16;

      // Move keyboard focus to the destination without a second scroll.
      const focusTarget =
        section.querySelector<HTMLElement>("h1, h2") ?? section;

      if (!focusTarget.hasAttribute("tabindex")) {
        focusTarget.setAttribute("tabindex", "-1");
        focusTarget.addEventListener(
          "blur",
          () => focusTarget.removeAttribute("tabindex"),
          { once: true },
        );
      }

      focusTarget.focus({ preventScroll: true });

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: reduceMotion ? "instant" : "smooth",
      });

      window.history.replaceState(window.history.state, "", href);

      setActiveId(sectionId);
    });
  };

  const getLinkClassName = (item: NavItem) =>
    [
      styles.navLink,
      activeId === item.href.slice(1) ? styles.activeLink : "",
      item.isCta ? styles.navCta : "",
    ]
      .filter(Boolean)
      .join(" ");

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      closeMobileNavigation();
    }
  };

  return (
    <header
      ref={headerRef}
      className={[styles.header, scrolled ? styles.headerScrolled : ""]
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

        <nav className={styles.desktopNavigation} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={getLinkClassName(item)}
              aria-current={
                activeId === item.href.slice(1) ? "location" : undefined
              }
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.mobileToggle}
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-haspopup="dialog"
          onClick={() => setMobileOpen(true)}
        >
          <span>Explore</span>

          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className={styles.mobileDrawer}
        aria-labelledby="mobile-navigation-title"
        onClose={() => setMobileOpen(false)}
        onClick={handleBackdropClick}
      >
        <div className={styles.mobileTop}>
          <div className={styles.mobileBrand}>
            <span className={styles.brandName}>Avrofiliton</span>
            <span className={styles.brandSince}>Since 1910</span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.mobileClose}
            onClick={closeMobileNavigation}
          >
            Close
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <h2 id="mobile-navigation-title" className={styles.mobileHeading}>
          Welcome to Avrofiliton
        </h2>

        <nav className={styles.mobileLinks} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={getLinkClassName(item)}
              aria-current={
                activeId === item.href.slice(1) ? "location" : undefined
              }
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className={styles.mobileFooter}>Platanias · Chania · Crete</p>
      </dialog>
    </header>
  );
};

export default Navbar;
