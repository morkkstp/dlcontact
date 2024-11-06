import React, { useState, useEffect } from "react";

const App: React.FC = () => {

  const data = {
    name: "Kasidit Boonchai",
    email: "kasidit.bc@gmail.com",
    phone: "084-699-5862",
    address: "Nakkon Si Thammarat, Thailand",
  };

  const handleDownload = () => {

    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TEL:${data.phone}
EMAIL:${data.email}
ADR:${data.address}
END:VCARD
    `.trim();
    const blob = new Blob([vCard], { type: "text/vcard" });
    // สร้างลิงค์ดาวน์โหลด
    const link = document.createElement("a");
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      // สำหรับ Internet Explorer
      (window.navigator as any).msSaveOrOpenBlob(blob, "contact.vcf");
    } else {
      // สำหรับเบราว์เซอร์ที่รองรับ
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "contact.vcf";
      // ตรวจสอบว่าเบราว์เซอร์รองรับการคลิก
      link.click();
      // ทำความสะอาดหลังจากการดาวน์โหลด
      URL.revokeObjectURL(url);
    }
  };

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
