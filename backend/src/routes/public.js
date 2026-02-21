const express = require("express");
const { getOrganizations, getOrganizationById, saveOrganization } = require("../lib/db");

const router = express.Router();

router.get("/organizations", (_req, res) => {
  const orgs = getOrganizations().map((org) => ({
    id: org.id,
    name: org.name,
    settings: org.settings
  }));
  res.json(orgs);
});

router.get("/catalog/types", (req, res) => {
  res.json(req.tenant.organization.productTypes || []);
});

router.get("/catalog/products", (req, res) => {
  const { type, subtype } = req.query;
  const products = (req.tenant.organization.products || []).filter((product) => {
    if (type && product.type !== type) return false;
    if (subtype && product.subtype !== subtype) return false;
    return true;
  });
  res.json(products);
});

router.get("/catalog/products/:slug", (req, res) => {
  const product = (req.tenant.organization.products || []).find((item) => item.slug === req.params.slug);
  if (!product) return res.status(404).json({ message: "Product not found" });
  return res.json(product);
});

router.post("/auth/signup", (req, res) => {
  const { fullName, email, mobileNumber } = req.body || {};

  if (!fullName || !mobileNumber) {
    return res.status(400).json({ message: "fullName and mobileNumber are required" });
  }

  const org = req.tenant.organization;
  const newUser = {
    id: `u-${org.id}-${Date.now()}`,
    fullName,
    email: email || "",
    mobileNumber,
    role: "customer"
  };

  org.users = [...(org.users || []), newUser];
  saveOrganization(org);

  return res.status(201).json({
    success: true,
    message: `Welcome ${fullName}. Profile created for ${org.name}.`,
    user: newUser
  });
});

router.post("/auth/login", (req, res) => {
  const { identifier } = req.body || {};
  if (!identifier) {
    return res.status(400).json({ message: "identifier is required" });
  }

  const org = getOrganizationById(req.tenant.orgId);
  const user = (org.users || []).find((item) => item.email === identifier || item.mobileNumber === identifier);

  if (!user) {
    return res.status(404).json({ message: "No matching user found for this organization" });
  }

  return res.json({
    success: true,
    message: `OTP sent to ${identifier}`,
    challengeId: `challenge-${Date.now()}`,
    demoOtp: "123456"
  });
});

router.post("/auth/verify-otp", (req, res) => {
  const { identifier, otp } = req.body || {};
  if (otp !== "123456") {
    return res.status(400).json({ success: false, message: "Invalid OTP. Use demo OTP 123456" });
  }

  const org = getOrganizationById(req.tenant.orgId);
  const user = (org.users || []).find((item) => item.email === identifier || item.mobileNumber === identifier);
  if (!user) return res.status(404).json({ message: "No matching user found" });

  return res.json({
    success: true,
    token: `${org.id}:${user.id}`,
    user,
    org: {
      id: org.id,
      name: org.name
    }
  });
});

module.exports = { publicRouter: router };
