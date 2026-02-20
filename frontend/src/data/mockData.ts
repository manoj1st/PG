export type ProductType = "gold" | "silver" | "diamond";

export type Product = {
  slug: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  type: ProductType;
  subtype: string;
};

export type ProductTypeConfig = {
  type: ProductType;
  label: string;
  subtypes: string[];
};

export const productTypeConfigs: ProductTypeConfig[] = [
  { type: "gold", label: "Gold", subtypes: ["Rings", "Necklaces", "Chains", "Coins"] },
  { type: "silver", label: "Silver", subtypes: ["Rings", "Bracelets", "Anklets", "Coins"] },
  { type: "diamond", label: "Diamond", subtypes: ["Rings", "Necklaces", "Earrings", "Bracelets"] }
];

export const categories = productTypeConfigs.map((config) => ({
  name: config.label,
  description: `${config.subtypes.slice(0, 2).join(" and ")} plus more designs`,
  href: `/shop/${config.type}`
}));

export const trustPoints = ["BIS Hallmarked Jewellery", "IGI/GIA Certified Diamonds", "Free Insured Shipping"];

export const products: Product[] = [
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
