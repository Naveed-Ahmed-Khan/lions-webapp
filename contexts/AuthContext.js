import axios from "axios";
import { getCookie, getCookies } from "cookies-next";

import { useRouter } from "next/router";

import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ pageProps, children }) {
  console.log(pageProps);
  const router = useRouter();
  // console.log(router);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(true);

  const setUser = (user) => {
    setCurrentUser(user);
  };
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/signin`,
        values,
        { withCredentials: true }
      );
      console.log(response);
      signinData = response.data;
    } catch ({ response: { data } }) {
      signinData = data;
    } finally {
      checkAuth();
      setLoading(false);
      return signinData;
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.clear();
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
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
    const setLoggedInUser = async () => {
      const userId = getCookie("user_id");
      console.log(userId);

      const token = getCookie("token");

      console.log(token);
      if (userId) {
        if (!currentUser) {
          try {
            const user = await axios.get(
              `${process.env.NEXT_PUBLIC_API}/get-user/${userId}`
            );
            setCurrentUser(user.data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      } else {
        setCurrentUser(null);
      }
    };
    setLoggedInUser();
  }, [check]);

  const value = {
    currentUser,
    setUser,
    checkAuth,
    signup,
    signin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
