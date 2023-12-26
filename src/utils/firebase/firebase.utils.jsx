import {initializeApp} from 'firebase/app'
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
//getDoc: getting documents data  setDoc: setting documents data 


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASBHXqzR8boStFqgN4qYbjoFZBih3zofg",
    authDomain: "crwn-clothing-db-4947f.firebaseapp.com",
    projectId: "crwn-clothing-db-4947f",
    storageBucket: "crwn-clothing-db-4947f.appspot.com",
    messagingSenderId: "47177040915",
    appId: "1:47177040915:web:0a81ce9dfbc4949855abe6"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = ()=> signInWithPopup(auth, googleProvider)
  export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth, googleProvider)
  // can have different provider: e.g. facebook or github

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation ={}
  )=>{
      if(!userAuth) return 
      const userDocRef = doc(db,'user', userAuth.uid)
      const userSnapshot = await getDoc(userDocRef)
      //1. check if user data exists
      //  return userDocRef
      //2. if user data not exists
      if(!userSnapshot.exists()){
          const {displayName, email} = userAuth
          const createdAt = new Date()
          try{
              await setDoc(userDocRef,{displayName,email,createdAt, ...additionalInformation})
          }catch(error){
              console.log('error creating the user', error.message)
          }
      }
      return userDocRef
    }

  export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    // if do not receive any articles, do not run the function    
    if(!email || !password) return
    
    return await createUserWithEmailAndPassword(auth, email, password)
   
  }

  export const signAuthInWithEmailAndPassword = async (email,password)=>{
    // if do not receive any articles, do not run the function    
    if(!email || !password) return
    
    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser =async()=> await signOut(auth)