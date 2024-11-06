import React, { useState, useEffect } from "react";
// import Kasi from "../src/assets/kasi.jpg"; // รูปภาพที่ต้องการแปลง

const App: React.FC = () => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const data = {
    name: "Kasidit Boonchai",
    email: "kasidit.bc@gmail.com",
    phone: "084-699-5862",
    address: "Nakkon Si Thammarat, Thailand",
  };

  // ฟังก์ชันแปลงรูปภาพเป็น Base64 (ปิดใช้งานชั่วคราว)
  // const loadImageAsBase64 = () => {
  //   const img = new Image();
  //   img.src = Kasi; // ระบุ path ของรูปภาพ

  //   img.onload = () => {
  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");
  //     if (ctx) {
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx.drawImage(img, 0, 0);
  //       const base64 = canvas.toDataURL("image/jpeg");
  //       setBase64Image(base64); // บันทึก Base64 ของรูปภาพ
  //     }
  //   };
  // };

  const handleDownload = () => {
    const vCard = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${data.name}
  TEL:${data.phone}
  EMAIL:${data.email}
  ADR:${data.address}
  // PHOTO;ENCODING=BASE64:${
    base64Image ? base64Image.split(",")[1] : ""
  }  // แยกส่วน Base64 ที่ต้องการ
  END:VCARD
    `.trim();

    const blob = new Blob([vCard], { type: "text/vcard" });

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    // การดาวน์โหลดที่แตกต่างกันสำหรับ iOS และ Android
    if (isIOS) {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "contact.vcf";
      link.click();
      URL.revokeObjectURL(url);
    } else if (isAndroid) {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "contact.vcf";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
        (window.navigator as any).msSaveOrOpenBlob(blob, "contact.vcf");
      } else {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = "contact.vcf";
        link.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  // useEffect(() => {
  //   loadImageAsBase64();
  // }, []);

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
