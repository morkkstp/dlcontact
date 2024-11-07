import React, { useState, useEffect } from "react";
import Kasi from "../src/assets/kasi.jpg"; // รูปภาพที่ต้องการแปลง

const App: React.FC = () => {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const data = {
    fname: "Kasidit",
    lname: "Boonchai",
    email: "kasidit.bc@gmail.com",
    phone: "084-699-5862",
    companyName: 'SCG',
    address: "Nakkon Si Thammarat, Thailand",
  };

  // ฟังก์ชันแปลงรูปภาพเป็น Base64
  const loadImageAsBase64 = () => {
    const img = new Image();
    img.src = Kasi; // ระบุ path ของรูปภาพ
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL("image/jpeg");
        setBase64Image(base64); // บันทึก Base64 ของรูปภาพ
      }
    };
  };

  // ฟังก์ชันการโหลด URL รูปภาพ
  const loadImageUrl = () => {
    setImageUrl(Kasi); // กำหนด URL ของรูปภาพ
  };

  const handleDownload = () => {
    if (!base64Image && !imageUrl) {
      alert("กรุณารอให้รูปภาพโหลดเสร็จแล้ว");
      return;
    }

    // กำหนด vCard โดยใช้ Base64 สำหรับ iOS และ URL สำหรับ Android
    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${data.fname} ${data.lname} 
TEL:${data.phone}
EMAIL:${data.email}
ADR:${data.companyName} ${data.address}
${base64Image ? `PHOTO;ENCODING=BASE64:${base64Image.split(",")[1]}` : `PHOTO;TYPE=JPEG:${imageUrl}`} 
END:VCARD
    `.trim();

    const blob = new Blob([vCard], { type: "text/vcard" });

    const link = document.createElement("a");
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      // สำหรับ Internet Explorer
      (window.navigator as any).msSaveOrOpenBlob(blob, "contact.vcf");
    } else {
      // สำหรับเบราว์เซอร์ที่รองรับ
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "contact.vcf";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    loadImageAsBase64();  // โหลด Base64 รูปภาพ
    loadImageUrl();       // โหลด URL รูปภาพ
  }, []);

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add Contact
    </button>
  );
};

export default App;
