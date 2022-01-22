import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase-config";

const AuthContext: any = React.createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}
//
const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser]: any = useState();
  const [loading, setLoading]: any = useState(true);
  // SignUp
  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(
        (userCredentials) => userCredentials && setCurrentUser(userCredentials),
      )
      .catch((error) => alert(error.message));
  }
  //   LOGIN
  function logIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(
        (userCredentials) => userCredentials && setCurrentUser(userCredentials),
      )
      .catch((error) => alert(error.message));
  }
  function logOut() {
    signOut(auth);
    setCurrentUser(null);
  }
  //
  const value = {
    currentUser,
    loading,
    signUp,
    logIn,
    logOut,
  };
  useEffect(() => {
    const usnsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return usnsub;
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
