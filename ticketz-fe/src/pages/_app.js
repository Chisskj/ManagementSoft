import "styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store, { persistor } from "src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, Flip } from "react-toastify";

import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-mulish",
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className={`${mulish.variable}`}>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} transition={Flip} theme="colored" />
        </div>
      </PersistGate>
    </Provider>
  );
}
