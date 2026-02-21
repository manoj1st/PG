const express = require("express");
const { getOrganizationById, saveOrganization } = require("../lib/db");

const router = express.Router();

router.get("/profile", (req, res) => {
  const org = getOrganizationById(req.auth.orgId);
  const user = (org.users || []).find((item) => item.id === req.auth.userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.json({ user, organization: { id: org.id, name: org.name } });
});

router.get("/users", (req, res) => {
  const org = getOrganizationById(req.auth.orgId);
  return res.json(org.users || []);
});

router.get("/customers", (req, res) => {
  const org = getOrganizationById(req.auth.orgId);
  return res.json(org.customers || []);
});

router.post("/customers", (req, res) => {
  const { name, email, mobileNumber } = req.body || {};
  if (!name || !mobileNumber) {
    return res.status(400).json({ message: "name and mobileNumber are required" });
  }

  const org = getOrganizationById(req.auth.orgId);
  const customer = {
    id: `c-${org.id}-${Date.now()}`,
    name,
    email: email || "",
    mobileNumber
  };

  org.customers = [...(org.customers || []), customer];
  saveOrganization(org);

  return res.status(201).json(customer);
});

module.exports = { secureRouter: router };
