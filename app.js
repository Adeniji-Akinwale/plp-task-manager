// firebase-config.js
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  

// app.js

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Fetch tasks from Firestore
    db.collection('tasks').orderBy('timestamp').onSnapshot(snapshot => {
      taskList.innerHTML = '';
      snapshot.forEach(doc => {
        const task = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `<span>${task.text}</span><button data-id="${doc.id}">Delete</button>`;
        taskList.appendChild(li);
      });
    });
  
    // Add new task
    taskForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = taskInput.value.trim();
      if (text) {
        db.collection('tasks').add({
          text: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        taskInput.value = '';
      }
    });
  
    // Delete task
    taskList.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const id = e.target.getAttribute('data-id');
        db.collection('tasks').doc(id).delete();
      }
    });
  });
  