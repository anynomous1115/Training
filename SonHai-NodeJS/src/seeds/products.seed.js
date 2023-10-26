require("dotenv").config();
const Product = require("../models/products.model");
const products = [
  {
    productName: "A Beautiful Sweater For Women",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/01_1920x.png?v=1640740769",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/17097755_37_D8_720x.png?v=1640740769",
    disCount: 25,
    originalPrice: 77,
    colors: ["#808000", "#ffffff"],
    sizes: ["M", "L", "XL"],
  },
  {
    productName: "A Fashionable Crossbody Bag",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/05_1920x.png?v=1640740761",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/17035136_37_720x.png?v=1640740761",
    disCount: 0,
    originalPrice: 56,
    colors: ["#d2b48c", "#ffffff"],
    sizes: ["S", "M", "L"],
  },
  {
    productName: "Beautiful Earrings",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/b1_grande.png?v=1640740744",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/b2_720x.png?v=1640740744",
    disCount: 25,
    originalPrice: 87,
    colors: ["#daa520", "#ffe4e1", "#f4a460", "#fff5ee"],
    sizes: [],
  },
  {
    productName: "Boot Solar Wave Hiking",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/02_1920x.png?v=1640740756",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/021_720x.png?v=1640740756",
    disCount: 26,
    originalPrice: 432,
    colors: [],
    sizes: [],
  },
  {
    productName: "Cellucor Amino Acid",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/3.1_1920x.jpg?v=1667211881",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/3.2_540x.jpg?v=1667211881",
    disCount: 31,
    originalPrice: 98,
    colors: [],
    sizes: [],
  },
  {
    productName: "Check Structured Blazer",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/IMG_15_grande.png?v=1640740810",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/17095934_43_D2_360x.png?v=1640740810",
    disCount: 34,
    originalPrice: 66,
    colors: ["#8fbc8f", "#ffffff"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Evlution Nutrition BCAA5000",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/5.1_720x.jpg?v=1667212272",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/5.2_720x.jpg?v=1667212274",
    disCount: 31,
    originalPrice: 98,
    colors: [],
    sizes: [],
  },
  {
    productName: "Fashion Cat Eye Glasses",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/h2_1920x.png?v=1640740713",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/h3_360x.png?v=1640740713",
    disCount: 41,
    originalPrice: 54,
    colors: ["#cd5c5c", "#daa520", "#e9967a", "#fff8dc"],
    sizes: [],
  },
  {
    productName: "Fashion High Heels Boots",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/y1_grande.png?v=1640740693",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/y2_360x.png?v=1640740693",
    disCount: 30,
    originalPrice: 47,
    colors: [],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Fashion High Heels Shoes",
    image:
      "https://gougi-demo.myshopify.com/cdn/shop/products/87090532_07_D41_grande.png?v=1640740797",
    imageHover:
      "https://gougi-demo.myshopify.com/cdn/shop/products/87090532_071_360x.png?v=1640740797",
    disCount: 25,
    originalPrice: 289,
    colors: ["#b8860b", "#ffffff"],
    sizes: ["S", "M", "L"],
  },
];

const { connectDB } = require("../configs/database");
connectDB();

const importProductsData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importProductsData();
