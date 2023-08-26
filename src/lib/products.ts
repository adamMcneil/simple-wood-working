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
    title: "Camera Lens",
    slug: "camera-lens",
    description:
      "This incredibly compact and lightweight ultra-wide-angle 11mm APS-C prime offers dynamic perspectives, corner-to-corner sharpness, naturally rendered bokeh and large F1.8 aperture. Fast, precise, quiet AF, optical design for refined movies shooting and rugged reliability make it ideal for still and video content creators alike.",
    stats: new Map<string, string>([
      ["Brand", "Sigma"],
      ["Focal Length Description", "Standard Zoom"],
      ["Lens Type", "Standard"],
      ["Compatible Mountings", "Sony E"],
      ["Camera Lens Description", "70 mm"],
    ]),
    price: "$1400.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "",
  },
  {
    title: "Coffee",
    slug: "coffee",
    description: "some description",
    stats: new Map(),
    price: "$14.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "",
  },
  {
    title: "Coffee and Cookies",
    slug: "coffee-and-cookies",
    description: "some description",
    stats: new Map(),
    price: "$9.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "",
  },
  {
    title: "Desk",
    slug: "desk",
    description: "some description",
    stats: new Map(),
    price: "$9.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "price_1NF75PKfjLwasDeg0CcLJ6FL",
  },
  {
    title: "Dice",
    slug: "dice",
    description: "some description",
    stats: new Map(),
    price: "$9.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "price_1NF72WKfjLwasDeg0HPAXnmX",
  },
  {
    title: "Top",
    slug: "top",
    description: "some description",
    stats: new Map(),
    price: "$9.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "",
  },
  {
    title: "Travel Cup #1",
    slug: "travel-cup",
    description: "some description",
    stats: new Map(),
    price: "$9.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "",
  },
  {
    title: "Type Writer",
    slug: "type-writer",
    description: "some description",
    stats: new Map(),
    price: "$9.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "",
  },
  {
    title: "SE17 Mini excavator",
    slug: "se17-mini-excavator",
    description:
      "This is a SE17 Mini excavator. It has a 14 hp engine. These are solid machines perfect for a landscaper, electrician, or a plumber looking to make some extra money. Possibly even a land owner who doesn't want to mess with an overpriced Tractor Loader Backhoe. For digging you can NOT beat an excavator. These machines will dig trenches, stumps, gardens, or anything you can throw at it.\n\n \
    These are simple reliable machines however when needed, accessing spare parts for these machines is not an issue. As they are covered under a manufacturer 2 year powertrain warranty. As a dealer I can have ANY spare part sourced directly from the manufacturer.",

    stats: returnStats("se17-mini-excavator"),
    price: "$7999.99",
    stripe_link: "https://buy.stripe.com/test_4gwaET12p1nZ6kM5kk",
    price_id: "",
  },
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
