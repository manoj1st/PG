import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "../pages/HomePage";
import { ProductListingPage } from "../pages/ProductListingPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
=======
>>>>>>> main

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ProductListingPage /> },
<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
      { path: "product/:slug", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> }
=======
      { path: "product/:slug", element: <ProductDetailsPage /> }
>>>>>>> main
    ]
  }
]);
