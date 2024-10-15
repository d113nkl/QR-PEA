// นำเข้า Firebase SDK ผ่าน CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9BFZK7_0zm5JSvJ59yL783HkrzB7VdfQ",
    authDomain: "database-history-ca.firebaseapp.com",
    projectId: "database-history-ca",
    storageBucket: "database-history-ca.appspot.com",
    messagingSenderId: "608713310055",
    appId: "1:608713310055:web:55fd4f781eeb05d50f79c2",
    measurementId: "G-BM3QQ77W6S"
};

// เริ่มต้นการเชื่อมต่อกับ Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // สร้าง instance ของ Firestore

// เพิ่มเอกสารลงในคอลเลกชัน
async function addData() {
    try {
        await setDoc(doc(db, "users", "user1"), {
            name: "John Doe2",
            age: 25,
            location: "Thailand"
        });
        console.log("Document added!");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// กำหนดปุ่มให้เรียกใช้ฟังก์ชัน addData เมื่อถูกคลิก
document.getElementById('addDataBtn').addEventListener('click', addData);
