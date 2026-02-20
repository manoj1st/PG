import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";

const HomePage = lazy(() => import("../pages/HomePage").then((module) => ({ default: module.HomePage })));
const ProductListingPage = lazy(() =>
  import("../pages/ProductListingPage").then((module) => ({ default: module.ProductListingPage }))
);
const ProductDetailsPage = lazy(() =>
  import("../pages/ProductDetailsPage").then((module) => ({ default: module.ProductDetailsPage }))
);
const CartPage = lazy(() => import("../pages/CartPage").then((module) => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage").then((module) => ({ default: module.CheckoutPage })));

function RouteFallback() {
  return (
    <section className="container section">
      <p>Loading page...</p>
    </section>
  );
}

const withSuspense = (element: JSX.Element) => <Suspense fallback={<RouteFallback />}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "shop", element: withSuspense(<ProductListingPage />) },
      { path: "product/:slug", element: withSuspense(<ProductDetailsPage />) },
      { path: "cart", element: withSuspense(<CartPage />) },
      { path: "checkout", element: withSuspense(<CheckoutPage />) }
    ]
  }
]);
