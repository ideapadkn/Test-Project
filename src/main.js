import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbdkdWCyNNZiFzRmEzhwC1B7XBgkICsdg",
  authDomain: "vite-project-669c5.firebaseapp.com",
  projectId: "vite-project-669c5",
  storageBucket: "vite-project-669c5.appspot.com",
  messagingSenderId: "476355464609",
  appId: "1:476355464609:web:289e90d746503e88574fe0"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .mount('#app')
