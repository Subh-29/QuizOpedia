'use client';

import { Provider as ReduxProvider } from "react-redux";
import Store from "./redux/Store";
// import { ToastContainer } from "react-toastify";

const Providers = ({ children }) => {

  return (
    <ReduxProvider store={Store}>
      {/* <ToastContainer
      position="center" /> */}
        {children}
    </ReduxProvider>
  );
};

export default Providers