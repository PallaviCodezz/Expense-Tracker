import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, DollarSign, ArrowLeft, Sparkles, Waves } from "lucide-react";
import { signupStyles as styles } from "../assets/dummyStyles.js";

const Signup = ({ onSignup, onSwitchToLogin, themeMode = "ocean", onToggleTheme }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setIsLoading(true);
      await onSignup(name, email, password, rememberMe);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ api: err.response?.data?.message || err.message || "Signup failed" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <button
        type="button"
        onClick={onToggleTheme}
        className="fixed top-4 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl border border-cyan-700/40 bg-[#0f1c33]/85 text-cyan-100 hover:bg-cyan-900/40 transition-all"
      >
        {themeMode === "neon" ? <Sparkles className="w-4 h-4" /> : <Waves className="w-4 h-4" />}
        <span className="text-xs font-medium">{themeMode === "neon" ? "Neon" : "Ocean"}</span>
      </button>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <button onClick={onSwitchToLogin} className={styles.backButton}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className={styles.avatar}>
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h1 className={styles.headerTitle}>Create Account</h1>
          <p className={styles.headerSubtitle}>Start tracking your finances</p>
        </div>

        <div className={styles.formContainer}>
          {errors.api && <p className={styles.apiError}>{errors.api}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={styles.label}>Name</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}><User className="w-5 h-5" /></div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${styles.input} ${errors.name ? "border-red-400" : "border-cyan-900/50"}`}
                  placeholder="Your name"
                  disabled={isLoading}
                />
              </div>
              {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
            </div>

            <div>
              <label className={styles.label}>Email</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}><Mail className="w-5 h-5" /></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles.input} ${errors.email ? "border-red-400" : "border-cyan-900/50"}`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
            </div>

            <div>
              <label className={styles.label}>Password</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}><Lock className="w-5 h-5" /></div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.passwordInput} ${errors.password ? "border-red-400" : "border-cyan-900/50"}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="remember" className={styles.checkboxLabel}>Remember me</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${styles.button} ${isLoading ? styles.buttonDisabled : ""}`}
            >
              {isLoading ? (
                <>
                  <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : "Create Account"}
            </button>
          </form>

          <div className={styles.signInContainer}>
            <span className={styles.signInText}>Already have an account? </span>
            <button onClick={onSwitchToLogin} className={styles.signInLink}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
