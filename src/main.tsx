import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// React query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
    ,
  </React.StrictMode>
);
