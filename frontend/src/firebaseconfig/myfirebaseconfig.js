import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const project_ID = process.env.REACT_APP_FB_PROJECT_ID;

// console.log(project_ID);

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FB_API_KEY,
	authDomain: project_ID + ".firebaseapp.com",
	projectId: project_ID,
	storageBucket: project_ID + ".appspot.com",
	messagingSenderId: "316700975498",
	appId: "1:316700975498:web:15063159b205c1a349a873",
	measurementId: "G-2ZGE63ES9F",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const storage = firebaseApp.storage();
// const auth = firebase.auth();

export { storage };
