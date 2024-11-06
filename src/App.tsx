import React, { useState, useEffect } from "react";
import Kasi from "../src/assets/kasi.jpg"; // Path to the image you want to convert

const App: React.FC = () => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const data = {
    name: "Kasidit Boonchai",
    email: "kasidit.bc@gmail.com",
    phone: "084-699-5862",
    address: "Nakkon Si Thammarat, Thailand",
  };

  // Function to convert image to Base64
  const loadImageAsBase64 = () => {
    const img = new Image();
    img.src = Kasi; // Path to the image

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL("image/jpeg");
        setBase64Image(base64); // Save the Base64 of the image
      }
    };

    img.onerror = () => {
      console.error("Error loading image");
    };
  };

  const handleDownload = () => {
    if (!base64Image) {
      alert("กรุณารอให้รูปภาพโหลดเสร็จแล้ว");
      return;
    }

    const vCard = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${data.name}
  TEL:${data.phone}
  EMAIL:${data.email}
  ADR:${data.address}
  PHOTO;ENCODING=BASE64:${base64Image.split(",")[1]}  // Extract only the base64 part
  END:VCARD
    `.trim();

    const blob = new Blob([vCard], { type: "text/vcard" });

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    // Different download methods for iOS and Android
    if (isIOS || isAndroid) {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "contact.vcf";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      // For desktop browsers
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

  useEffect(() => {
    loadImageAsBase64();
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
