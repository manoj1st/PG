const express = require("express");
const productsModule = require("../modules/products");

const apiRouter = express.Router();

apiRouter.get("/meta", (_req, res) => {
  res.json({
    service: "Kwality-style jewellery API",
    modules: [
      "auth",
      "users",
      "products",
      "collections",
      "categories",
      "wishlist",
      "cart",
      "orders",
      "payments",
      "reviews",
      "appointments",
      "goldRates",
      "coupons",
      "banners",
      "cms",
      "search",
      "upload",
      "notifications"
    ]
  });
});

apiRouter.use("/products", productsModule.routes);

module.exports = { apiRouter };
