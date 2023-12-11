import QRCode from "qrcode-generator";

export default function QRCodeGenerator({ data }) {
  // Membuat QR code dengan data yang diberikan
  const qr = QRCode(0, "L");
  qr.addData(data);
  qr.make();
  const qrImage = qr.createImgTag(7); // ukuran 4x4

  // Menampilkan QR code ke dalam elemen HTML
  return <div dangerouslySetInnerHTML={{ __html: qrImage }} />;
}
