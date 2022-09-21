import axios from "axios";
import {
  deleteCookie,
  getCookie,
  getCookies,
  removeCookies,
  setCookie,
} from "cookies-next";

import { useRouter } from "next/router";

import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  // console.log(router);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [check, setCheck] = useState(true);
  console.log(error);
  const setUser = (user) => {
    setCurrentUser(user);
  };
  const checkAuth = () => {
    setCheck(!check);
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
    let signupData = null;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/signin`,
        values
      );
      if (response.status === 200) {
        signupData = response.data;
        const cookieOptions = {
          // httpOnly: true,
          // secure: true,
        };
        setCookie("user_id", response.data.user_id, cookieOptions);
        setCookie("token", response.data.token, cookieOptions);
        setCookie("user", response.data.userType, cookieOptions);
      }
    } catch (error) {
      signupData = error.response.data;
    } finally {
      checkAuth();
      return signupData;
    }
  }

  /* async function signin(values) {
    // setError("");
    // setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/signin`,
        values
      );
      console.log(response.data);

      if (response.status === 200) {
        const cookieOptions = {
          // httpOnly: true,
          // secure: true,
        };

        setCookie("user_id", response.data.user_id, cookieOptions);
        setCookie("token", response.data.token, cookieOptions);
        setCookie("user", response.data.userType, cookieOptions);
        if (response.data.userType === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/");
        }
      } else {
        console.log(response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      // setError(error.message);
    } finally {
      checkAuth();
      setLoading(false);
    }
  }
 */
  function logout() {
    setCurrentUser(null);
    localStorage.clear();
    deleteCookie("user_id");
    deleteCookie("token");
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
            if (user.data) {
              setCurrentUser(
                user.data.tutor ||
                  user.data.student ||
                  user.data.institute ||
                  user.data.admin
              );
            } else {
              setCurrentUser(null);
            }
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
    loading,
    error,
    setUser,
    checkAuth,
    signup,
    signin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
