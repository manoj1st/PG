const express = require("express");

const productTypes = [
  { type: "gold", label: "Gold", subtypes: ["Rings", "Necklaces", "Chains", "Coins"] },
  { type: "silver", label: "Silver", subtypes: ["Rings", "Bracelets", "Anklets", "Coins"] },
  { type: "diamond", label: "Diamond", subtypes: ["Rings", "Necklaces", "Earrings", "Bracelets"] }
];

const products = [
  {
    slug: "royal-diamond-ring",
    title: "Royal Diamond Ring",
    type: "diamond",
    subtype: "Rings",
    price: 86500,
    compareAt: 91500,
    image: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "classic-gold-necklace",
    title: "Classic Gold Necklace",
    type: "gold",
    subtype: "Necklaces",
    price: 124000,
    compareAt: 137000,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "daily-silver-anklet",
    title: "Daily Silver Anklet",
    type: "silver",
    subtype: "Anklets",
    price: 18500,
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "bridal-gold-chain",
    title: "Bridal Gold Chain",
    type: "gold",
    subtype: "Chains",
    price: 189000,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "silver-lakshmi-coin",
    title: "Silver Lakshmi Coin",
    type: "silver",
    subtype: "Coins",
    price: 9500,
    image: "https://images.unsplash.com/photo-1627295113228-69adf995b4d5?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "halo-diamond-necklace",
    title: "Halo Diamond Necklace",
    type: "diamond",
    subtype: "Necklaces",
    price: 215000,
    compareAt: 239000,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
  }
];

const router = express.Router();

router.get("/types", (_req, res) => {
  res.json(productTypes);
});

router.get("/", (req, res) => {
  const { type, subtype } = req.query;
  const filtered = products.filter((product) => {
    if (type && product.type !== type) return false;
    if (subtype && product.subtype !== subtype) return false;
    return true;
  });
  res.json(filtered);
});

router.get("/:slug", (req, res) => {
  const product = products.find((item) => item.slug === req.params.slug);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(product);
});

module.exports = {
  moduleName: "products",
  routes: router
};
