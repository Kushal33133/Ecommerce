// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 import { useContext, useState } from "react";
 import { useEffect } from "react";


import {createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged,
    signOut,
    updateProfile,


} from "firebase/auth"
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBgtGObRIbCzEbMk54UNclT2tXLlZx8Rk",
  authDomain: "e-commerce-9677d.firebaseapp.com",
  projectId: "e-commerce-9677d",
  storageBucket: "e-commerce-9677d.appspot.com",
  messagingSenderId: "247995894371",
  appId: "1:247995894371:web:94fc9fe6efc99158960656"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth(){
const [user, setUser] = useState()

const signUp = (email, password, displayName) => 
createUserWithEmailAndPassword(auth,email, password).then(({user})=>{
    updateProfile(user,{displayName});
    setUser(user);
    return user;
});

const signIn = (email, password) =>
 signInWithEmailAndPassword(auth, email, password)
 .then(({user})=>{
     setUser(user);
     return user;
    });
     
const signOutUser = () => signOut(auth)
.then(() => setUser(null));
   
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth,(user)=>{
        user? setUser(user) : setUser(null);
        
       });
       return ()=> unsubscribe();
           
        });

 

    return {
        signIn, 
        signUp, 
        signOut:signOutUser,
        user
        
    };
    }

export default AuthProvider
