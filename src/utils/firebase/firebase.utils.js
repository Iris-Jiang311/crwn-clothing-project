import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
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

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider)

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db,'user', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)
    

    //1. check if user data exists
    
    //  return userDocRef

    //2. if user data not exists
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef,{displayName,email,createdAt})
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
  }