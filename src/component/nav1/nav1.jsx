import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./nav1.module.css";

// Dropdowns
import Servicedropdown1 from "./service-dropdown1";
import Clouddropdown1 from "./cloud-dropdown";
import Datadropdown1 from "./data-ai";
import Industriesdropdown1 from "./Industries-dropdown";
import Successstoriesdropdown1 from "./success-stories";
import Technologiesdropdown1 from "./technologies-dropdown";
import ChatWidget from "../../ChatWidget/ChatWidget";
import CloudSecurityDropdown from "./cloud-security"
function Nav1() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isMobileOrTablet = windowWidth < 1200;
  const isMobile = windowWidth < 768;

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const navbar = document.querySelector(`.${styles.navbar}`);
    if (location.pathname === "/") {
      navbar?.classList.add(styles.transparent);
      const handleScroll = () => {
        if (window.scrollY > 100) {
          navbar?.classList.add(styles.scrolled);
        } else {
          navbar?.classList.remove(styles.scrolled);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        navbar?.classList.remove(styles.scrolled);
        navbar?.classList.remove(styles.transparent);
      };
    } else {
      navbar?.classList.remove(styles.transparent);
      navbar?.classList.remove(styles.scrolled);
    }
  }, [location.pathname]);

  return (
    <>
      <nav className={`${styles.navbar} ${styles.fixedTop}`}>
        <div className={styles.container}>
          <div className={styles.navInner}>
            <Link to="/" className={styles.logo}>
              <img src="/images/logo-11.png" alt="Logo" />
            </Link>

            {isMobileOrTablet && (
              <button
                className={styles.menuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className={styles.menuIcon}></span>
              </button>
            )}
          </div>

          {/* Desktop Menu */}
          {!isMobileOrTablet && (
            <div className={styles.menu}>
              <ul className={styles.navItems}>
                <Servicedropdown1
                  isMobile={isMobile}
                  isOpen={activeDropdown === "services"}
                  onMouseEnter={() => setActiveDropdown("services")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onLinkClick={handleNavItemClick}
                />

                <CloudSecurityDropdown
                  isMobile={isMobile}
                  isOpen={activeDropdown === "cloud"}
                  onMouseEnter={() => setActiveDropdown("cloud")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onLinkClick={handleNavItemClick}
                />

                <Datadropdown1
                  isMobile={isMobile}
                  isOpen={activeDropdown === "data"}
                  onMouseEnter={() => setActiveDropdown("data")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onLinkClick={handleNavItemClick}
                />
                  <Technologiesdropdown1
                  isMobile={isMobile}
                  isOpen={activeDropdown === "technologies"}
                  onMouseEnter={() => setActiveDropdown("technologies")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onLinkClick={handleNavItemClick}
                />


                {/*   <Industriesdropdown1
                  isMobile={isMobile}
                  isOpen={activeDropdown === "industries"}
                  onMouseEnter={() => setActiveDropdown("industries")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onLinkClick={handleNavItemClick}
                /> */}

                <li className={styles.navItem}>
                  <Link
                    to="/hire-developers"
                    className={styles.navLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Hire Developer
                    {/* On-Demand Developer */}
                  </Link>
                </li>

                 {/* <li className={styles.navItem}>
                  <Link
                    to="/pricing"
                    className={styles.navLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                   
                  </Link>
                </li> */}
                <li className={styles.navItem}>
                  <Link
                    to="/career"
                    className={styles.navLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Careers
                  </Link>
                </li>
              
                <Successstoriesdropdown1
                  isMobile={isMobile}
                  isOpen={activeDropdown === "success"}
                  onMouseEnter={() => setActiveDropdown("success")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onLinkClick={handleNavItemClick}
                />

                {/* <li className={styles.navItem}>
                  <Link
                    to="/about-us"
                    className={styles.navLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li> */}

               
              </ul>
            </div>
          )}
        </div>

        {/* Offcanvas Overlay */}
        {isMobileOrTablet && isMobileMenuOpen && (
          <div
            className={styles.offcanvasOverlay}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Offcanvas Menu */}
        {isMobileOrTablet && (
          <div
            className={`${styles.offcanvasMenu} ${
              isMobileMenuOpen ? styles.show : ""
            }`}
          >
            <div className={styles.offcanvasHeader}>
              <Link to="/" className={styles.logo} onClick={handleNavItemClick}>
                <img src="/images/logo-11.png" alt="Logo" />
              </Link>
              <button
                className={styles.offcanvasClose}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                &times;
              </button>
            </div>

            <ul className={styles.navItems}>
              <Servicedropdown1
                isMobile
                isOpen={activeDropdown === "services"}
                onToggle={() => handleDropdownToggle("services")}
                onLinkClick={handleNavItemClick}
              />
              <CloudSecurityDropdown
                isMobile
                isOpen={activeDropdown === "cloud"}
                onToggle={() => handleDropdownToggle("cloud")}
                onLinkClick={handleNavItemClick}
              />
              <Datadropdown1
                isMobile
                isOpen={activeDropdown === "data"}
                onToggle={() => handleDropdownToggle("data")}
                onLinkClick={handleNavItemClick}
              />
              
              <Technologiesdropdown1
                isMobile
                isOpen={activeDropdown === "technologies"}
                onToggle={() => handleDropdownToggle("technologies")}
                onLinkClick={handleNavItemClick}
              />
              <Industriesdropdown1
                isMobile
                isOpen={activeDropdown === "industries"}
                onToggle={() => handleDropdownToggle("industries")}
                onLinkClick={handleNavItemClick}
              />

              <li className={styles.navItem}>
                <Link
                  to="/hire-developers"
                  className={styles.navLink}
                  onClick={handleNavItemClick}
                >
                  Hire Developer
                </Link>
              </li>

               <li className={styles.navItem}>
                <Link
                  to="/pricing"
                  className={styles.navLink}
                  onClick={handleNavItemClick}
                >
                  Pricing
                </Link>
              </li>

              <Successstoriesdropdown1
                isMobile
                isOpen={activeDropdown === "success"}
                onToggle={() => handleDropdownToggle("success")}
                onLinkClick={handleNavItemClick}
              />

              <li className={styles.navItem}>
                  <Link
                    to="/career"
                    className={styles.navLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                     Careers
                  </Link>
              </li>

            </ul>
          </div>
        )}
      </nav>

      {/* Floating Call Button */}
      {/* <div className={styles.floatingBtn}>
        <a href="tel:+919715092104" target="_blank" rel="noreferrer">
          <div className={styles.contactIcon}>
            <i className="bi bi-telephone-fill"></i>
          </div>
        </a>
      </div> */}
      {/* Floating Chat Widget */}
      {/* <div className={styles.chatWidget}>
        <input type="checkbox" id="chatToggle" className={styles.chatToggle} />

        <label htmlFor="chatToggle" className={styles.chatButton}>
          💬
        </label>

        <div className={styles.chatWindow}>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/F9eSm597vq2f5HekqPWNX"
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "12px" }}
          ></iframe>
        </div>
      </div> */}

      <ChatWidget/>
    </>
  );
}

export default Nav1;
