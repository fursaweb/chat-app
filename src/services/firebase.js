import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC6xp508TFJomiZyaFoD8dd5f22O0YSo5I",
  authDomain: "chat-app-ec372.firebaseapp.com",
  databaseURL: "https://chat-app-ec372.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
export const functionFirebase = firebase.funtions;
