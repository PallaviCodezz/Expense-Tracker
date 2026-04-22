import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, DollarSign, Sparkles, Waves } from "lucide-react";
import { loginStyles as styles } from "../assets/dummyStyles.js";

const Login = ({ onLogin, onSwitchToSignup, themeMode = "ocean", onToggleTheme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      setIsLoading(true);
      await onLogin(email, password, rememberMe);
    } catch (err) {
      const serverMsg =
        err.response?.data?.message ||
        err.message ||
        "Login failed";
      setError(serverMsg);
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
          <div className={styles.avatar}>
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h1 className={styles.headerTitle}>Welcome Back</h1>
          <p className={styles.headerSubtitle}>Sign in to your account</p>
        </div>

        <div className={styles.formContainer}>
          {error && (
            <div className={styles.errorContainer}>
              <div className={styles.errorIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className={styles.errorText}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={styles.label}>Email</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}><Mail className="w-5 h-5" /></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>Password</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}><Lock className="w-5 h-5" /></div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.passwordInput}
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
                  Signing in...
                </>
              ) : "Sign In"}
            </button>
          </form>

          <div className={styles.signUpContainer}>
            <span className={styles.signUpText}>Don't have an account? </span>
            <button onClick={onSwitchToSignup} className={styles.signUpLink}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
