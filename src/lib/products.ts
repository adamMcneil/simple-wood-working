// Load all images. The name convention is:
// * `images/<product.slug>/0.jpg` : primary images
// * `images/<product.slug>/#.jpg` : additional images
const images = import.meta.glob("$lib/images/**/*.jpg", {
  import: "default",
  eager: true,
});
const data = import.meta.glob("$lib/table_data/*.csv", {
  as: "raw",
  eager: true,
});

// Data to describe a product
interface ProductData {
  // Title visible in UI
  title: string;
  // Slug to lookup images and url path. Must be unique.
  slug: string;
  // Price of the product
  price: string;
  // Long form description of the product
  description: string;
  // Short form key,value stats
  stats: Map<string, string>;
  // Stripe link
  stripe_link: string;
  // id to make custom links
  price_id: string;
}

// Enriched `Product` class that adds additional fields/methods to `ProductData`
export class Product {
  title: string;
  slug: string;
  price: string;
  description: string;
  stats: Map<string, string>;
  // TODO: what is the type of images
  image: any;
  images: Array<any>;
  stripe_link: string;
  price_id: string;

  constructor(product: ProductData) {
    this.title = product.title;
    this.slug = product.slug;
    this.price = product.price;
    this.description = product.description;
    this.stats = product.stats;
    this.image = images[`/src/lib/images/${this.slug}/0.jpg`];
    this.images = [];
    for (const name in images) {
      if (
        name.startsWith(`/src/lib/images/${this.slug}/`) &&
        !name.endsWith("/0.jpg")
      ) {
        this.images.push(images[name]);
      }
    }
    this.stripe_link = product.stripe_link;
    this.price_id = product.price_id;
  }
}

// List of all the products
const productsData: ProductData[] = [
  {
    title: "Dinning Room Table",
    slug: "table",
    description: "This is a very large custom made dinning room table.",
    stats: returnStats("table"),
    price: "$999.99",
    stripe_link: "",
    price_id: "",
  },
  {

    title: "Walnut Bookself",
    slug: "walnut-bookself",
    description: "Live edge walnut bookself.",
    stats: returnStats("walnut-bookself"),
    price: "$499.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Cherry Bench",
    slug: "cherry-bench",
    description: "A cherry bench that is made wood from our yard.",
    stats: returnStats("cherry-bench"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Basket Stand",
    slug: "basket-stand",
    description: "A cherry bench that is made wood from our yard.",
    stats: returnStats("basket-stand"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Live Edge Coffee Table",
    slug: "first-live-edge",
    description: "A cherry bench that is made wood from our yard.",
    stats: returnStats("first-live-edge"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Small End Table",
    slug: "small-bookself",
    description: "A cherry bench that is made wood from our yard.",
    stats: returnStats("small-bookself"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Medium End Table",
    slug: "end-table",
    description: "A cherry bench that is made wood from our yard.",
    stats: returnStats("end-table"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Island",
    slug: "island",
    description: "A cherry bench that is made wood from our yard.",
    stats: returnStats("island"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Pine Bench",
    slug: "pine-bench",
    description: "A cherry bench that is made wood from our yard.",
    stats: returnStats("pine-bench"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "First Box",
    slug: "first-box",
    description: "The first box I made.",
    stats: returnStats("first-box"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Meg's Bench",
    slug: "megs-bench",
    description: "A bench I made for Meg.",
    stats: returnStats("megs-bench"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Milling",
    slug: "milling",
    description: "",
    stats: returnStats("milling"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "TV Stand",
    slug: "tv-stand",
    description: "",
    stats: returnStats("tv-stand"),
    price: "$299.99",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "First Cajon",
    slug: "first-cajon",
    description: "",
    stats: returnStats("first-cajon"),
    price: "",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Catan Boardgame",
    slug: "catan",
    description: "",
    stats: returnStats("catan"),
    price: "",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Guitar Holders",
    slug: "guitar-holders",
    description: "",
    stats: returnStats("guitar-holders"),
    price: "",
    stripe_link: "",
    price_id: "",
  },
  {
    title: "Ben's First Table",
    slug: "bens-table",
    description: "",
    stats: returnStats("bens-table"),
    price: "",
    stripe_link: "",
    price_id: "",
  },
  // {
  //   title: "SE17 Mini excavator",
  //   slug: "se17-mini-excavator",
  //   description:
  //     "This is a SE17 Mini excavator. It has a 14 hp engine. These are solid machines perfect for a landscaper, electrician, or a plumber looking to make some extra money. Possibly even a land owner who doesn't want to mess with an overpriced Tractor Loader Backhoe. For digging you can NOT beat an excavator. These machines will dig trenches, stumps, gardens, or anything you can throw at it.\n\n \
  //   These are simple reliable machines however when needed, accessing spare parts for these machines is not an issue. As they are covered under a manufacturer 2 year powertrain warranty. As a dealer I can have ANY spare part sourced directly from the manufacturer.",
  //   stats: returnStats("se17-mini-excavator"),
  //   price: "$7999.99",
  //   stripe_link: "",
  //   price_id: "",
  // },
];

function returnStats(slug: string) {
  const map = new Map();
  let text = data[`/src/lib/table_data/${slug}.csv`];
  let lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const [key, value] = lines[i].split(",");
    map.set(key, value);
  }
  return map;
}

// Convert from the ProductData interface to the Product class
export const products: Product[] = [];
export const productsBySlug: Map<string, Product> = new Map();
for (const product of productsData) {
  const p = new Product(product);
  products.push(p);
  productsBySlug.set(p.slug, p);
}
