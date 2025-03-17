// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "nbcmultiservices-9db9b.firebaseapp.com",
    projectId: "nbcmultiservices-9db9b",
    storageBucket: "nbcmultiservices-9db9b.appspot.com",
    messagingSenderId: "660673232534",
    appId: "1:660673232534:web:1ee5cb223cbfaf03578cb7",
    measurementId: "G-6NDBNNDVL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

