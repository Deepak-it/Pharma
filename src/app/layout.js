import { Inter } from "next/font/google";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css'
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pharma App CRUD",
  description: "Generated as POC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      {/* <script src = "/bootstrap/dist/js/bootstrap.js"></script> */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
    </html>
  );
}
