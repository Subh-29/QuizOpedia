'use client';

import { Provider as ReduxProvider } from "react-redux";
import Store from "./redux/Store";

const Providers = ({ children }) => {

  return (
    <ReduxProvider store={Store}>
      {children}
    </ReduxProvider>
  );
};

export default Providers