import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Sparkles, Waves } from "lucide-react";
import { navbarStyles as styles } from "../assets/dummyStyles.js";

const Navbar = ({ user, onLogout, themeMode = "ocean", onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <span className={styles.logoText}>ExpenseTracker</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-cyan-800/40 bg-cyan-900/20 text-cyan-100 hover:bg-cyan-800/35 transition-all"
            title="Toggle neon mode"
          >
            {themeMode === "neon" ? <Sparkles className="w-4 h-4" /> : <Waves className="w-4 h-4" />}
            <span className="text-xs font-medium">{themeMode === "neon" ? "Neon" : "Ocean"}</span>
          </button>
          <div className={styles.userContainer} ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={styles.userButton}
          >
            <div className="relative">
              <div className={styles.userAvatar}>{initials}</div>
              <span className={styles.statusIndicator}></span>
            </div>
            <div className={styles.userTextContainer}>
              <p className={styles.userName}>{user?.name || "User"}</p>
              <p className={styles.userEmail}>{user?.email || ""}</p>
            </div>
            <ChevronDown className={styles.chevronIcon(menuOpen)} />
          </button>

          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                <div className="flex items-center gap-3">
                  <div className={styles.dropdownAvatar}>{initials}</div>
                  <div>
                    <p className={styles.dropdownName}>{user?.name}</p>
                    <p className={styles.dropdownEmail}>{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className={styles.menuItemContainer}>
                <button
                  onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                  className={styles.menuItem}
                >
                  <User className="w-4 h-4" /> Profile
                </button>
              </div>

              <div className={styles.menuItemBorder}>
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  className={styles.logoutButton}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
