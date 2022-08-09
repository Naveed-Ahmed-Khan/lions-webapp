import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(userData) {
    // return createUserWithEmailAndPassword(auth, email, password);
  }

  async function signin(data) {
    // console.log(data);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log(options);

    try {
      const res = await fetch("http://localhost:5000/signin", options);
      const user = await res.json();
      setCurrentUser(user);
    } catch (error) {
      console.log(error.message);
      setCurrentUser(null);
    }
  }

  function logout() {
    // return signOut(auth);
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

  /*   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []); */

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    signin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
