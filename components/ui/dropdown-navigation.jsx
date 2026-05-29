"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import styles from "./dropdown-navigation.module.css";

function cleanPath(path) {
  if (!path) return "";
  let clean = path.split("#")[0].split("?")[0];
  return clean.endsWith("/") && clean !== "/" ? clean.slice(0, -1) : clean;
}

function hrefMatchesPath(currentPath, href, currentService) {
  if (!href) return false;
  const normalizedHref = cleanPath(href);
  const normalizedCurrent = cleanPath(currentPath);

  if (normalizedHref !== normalizedCurrent) {
    const hrefDepth = normalizedHref.split("/").filter(Boolean).length;
    if (!(hrefDepth > 1 && normalizedCurrent.startsWith(`${normalizedHref}/`))) {
      return false;
    }
  }

  // If the link is a sub-service link (contains ?service=), check if it matches currentService
  if (href.includes("?service=")) {
    const urlObj = new URL(href, "https://stnp.co");
    const hrefService = urlObj.searchParams.get("service");
    return hrefService === currentService;
  }

  return true;
}

function itemMatchesPath(item, currentPath, currentService) {
  if (hrefMatchesPath(currentPath, item.href, currentService)) return true;
  return (item.subMenus || []).some((group) =>
    group.items.some((subItem) => hrefMatchesPath(currentPath, subItem.href, currentService))
  );
}

export function DropdownNavigation({
  navItems = [],
  currentPath,
  getTransitionType,
  className = "",
}) {
  const [openMenu, setOpenMenu] = React.useState(null);
  const [hoveredId, setHoveredId] = React.useState(null);
  const searchParams = useSearchParams();
  const currentService = searchParams ? searchParams.get("service") : null;

  const activeItemId = React.useMemo(() => {
    let matchedId = null;
    for (const item of navItems) {
      if (itemMatchesPath(item, currentPath, currentService)) {
        matchedId = item.id;
        break;
      }
    }
    // Fallback to Home (id: 1) if no route matches (e.g., 404 page)
    // This ensures the navbar font color exactly matches the root hero section
    return matchedId || 1;
  }, [navItems, currentPath, currentService]);

  const handleLinkClick = (e, href) => {
    if (!href) return;
    const normalizedHref = href.endsWith("/") && href !== "/" ? href.slice(0, -1) : href;
    const normalizedCurrent = currentPath.endsWith("/") && currentPath !== "/" ? currentPath.slice(0, -1) : currentPath;

    if (normalizedHref === normalizedCurrent) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`${styles.navigation} ${className}`.trim()}
      aria-label="Primary navigation"
    >
      <ul className={styles.navList}>
        {navItems.map((navItem) => {
          const isOpen = openMenu === navItem.label;
          const isHovered = hoveredId === navItem.id;
          const isActive = navItem.id === activeItemId;
          const hasSubMenus = Boolean(navItem.subMenus?.length);

          return (
            <li
              key={navItem.label}
              className={styles.navItem}
              onMouseEnter={() => hasSubMenus && setOpenMenu(navItem.label)}
              onMouseLeave={() => hasSubMenus && setOpenMenu(null)}
              onFocus={() => hasSubMenus && setOpenMenu(navItem.label)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setOpenMenu(null);
                }
              }}
            >
              {hasSubMenus ? (
                <button
                  type="button"
                  className={`${styles.navTrigger} ${isActive ? styles.navTriggerActive : ""}`}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onMouseEnter={() => setHoveredId(navItem.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <span>{navItem.label}</span>
                  <ChevronDown
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    aria-hidden="true"
                  />
                  {(isHovered || isOpen || isActive) && (
                    <motion.div
                      layoutId="stnp-dropdown-pill"
                      className={styles.hoverBackground}
                    />
                  )}
                </button>
              ) : (
                <Link
                  href={navItem.href}
                  className={`${styles.navLink} ${isActive ? styles.navTriggerActive : ""}`}
                  transitionTypes={
                    getTransitionType ? getTransitionType(currentPath, navItem.href) : undefined
                  }
                  onMouseEnter={() => setHoveredId(navItem.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={(e) => handleLinkClick(e, navItem.href)}
                >
                  <span>{navItem.label}</span>
                  {(isHovered || isActive) && (
                    <motion.div
                      layoutId="stnp-dropdown-pill"
                      className={styles.hoverBackground}
                    />
                  )}
                </Link>
              )}

              <AnimatePresence>
                {isOpen && hasSubMenus ? (
                  <motion.div
                    className={`${styles.dropdownWrap} ${navItem.aside ? styles.dropdownWrapMega : ""}`}
                    initial={{ opacity: 0, x: "-50%", y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: "-50%", y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformOrigin: "top center" }}
                  >
                    <motion.div
                      className={`${styles.dropdownPanel} ${navItem.aside ? styles.dropdownPanelMega : ""}`}
                      layoutId="stnp-dropdown-panel"
                    >
                      <div className={navItem.aside ? styles.megaMenuSplit : styles.dropdownInner}>
                        {navItem.aside && (
                          <div className={styles.dropdownAside}>
                            <h2 className={styles.dropdownAsideTitle}>{navItem.aside.title}</h2>
                            <p className={styles.dropdownAsideDesc}>{navItem.aside.description}</p>
                            {navItem.aside.cta && (
                              <Link 
                                href={navItem.aside.cta.href}
                                className={styles.dropdownAsideCta}
                                onClick={(e) => handleLinkClick(e, navItem.aside.cta.href)}
                              >
                                <span>{navItem.aside.cta.label}</span>
                                <ChevronDown className={styles.ctaArrow} aria-hidden="true" />
                              </Link>
                            )}
                          </div>
                        )}

                        <div className={navItem.aside ? styles.rightPane : ""}>
                          <div className={styles.dropdownInner}>
                            {navItem.subMenus.map((subMenu) => (
                              <div className={styles.groupColumn} key={subMenu.title}>
                                <h3 className={styles.groupTitle}>
                                  {(() => {
                                    const title = subMenu.title;
                                    if (title.includes(" & ")) {
                                      const parts = title.split(" & ");
                                      return <>{parts[0]} &<br />{parts[1]}</>;
                                    }
                                    const words = title.split(" ");
                                    if (words.length > 1) {
                                      return <>{words[0]}<br />{words.slice(1).join(" ")}</>;
                                    }
                                    return title;
                                  })()}
                                </h3>
                                <ul className={styles.groupList}>
                                  {subMenu.items.map((item) => {
                                    const isSubItemActive = hrefMatchesPath(currentPath, item.href, currentService);

                                    return (
                                      <li key={`${subMenu.title}-${item.label}`}>
                                        <Link
                                          href={item.href}
                                          className={`${styles.subMenuLink} ${
                                            navItem.aside ? styles.subMenuLinkCompact : ""
                                          } ${isSubItemActive ? styles.subMenuLinkActive : ""}`}
                                          transitionTypes={
                                            getTransitionType
                                              ? getTransitionType(currentPath, item.href)
                                              : undefined
                                          }
                                          onClick={(e) => handleLinkClick(e, item.href)}
                                        >
                                          <div className={styles.copyWrap}>
                                            <p className={styles.subMenuLabel}>{item.label}</p>
                                          </div>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {navItem.footer && (
                            <div className={styles.dropdownFooter}>
                              <Link 
                                href={navItem.footer.href}
                                className={styles.footerLink}
                                onClick={(e) => handleLinkClick(e, navItem.footer.href)}
                              >
                                <span>{navItem.footer.label}</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default DropdownNavigation;
