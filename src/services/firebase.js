import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/database";
import 'firebase/compat/storage';

const config = {
    apiKey: "AIzaSyA0c4AngClsnqXDPQqoxhD9mVYgQom-65I",
    authDomain: "private-chat-edd81.firebaseapp.com",
    databaseURL: "https://private-chat-edd81.firebaseio.com",
    storageBucket: "private-chat-edd81.appspot.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
export const storage = firebase.storage();
