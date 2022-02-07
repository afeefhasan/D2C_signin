import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth";
import {getFirestore,query,where,getDocs,collection,addDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD6RNf-nWmlXV3sljxMiuITvibsmbtltqI",
    authDomain: "user-b3d61.firebaseapp.com",
    projectId: "user-b3d61",
    storageBucket: "user-b3d61.appspot.com",
    messagingSenderId: "895614154425",
    appId: "1:895614154425:web:a451e05d89cc1e6daf8d68"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  //create google login provider
    const googleProvider = new GoogleAuthProvider();
//google login function
    const googleLogin = () => {
        signInWithPopup(auth, googleProvider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const docs = await getDocs(q);
          if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
              uid: user.uid,
              name: user.displayName,
              authProvider: "google",
              email: user.email,
            });
          }
        
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
//create email and password login function

    const emailLogin = (email,password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert(errorMessage);
  });
    }
    const emailRegister= async (name, email, password) => {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
          });
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      };
      //send password reset email
      const sendPasswordReset = async (email) => {
        try {
          await sendPasswordResetEmail(auth, email);
          alert("Password reset link sent!");
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      };

    const logout = () => {
        signOut(auth);
      };
    export {googleLogin,sendPasswordReset,emailLogin,logout,db,auth,emailRegister};