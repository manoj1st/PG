const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "..", "data", "sample-db.json");

function readDb() {
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function getOrganizations() {
  return readDb().organizations ?? [];
}

function getOrganizationById(orgId) {
  return getOrganizations().find((org) => org.id === orgId) ?? null;
}

function saveOrganization(nextOrg) {
  const db = readDb();
  const index = (db.organizations ?? []).findIndex((org) => org.id === nextOrg.id);
  if (index === -1) {
    db.organizations.push(nextOrg);
  } else {
    db.organizations[index] = nextOrg;
  }
  writeDb(db);
}

module.exports = {
  getOrganizations,
  getOrganizationById,
  saveOrganization
};
