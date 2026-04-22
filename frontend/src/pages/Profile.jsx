import React, { useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, X, LogOut } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profileStyles } from "../assets/dummyStyles.js";

const API_BASE = "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const PasswordInput = memo(({ name, label, value, error, showField, onToggle, onChange, disabled }) => (
  <div>
    <label className={profileStyles.passwordLabel}>{label}</label>
    <div className={profileStyles.passwordContainer}>
      <input
        type={showField ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className={`${profileStyles.inputWithError} ${error ? "border-red-300" : "border-gray-200"}`}
        placeholder={`Enter ${label.toLowerCase()}`}
        disabled={disabled}
      />
      <button type="button" onClick={onToggle} className={profileStyles.passwordToggle} disabled={disabled}>
        {showField ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {error && <p className={profileStyles.errorText}>{error}</p>}
  </div>
));
PasswordInput.displayName = "PasswordInput";

const ProfilePage = ({ user: propUser, onUpdateProfile, onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(propUser || {});
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ name: propUser?.name || "", email: propUser?.email || "" });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const togglePasswordVisibility = useCallback((field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const validatePassword = useCallback(() => {
    const errors = {};
    if (!passwordData.current) errors.current = "Current password is required";
    if (!passwordData.new) errors.new = "New password is required";
    else if (passwordData.new.length < 8) errors.new = "Password must be at least 8 characters";
    if (passwordData.new !== passwordData.confirm) errors.confirm = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  }, [passwordData]);

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_BASE}/auth/profile`, tempUser, { headers: getAuthHeaders() });
      const updated = res.data.user;
      setUser(updated);
      if (onUpdateProfile) onUpdateProfile(updated);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    try {
      setLoading(true);
      await axios.put(`${API_BASE}/auth/change-password`, { current: passwordData.current, new: passwordData.new }, { headers: getAuthHeaders() });
      toast.success("Password updated successfully");
      setShowPasswordModal(false);
      setPasswordData({ current: "", new: "", confirm: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className={profileStyles.container}>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className={profileStyles.mainContainer}>
        {/* Header */}
        <div className={profileStyles.header}>
          <div className={profileStyles.avatar}>
            <span className="text-3xl font-bold text-white">{initials}</span>
          </div>
          <h2 className={profileStyles.userName}>{user?.name}</h2>
          <p className={profileStyles.userEmail}>{user?.email}</p>
        </div>

        {/* Content */}
        <div className={profileStyles.content}>
          <div className={profileStyles.grid}>
            {/* Personal Info */}
            <div className={profileStyles.card}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={profileStyles.cardTitle}>
                  <User className={profileStyles.icon} /> Personal Info
                </h3>
                {!editMode ? (
                  <button onClick={() => setEditMode(true)} className={profileStyles.editButton}>Edit</button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSaveProfile} disabled={loading} className={profileStyles.buttonPrimary} style={{ padding: "6px 12px", fontSize: "14px" }}>
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => setEditMode(false)} className={profileStyles.buttonSecondary} style={{ padding: "6px 12px", fontSize: "14px" }}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className={profileStyles.label}>Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={tempUser.name}
                      onChange={handleInputChange}
                      className={profileStyles.input}
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user?.name}</p>
                  )}
                </div>
                <div>
                  <label className={profileStyles.label}>Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={tempUser.email}
                      onChange={handleInputChange}
                      className={profileStyles.input}
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user?.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className={profileStyles.card}>
              <h3 className={profileStyles.cardTitle}>
                <Lock className={profileStyles.icon} /> Security
              </h3>
              <div className="space-y-3">
                <div className={profileStyles.securityItem}>
                  <div>
                    <p className="font-medium text-gray-800">Password</p>
                    <p className={profileStyles.securityText}>Last changed recently</p>
                  </div>
                  <button onClick={() => setShowPasswordModal(true)} className={profileStyles.changeButton}>
                    Change
                  </button>
                </div>
                <div className={profileStyles.securityItem}>
                  <div>
                    <p className="font-medium text-gray-800">Account</p>
                    <p className={profileStyles.securityText}>Member since {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="mt-6 flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={profileStyles.modalContent}>
            <div className={profileStyles.modalHeader}>
              <h3 className={profileStyles.modalTitle}>Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-gray-500 hover:text-gray-800" disabled={loading}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <PasswordInput name="current" label="Current Password" value={passwordData.current} error={passwordErrors.current} showField={showPassword.current} onToggle={() => togglePasswordVisibility("current")} onChange={handlePasswordChange} disabled={loading} />
              <PasswordInput name="new" label="New Password" value={passwordData.new} error={passwordErrors.new} showField={showPassword.new} onToggle={() => togglePasswordVisibility("new")} onChange={handlePasswordChange} disabled={loading} />
              <PasswordInput name="confirm" label="Confirm New Password" value={passwordData.confirm} error={passwordErrors.confirm} showField={showPassword.confirm} onToggle={() => togglePasswordVisibility("confirm")} onChange={handlePasswordChange} disabled={loading} />
              <div className="flex gap-3 pt-4">
                <button type="submit" className={profileStyles.buttonPrimary} disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </button>
                <button type="button" onClick={() => setShowPasswordModal(false)} className={profileStyles.buttonSecondary} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
