const { getOrganizationById } = require("../lib/db");

const DEFAULT_ORG_ID = process.env.DEFAULT_ORG_ID || "kwality-jewellers";

function resolveTenant(req, res, next) {
  const orgId = req.header("x-org-id") || req.query.orgId || DEFAULT_ORG_ID;
  const organization = getOrganizationById(orgId);

  if (!organization) {
    return res.status(404).json({
      message: `Organization '${orgId}' not found.`,
      availableVia: "x-org-id header or orgId query parameter"
    });
  }

  req.tenant = {
    orgId: organization.id,
    organization
  };
  return next();
}

module.exports = {
  resolveTenant
};
