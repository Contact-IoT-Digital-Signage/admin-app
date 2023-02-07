import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyAy9uKW7aqTofvACspzDl2Y4HnoyqjDqOY",
    authDomain: "developerweek2023.firebaseapp.com",
    projectId: "developerweek2023",
    storageBucket: "developerweek2023.appspot.com",
    messagingSenderId: "731214157690",
    appId: "1:731214157690:web:eb8fe6badb2c4d9051e8c3",
  };

export const firebaseApp = initializeApp(firebaseConfig);

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
        return () => unsubscribe();
    }, []);
    return <AuthContext.Provider value={{user, error}} {...props} />
}

export const useAuthState = () => {
    const auth = useContext(AuthContext);
    return {...auth, isAuthenticated: auth.user != null}
}