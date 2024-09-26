
document.addEventListener("DOMContentLoaded", function() {
    // ดึงข้อมูลจาก localStorage
    var fullname = localStorage.getItem("fullname");
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");

    // ตรวจสอบว่า fullname มีค่าหรือไม่ ถ้าไม่มีให้ส่งผู้ใช้ไปยังหน้า index.html
    if (!fullname) {
        window.location.href = "login.html";
        return; // หยุดการทำงานของสคริปต์ถัดไป
    }

    // แสดงข้อความต้อนรับในส่วนเนื้อหา


    // สร้าง payload สำหรับส่งไปยัง API
    var payload = {
        "username": username,
        "password": password
    };

    // ส่งข้อมูลไปยัง API
    fetch("https://c1app.pea.co.th/idm-login/api_login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === true) {

            localStorage.removeItem("fullname");
            localStorage.removeItem("empId");
            localStorage.removeItem("username");
            localStorage.removeItem("password");


            window.location.href = "login.html";
        }
    });


    function handleLogout() {

        localStorage.removeItem("fullname");
        localStorage.removeItem("empId");
        localStorage.removeItem("username");
        localStorage.removeItem("password");

        window.location.href = "login.html";
    }
    document.querySelector('.logout-btn').addEventListener('click', handleLogout);



});
const constclss = {
    "M0100090": "100(150) A.",
    "M0100080": "50(100) A.",
    "M0100070": "30(100) A.",
    "M0100065": "30(90) A.",
    "M0100060": "30(60) A.",
    "M0100055": "20(60) A.",
    "M0100050": "20(40) A.",
    "M0100040": "15(45) A.",
    "M0100035": "10(100) A.",
    "M0100030": "10(30) A.",
    "M0100020": "5(15) A.",
    "M0100010": "3(9) A."
};

function generateQRCodeAndCallAPI() {
    var ca = document.getElementById("ca-input").value;

    if (ca.includes('200')) {
        var filteredCA = ca.match(/\d{11}/);
        if (filteredCA) {
            var caNumber = filteredCA[0];
            var qrcodeText = "|099400016550100\n0" + caNumber + "\n000000\n000";
            document.getElementById("qrcode").innerHTML = ""; 
            new QRCode(document.getElementById("qrcode"), {
                text: qrcodeText,
                width: 100,
                height: 100
            });

            var jsonData = {
                "CA": "0" + caNumber,
                "deviceNo": ""
            };

            fetch('https://c1app.pea.co.th/www/api/qdata3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response from API:', data);
                displayCustomerInfo(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            alert('หมายเลข CA ต้องมีอย่างน้อย 11 หลัก');
        }
    } else {
        alert('ไม่พบ "200" ในหมายเลข CA');
    }
}

function displayCustomerInfo(data) {
    var meterSizeText = constclss[data.METER_SIZE] || data.METER_SIZE;

    var customerInfoHtml = `
        <p><strong>หมายเลขผู้ใช้ไฟ:</strong> ${data.CA}</p>
        <p><strong>หมายเลขมิเตอร์:</strong> ${data.PEANO_Meter}</p>
        <p><strong>ชื่อผู้ใช้:</strong> ${data.customerName}</p>
        <p><strong>ที่อยู่:</strong> ${data.billAddress}</p>
        <p><strong>อัตรา:</strong> ${data.ETTAT_COD}</p>
        <p><strong>ขนาดมิเตอร์:</strong> ${meterSizeText} (${data.METER_SIZE})</p>
    `;
    document.getElementById("customer-info").innerHTML = customerInfoHtml; 
}
