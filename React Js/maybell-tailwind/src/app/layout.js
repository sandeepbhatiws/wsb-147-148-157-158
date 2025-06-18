"use client";

import "../../public/css/style.css"
import Footer from "./Components/Common/Footer";
import Header from "./Components/Common/Header";
import { Provider } from 'react-redux'
import { store } from "./Redux ToolKit/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={ store }>
          <Header/>
          {children}
          <Footer/>
        </Provider>

        
      </body>
    </html>
  );
}
