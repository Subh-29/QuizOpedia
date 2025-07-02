'use client';

import { Provider } from "react-redux";
import Store from "./redux/Store";

const providers = (child) => {
  return (
    <Provider store={Store}>{child}</Provider>
  );
};

export default providers;