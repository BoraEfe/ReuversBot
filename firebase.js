// firebase.js
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDcUtiBDqih-aw7jnkqfrNgFx5-keANWP4",
  authDomain: "reuversbot.firebaseapp.com",
  projectId: "reuversbot",
  storageBucket: "reuversbot.firebasestorage.app",
  messagingSenderId: "221705798620",
  appId: "1:221705798620:web:bedc3763c909fa347e4519",
  measurementId: "G-CQSJ8D0K9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getFact() {
  try {
    const factsCollection = collection(db, 'randomFacts');
    const factsSnapshot = await getDocs(factsCollection);
    const facts = [];
        
    factsSnapshot.forEach(doc => facts.push(doc.data().fact));

    if (facts.length > 0) {
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      return randomFact;
    } else {
      throw new Error("Er zijn geen feiten beschikbaar.");
    }
  } catch (error) {
    console.error("Fout bij het ophalen van feit:", error);
    throw new Error("Fout bij het ophalen van feit.");
  }
}
async function getImage() {
  try {
      const imagesCollection = collection(db, 'randomImages');
      const imagesSnapshot = await getDocs(imagesCollection);
      const images = [];
      imagesSnapshot.forEach(doc => images.push(doc.data().image));
      if (images.length > 0) {
          const randomImage = images[Math.floor(Math.random() * images.length)];
          return randomImage;
      } else {
          throw new Error("Er zijn geen images beschikbaar.");
      }
  } catch (error) { 
      console.error("Fout bij het ophalen van image:", error);
      throw new Error("Fout bij het ophalen van image.");
  }
}
module.exports = { db, getFact, getImage };
