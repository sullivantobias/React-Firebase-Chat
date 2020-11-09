import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyA0c4AngClsnqXDPQqoxhD9mVYgQom-65I",
    authDomain: "private-chat-edd81.firebaseapp.com",
    databaseURL: "https://private-chat-edd81.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
