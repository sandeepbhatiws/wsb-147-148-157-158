import "../../public/css/style.css"
import Footer from "./Components/Common/Footer";
import Header from "./Components/Common/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
