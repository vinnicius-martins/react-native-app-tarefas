import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnRhxYx7GmKaBYa0I6q-s7b1aVfPTHWpQ",
  authDomain: "apptarefas-537bd.firebaseapp.com",
  projectId: "apptarefas-537bd",
  storageBucket: "apptarefas-537bd.appspot.com",
  messagingSenderId: "470594670841",
  appId: "1:470594670841:web:cb36d54d9a4ccc09e7d228",
  measurementId: "G-KGWK3FC4JQ"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const auth = getAuth(app)