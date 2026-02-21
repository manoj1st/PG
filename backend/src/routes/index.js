const express = require("express");
const { resolveTenant } = require("../middleware/tenantContext");
const { requireAuth } = require("../middleware/auth");
const { publicRouter } = require("./public");
const { secureRouter } = require("./secure");

const apiRouter = express.Router();

apiRouter.get("/meta", (_req, res) => {
  res.json({
    service: "Jewellery SaaS API",
    model: "multi-tenant",
    tenantResolution: "x-org-id header or orgId query",
    routes: {
      public: [
        "GET /api/public/organizations",
        "GET /api/public/catalog/types",
        "GET /api/public/catalog/products",
        "GET /api/public/catalog/products/:slug",
        "POST /api/public/auth/signup",
        "POST /api/public/auth/login",
        "POST /api/public/auth/verify-otp"
      ],
      secure: [
        "GET /api/secure/profile",
        "GET /api/secure/users",
        "GET /api/secure/customers",
        "POST /api/secure/customers"
      ]
    }
  });
});

apiRouter.use("/public", resolveTenant, publicRouter);
apiRouter.use("/secure", resolveTenant, requireAuth, secureRouter);

// Backward compatibility for existing frontend services.
apiRouter.get("/products/types", resolveTenant, (req, res) => {
  res.json(req.tenant.organization.productTypes || []);
});

apiRouter.get("/products", resolveTenant, (req, res) => {
  const { type, subtype } = req.query;
  const products = (req.tenant.organization.products || []).filter((product) => {
    if (type && product.type !== type) return false;
    if (subtype && product.subtype !== subtype) return false;
    return true;
  });
  res.json(products);
});

apiRouter.get("/products/:slug", resolveTenant, (req, res) => {
  const product = (req.tenant.organization.products || []).find((item) => item.slug === req.params.slug);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(product);
});

module.exports = { apiRouter };
