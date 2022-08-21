import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(true);

  const checkAuth = () => {
    setCheck((prev) => !prev);
  };

  async function signup(values) {
    let signupData = null;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/signup`,
        values
      );
      signupData = data;
    } catch ({ response: { data } }) {
      signupData = data;
    } finally {
      setLoading(false);
      checkAuth();
      return signupData;
    }
  }

  async function signin(values) {
    let signinData = null;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/signin`,
        values
      );
      localStorage.setItem("user", JSON.stringify(data));
      signinData = data;
    } catch ({ response: { data } }) {
      signinData = data;
    } finally {
      setLoading(false);
      checkAuth();
      return signinData;
    }
  }

  function logout() {
    localStorage.clear();
    checkAuth();
  }

  /*   function googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  function facebookSignIn() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function changeEmail(email) {
    return updateEmail(currentUser, email);
  }

  function changeProfile(displayName) {
    return updateProfile(currentUser, { displayName: displayName });
  }

  function changePassword(password) {
    return updatePassword(currentUser, password);
  } */

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setCurrentUser(user);
      setLoading(false);
    } else {
      setCurrentUser(null);
    }
  }, [check]);

  const value = {
    currentUser,
    checkAuth,
    signup,
    signin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
