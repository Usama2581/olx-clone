// import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// import { FacebookAuthProvider } from "firebase/auth";

import {  getRedirectResult, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { query, where, getDocs, getDoc } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDlNRqmAY6iKEovbf0Nocd7HtHKyjaOnYM",
    authDomain: "olxclone-47a82.firebaseapp.com",
    projectId: "olxclone-47a82",
    storageBucket: "olxclone-47a82.appspot.com",
    messagingSenderId: "985041448426",
    appId: "1:985041448426:web:12b341ccccf7894d6a5693",
    measurementId: "G-MHV3Z9WNXK"
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
const provider = new FacebookAuthProvider();



async function fbLogin() {

    const auth = getAuth();
    await getRedirectResult(auth)

}


async function register(form) {

    let { email, name, gender, age, password } = form
    await createUserWithEmailAndPassword(auth, email, password)

    const uid = auth.currentUser.uid
    await setDoc(doc(db, "users", uid), {
        name, age, gender, email, uid
    });
    return 'done'
}




async function login(email, password) {

    await signInWithEmailAndPassword(auth, email, password)
    return 'done'
}


//post Ads
async function postAd(file, adsDetails) {
    const imgRef = ref(storage, 'images/' + file.name);
    const uploadedImg = await uploadBytes(imgRef, file)
    const url = await getDownloadURL(uploadedImg.ref)

    const uid = auth.currentUser.uid
    let { title, price, description, location } = adsDetails
    await addDoc(collection(db, "ads"), {
        uid, title, price, description, url, location
    });

}
//get all ads
const getAds = async () => {

    const q = query(collection(db, "ads"));
    let data = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const ads = { ...doc.data(), id: doc.id }
        data.push(ads)
    });
    return data
}

// get clicked ad
async function getAd(id) {
    const docRef = doc(db, "ads", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
}

//get user profile
const getProfile = async () => {

    const uid = auth.currentUser.uid

    const q = query(collection(db, "users"), where("uid", "==", uid))
    let data = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data = [...data, doc.data()]
    });
    return data
}


//get user ads
const myAds = async () => {
    const uid = auth.currentUser.uid
    const q = query(collection(db, "ads"), where("uid", "==", uid));
    let data = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const ads = { ...doc.data(), id: doc.id }
        data.push(ads)
    });
    return data
}
export {
    register,
    login,
    postAd,
    getAds,
    getAd,
    getProfile,
    myAds,
    fbLogin
}