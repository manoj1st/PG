import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
import { CartProvider } from "./store/CartContext";
=======
>>>>>>> main
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
=======
    <RouterProvider router={router} />
>>>>>>> main
  </React.StrictMode>
);
