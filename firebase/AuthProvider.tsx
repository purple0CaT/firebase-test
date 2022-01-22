import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
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
  // === SignUp
  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(
        (userCredentials) => userCredentials && setCurrentUser(userCredentials),
      )
      .catch((error) => alert(error.message));
  }
  // === LOGIN
  function logIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(
        (userCredentials) => userCredentials && setCurrentUser(userCredentials),
      )
      .catch((error) => alert(error.message));
  }
  // === LogOut
  function logOut() {
    signOut(auth);
    setCurrentUser(null);
  }
  //   === ResetPass
  function resetPassword(email: string) {
    let check;
    sendPasswordResetEmail(auth, email)
      .then(() => (check = true))
      .catch((err) => {
        alert(err.message);
        check = false;
      });
    return check;
  }
  //   === UpdateUserEmail
  function updateUserEmail(email: string) {
    if (auth.currentUser) updateEmail(auth.currentUser, email);
  }
  //   === Update User Password
  function updateUserPassword(password: string) {
    if (auth.currentUser) updatePassword(auth.currentUser, password);
  }
  //   === Storage
  const value = {
    currentUser,
    loading,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };
  //
  useEffect(() => {
    const usnsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return usnsub;
  }, []);
  //   JSX
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
