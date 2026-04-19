const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    name: "Classic Denim Jacket",
    price: 1999,
    category: "Men",
    image: "https://m.media-amazon.com/images/I/71li-ujtlUL._UY741_.jpg",
    rating: 4.5,
    description: "Premium quality denim jacket perfect for casual wear"
  },
  {
    name: "Running Shoes",
    price: 1899,
    category: "Men",
    image: "https://m.media-amazon.com/images/I/61utX8kBDlL._UY695_.jpg",
    rating: 4.2,
    description: "Comfortable running shoes with advanced cushioning"
  },
  {
    name: "Evening Dress",
    price: 3499,
    category: "Women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    rating: 4.7,
    description: "Elegant evening dress for special occasions"
  },
  {
    name: "Designer Handbag",
    price: 999,
    category: "Women",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    rating: 4.1,
    description: "Stylish designer handbag with premium leather"
  },
  {
    name: "Kids T-Shirt",
    price: 299,
    category: "Children",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400",
    rating: 4.3,
    description: "Comfortable cotton t-shirt for kids"
  },
  {
    name: "Kids Sneakers",
    price: 779,
    category: "Children",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    rating: 4.0,
    description: "Durable and stylish sneakers for active kids"
  },
  {
    name: "Winter Sweater",
    price: 899,
    category: "Men",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    rating: 4.6,
    description: "Warm wool sweater for winter season"
  },
  {
    name: "Summer Dress",
    price: 1299,
    category: "Women",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
    rating: 4.4,
    description: "Light and breezy summer dress"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerceDB");
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    await Product.insertMany(products);
    console.log("Seeded database with products");

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

seedDatabase();