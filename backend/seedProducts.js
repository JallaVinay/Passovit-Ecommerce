require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Comfortable cotton t-shirt perfect for daily wear.",
    price: 499,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764427898/cab3a96e-992f-476d-9c4d-c3de90a39590.png",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50
  },
  {
    name: "Blue Denim Jeans",
    description: "Slim fit jeans with stretchable denim material.",
    price: 1299,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764427997/97dc1a94-f808-49ab-b35f-aba697ad21df.png",
    category: "Men",
    sizes: ["30", "32", "34", "36"],
    stock: 40
  },
  {
    name: "Red Hoodie",
    description: "Warm fleece hoodie for winter comfort.",
    price: 1499,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428085/545bc3db-95fb-4ff5-8929-70014e9aa26a.png",
    category: "Unisex",
    sizes: ["M", "L", "XL"],
    stock: 30
  },
  {
    name: "Black Joggers",
    description: "Soft and stylish joggers for casual wear.",
    price: 899,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428123/63191b7e-6bd7-478c-b953-c6fc2af218fc.png",
    category: "Men",
    sizes: ["S", "M", "L"],
    stock: 45
  },
  {
    name: "Floral Summer Dress",
    description: "Lightweight and breathable dress for summer.",
    price: 1599,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428169/e5019d95-527a-478e-941b-9c20a29bd3ea.png",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25
  },
  {
    name: "Black Leather Jacket",
    description: "Premium faux leather jacket with zipper pockets.",
    price: 2499,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428206/33f26698-1076-4ddf-baa4-ab696242f568.png",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 15
  },
  {
    name: "Green Oversized T-Shirt",
    description: "Trendy and comfortable oversized t-shirt.",
    price: 699,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428242/b7c1012f-fd7a-4b59-9e93-df2fa4d51819.png",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 60
  },
  {
    name: "Pink Sweatshirt",
    description: "Cozy sweatshirt for daily comfort.",
    price: 1199,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428285/c89dba86-d602-4c91-8ec7-e301b6360a68.png",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 35
  },
  {
    name: "Cargo Pants",
    description: "Multi-pocket durable cargo pants.",
    price: 1399,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428315/5fa594aa-4bd1-4732-8e29-b750185d195c.png",
    category: "Men",
    sizes: ["30", "32", "34", "36"],
    stock: 50
  },
  {
    name: "White Sneakers",
    description: "Stylish sneakers suitable for any outfit.",
    price: 1699,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428381/cef4aa33-0f04-45a1-bbef-1913761bede6.png",
    category: "Unisex",
    sizes: ["6", "7", "8", "9", "10"],
    stock: 20
  },
  {
    name: "Blue Kurti",
    description: "Elegant kurti with minimal embroidery.",
    price: 899,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428421/7a051516-6638-4ab0-b69a-3abfacd67b1d.png",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 40
  },
  {
    name: "Men's Formal Shirt",
    description: "Cotton shirt suitable for office wear.",
    price: 1099,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428458/1967ce14-1a0e-48fc-9db0-35c024060536.png",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 35
  },
  {
    name: "Women's Leggings",
    description: "High-stretch leggings ideal for gym or casual wear.",
    price: 499,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428489/ad5ecff0-1182-40b3-b858-065c6ec2eb2f.png",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 65
  },
  {
    name: "Kids Yellow T-Shirt",
    description: "Soft cotton T-shirt for kids.",
    price: 399,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428526/a4b98b7b-c08a-4fc6-a877-ea69a8e788e5.png",
    category: "Kids",
    sizes: ["XS", "S", "M"],
    stock: 30
  },
  {
    name: "Kids Denim Shorts",
    description: "Comfortable denim shorts for boys and girls.",
    price: 499,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428573/57f8497b-f68e-47ab-854c-c91b3081c82b.png",
    category: "Kids",
    sizes: ["XS", "S", "M"],
    stock: 25
  },
  {
    name: "Winter Beanie",
    description: "Knitted beanie for winter warmth.",
    price: 299,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428612/369a2e66-a90c-4990-8d21-6f3e4f044cc0.png",
    category: "Accessories",
    sizes: ["Free Size"],
    stock: 70
  },
  {
    name: "Black Belt",
    description: "Durable black formal belt.",
    price: 599,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428671/c8fe41f9-6f11-41d4-af87-4bfbe7ab0b7d.png",
    category: "Accessories",
    sizes: ["Free Size"],
    stock: 40
  },
  {
    name: "Sports Cap",
    description: "Breathable sports cap for running.",
    price: 349,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428705/b050671d-fdff-4fda-88de-f1704fc858d0.png",
    category: "Accessories",
    sizes: ["Free Size"],
    stock: 50
  },
  {
    name: "Men's Track Jacket",
    description: "Lightweight track jacket for workouts.",
    price: 1299,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428738/390e7dee-6c36-470c-8140-edfcf0b2c7df.png",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 20
  },
  {
    name: "Women's Cardigan",
    description: "Soft knitted cardigan for winter.",
    price: 1499,
    image: "https://res.cloudinary.com/dwzpwhdho/image/upload/v1764428777/062cdc3d-6e4e-4080-88c5-968f70e3a93a.png",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 30
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    console.log("Mongo connected!");

    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("New products inserted");

    mongoose.connection.close();
    console.log("Seeding complete.");
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

seedProducts();
