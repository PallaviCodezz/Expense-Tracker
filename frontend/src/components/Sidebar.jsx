import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ArrowUp, ArrowDown, User, LogOut, Menu, X } from "lucide-react";
import { sidebarStyles as styles, cn } from "../assets/dummyStyles.js";

const MENU_ITEMS = [
  { text: "Dashboard", path: "/", icon: <Home size={20} /> },
  { text: "Income", path: "/income", icon: <ArrowUp size={20} /> },
  { text: "Expenses", path: "/expense", icon: <ArrowDown size={20} /> },
  { text: "Profile", path: "/profile", icon: <User size={20} /> },
];

const Sidebar = ({ isCollapsed, setIsCollapsed, user, onLogout }) => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          styles.sidebarContainer.base,
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className={cn(styles.sidebarInner.base, "w-full")}>
          {/* Toggle button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={styles.toggleButton.base}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points={isCollapsed ? "9 18 15 12 9 6" : "15 18 9 12 15 6"}></polyline>
            </svg>
          </button>

          {/* User profile */}
          <div className={cn(styles.userProfileContainer.base, isCollapsed ? styles.userProfileContainer.collapsed : styles.userProfileContainer.expanded)}>
            <div className={styles.userInitials.base}>{initials}</div>
            {!isCollapsed && (
              <div className="mt-2">
                <p className="font-semibold text-cyan-100 truncate">{user?.name}</p>
                <p className="text-xs text-cyan-100/60 truncate">{user?.email}</p>
              </div>
            )}
          </div>

          {/* Menu */}
          <nav className="flex-1 py-4">
            <ul className={styles.menuList.base}>
              {MENU_ITEMS.map(({ text, path, icon }) => {
                const isActive = pathname === path;
                return (
                  <li key={text}>
                    <Link
                      to={path}
                      className={cn(
                        styles.menuItem.base,
                        isActive ? styles.menuItem.active : styles.menuItem.inactive,
                        isCollapsed ? styles.menuItem.collapsed : styles.menuItem.expanded
                      )}
                      onMouseEnter={() => setActiveHover(text)}
                      onMouseLeave={() => setActiveHover(null)}
                      title={isCollapsed ? text : undefined}
                    >
                      <span className={isActive ? styles.menuIcon.active : styles.menuIcon.inactive}>
                        {icon}
                      </span>
                      {!isCollapsed && <span>{text}</span>}
                      {activeHover === text && !isActive && !isCollapsed && (
                        <span className={styles.activeIndicator}></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className={cn(styles.footerContainer.base, isCollapsed ? styles.footerContainer.collapsed : styles.footerContainer.expanded)}>
            <button
              onClick={onLogout}
              className={cn(styles.logoutButton.base, isCollapsed ? styles.logoutButton.collapsed : "")}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className={styles.mobileMenuButton}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileBackdrop} onClick={() => setMobileOpen(false)} />
          <div ref={sidebarRef} className={styles.mobileSidebar.base}>
            <div className={styles.mobileHeader}>
              <div className={styles.mobileUserContainer}>
                <div className={styles.userInitials.base}>{initials}</div>
                <div>
                  <p className="font-semibold text-cyan-100">{user?.name}</p>
                  <p className="text-xs text-cyan-100/60">{user?.email}</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className={styles.mobileCloseButton}>
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 py-4 px-4">
              <ul className={styles.mobileMenuList}>
                {MENU_ITEMS.map(({ text, path, icon }) => (
                  <li key={text}>
                    <Link
                      to={path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        styles.mobileMenuItem.base,
                        pathname === path ? styles.mobileMenuItem.active : styles.mobileMenuItem.inactive
                      )}
                    >
                      <span className={pathname === path ? styles.menuIcon.active : styles.menuIcon.inactive}>
                        {icon}
                      </span>
                      <span>{text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.mobileFooter}>
              <button onClick={onLogout} className={styles.mobileLogoutButton}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
