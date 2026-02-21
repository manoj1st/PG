import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute } from "../components/common/ProtectedRoute";

const HomePage = lazy(() => import("../pages/HomePage").then((module) => ({ default: module.HomePage })));
const ProductListingPage = lazy(() =>
  import("../pages/ProductListingPage").then((module) => ({ default: module.ProductListingPage }))
);
const GoldPage = lazy(() => import("../pages/GoldPage").then((module) => ({ default: module.GoldPage })));
const SilverPage = lazy(() => import("../pages/SilverPage").then((module) => ({ default: module.SilverPage })));
const DiamondPage = lazy(() => import("../pages/DiamondPage").then((module) => ({ default: module.DiamondPage })));
const ProductDetailsPage = lazy(() =>
  import("../pages/ProductDetailsPage").then((module) => ({ default: module.ProductDetailsPage }))
);
const CartPage = lazy(() => import("../pages/CartPage").then((module) => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage").then((module) => ({ default: module.CheckoutPage })));
const SignupPage = lazy(() => import("../pages/SignupPage").then((module) => ({ default: module.SignupPage })));
const LoginPage = lazy(() => import("../pages/LoginPage").then((module) => ({ default: module.LoginPage })));

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
      {
        element: <ProtectedRoute />,
        children: [
          { path: "shop/gold", element: withSuspense(<GoldPage />) },
          { path: "shop/silver", element: withSuspense(<SilverPage />) },
          { path: "shop/diamond", element: withSuspense(<DiamondPage />) },
          { path: "cart", element: withSuspense(<CartPage />) },
          { path: "checkout", element: withSuspense(<CheckoutPage />) }
        ]
      },
      { path: "signup", element: withSuspense(<SignupPage />) },
      { path: "login", element: withSuspense(<LoginPage />) }
    ]
  }
]);
