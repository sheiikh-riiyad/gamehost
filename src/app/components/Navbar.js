'use client';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";


import { auth } from "../lib/firebase.js";
import Link from "next/link.js";

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current user:", currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // LOGIN HANDLER
  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful!");
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMsg("User not found.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("Wrong password.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("Invalid email.");
      } else {
        setErrorMsg(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // REGISTER HANDLER
  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg("");

    if (!email || !password || !confirmPassword) {
      setErrorMsg("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Account created successfully!");
      setShowRegisterModal(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email already in use.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("Invalid email.");
      } else if (error.code === "auth/weak-password") {
        setErrorMsg("Weak password. Try at least 6 characters.");
      } else {
        setErrorMsg(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowProfileModal(false);
  };

  // Handlers to switch modals
  const openRegisterFromLogin = () => {
    setShowLoginModal(false);
    setErrorMsg("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowRegisterModal(true);
  };

  const openLoginFromRegister = () => {
    setShowRegisterModal(false);
    setErrorMsg("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowLoginModal(true);
  };



const provider = new GoogleAuthProvider();

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Google Access Token (optional)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // Signed-in user info
    const user = result.user;
    alert("✅ Google login successful!");
    setShowLoginModal(false);
  } catch (error) {
    console.error("Google login error", error);
    alert("Google login failed: " + error.message);
  }
};



const handleFacebookLogin = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("✅ Facebook login successful!");
    setShowLoginModal(false);
  } catch (error) {
    console.error("Facebook login error", error);
    alert("Facebook login failed: " + error.message);
  }
};


const handleGitHubLogin = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("✅ GitHub login successful!");
    setShowLoginModal(false);
  } catch (error) {
    console.error("GitHub login error", error);
    alert("GitHub login failed: " + error.message);
  }
};


  return (
    <>
      {/* NAVBAR */}
      <div className='game shadow-cyan-500 shadow-md place-content-between flex p-2'>
        <div className="homelogo">
          <Link href="/"><img src="/media/gamehost.png" alt="GAMEHOST" /></Link>
        </div>

        <div>
          {!user && (
            <a
              className="fancys"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowLoginModal(true);
              }}
              role="button"
            >
              <span className="top-keys"></span>
              <span className="texts">LOGIN</span>
              <span className="bottom-key-1s"></span>
              <span className="bottom-key-2s"></span>
            </a>
          )}

          {user && (
            <button
              onClick={() => setShowProfileModal(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Open Profile"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gray"
                  viewBox="0 0 24 24"
                  width="40px"
                  height="40px"
                >
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl text-white mb-4">Login</h2>

            <input
              type="email"
              placeholder="Email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

            <button className="login-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p
              style={{ cursor: "pointer", color: "lightblue", marginTop: "10px" }}
              onClick={openRegisterFromLogin}
            >
              or create an account
            </p>

            <button className="close-btn" onClick={() => setShowLoginModal(false)}>X</button>

            <p className="text-white mt-2">OR</p>

            <Button variant="outline-warning" onClick={handleGoogleLogin} > <i className="fab fa-google"></i> GOOGLE</Button>
            
            <Button variant="outline-info" onClick={handleFacebookLogin}  > <i className="fab fa-facebook"></i> FACEBOOK</Button>

            <Button variant="outline-info" onClick={handleGitHubLogin}  > <i className="fab fa-github"></i> GITHUB</Button>
          
          </div>
        </div>
      )}

      {/* REGISTER MODAL (slide in from right) */}
      {showRegisterModal && (
        <div
          className="profile-modal-overlay"
          onClick={() => setShowRegisterModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1100,
          }}
        >
          <div
            className="profile-modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "300px",
              height: "100vh",
              backgroundColor: "#222",
              color: "white",
              padding: "20px",
              boxShadow: "-2px 0 5px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              transform: "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          >
            <button
              onClick={() => setShowRegisterModal(false)}
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              aria-label="Close register modal"
            >
              ×
            </button>

            <h2 className="text-xl text-white mb-4">Create Account</h2>

            <input
              
              type="email"
              placeholder="Email"
              className="modal-input "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="modal-input mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="modal-input mt-2 mb-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

            <button className="login-btn" onClick={handleRegister} disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p
              style={{ cursor: "pointer", color: "lightblue", marginTop: "10px" }}
              onClick={openLoginFromRegister}
            >
              Back to login
            </p>
          </div>
        </div>
      )}

      {/* PROFILE MODAL (slide in from right) */}
      {showProfileModal && (
        <div
          className="profile-modal-overlay"
          onClick={() => setShowProfileModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
        >
          <div
            className="profile-modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "300px",
              height: "100vh",
              backgroundColor: "#222",
              color: "white",
              padding: "20px",
              boxShadow: "-2px 0 5px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              transform: "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          >
            <button
              onClick={() => setShowProfileModal(false)}
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              aria-label="Close profile modal"
            >
              ×
            </button>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gray"
                  viewBox="0 0 24 24"
                  width="100px"
                  height="100px"
                  style={{ margin: "0 auto" }}
                >
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
              )}

              <h3 style={{ marginTop: "10px" }}>
                {user.displayName || user.email || "User"}
              </h3>
            </div>

            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
