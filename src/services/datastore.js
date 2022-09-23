import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCIXspexj-NZj6CHXO2ZedIwPEY-UJd-aU',
  authDomain: 'reactnotes-bb302.firebaseapp.com',
  databaseURL: 'https://reactnotes-bb302-default-rtdb.firebaseio.com',
  projectId: 'reactnotes-bb302',
  storageBucket: 'reactnotes-bb302.appspot.com',
  messagingSenderId: '149606609912',
  appId: '1:149606609912:web:0864215dd75f5634e21c0d',
  measurementId: 'G-3TZSWZWRZM',
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  // do something here
  // callback() when done
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function add(note) {
  database.ref('notes').push(note);
}

export function removes(id) {
  database.ref('notes').child(id).remove();
}

export function updates(id, note) {
  database.ref('notes').child(id).update({
    text: note,
  });
}

export function move(id, pos) {
  database.ref('notes').child(id).update({
    x: pos.x,
    y: pos.y,
  });
}
