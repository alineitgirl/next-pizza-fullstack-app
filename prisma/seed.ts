import prisma from "@/lib/prisma";
import { hashSync } from "bcrypt";
import { categories, ingredients, products } from "./constants";
import { Prisma } from "@/lib/generated/prisma/browser";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};
  

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Test",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizzaPepperoni = await prisma.product.create({
    data: {
      name: "Пепперони Фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:760x760/0198bf57bc517218ab93c762f4b0193e.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizzaCheese = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/0198bf40eb1171aabe90b1b3ce07c0c5.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizzaChoriso = await prisma.product.create({
    data: {
      name: "Четыре сезона",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/0198bf47733e787a98ed55d13e9a2251.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      

      generateProductItem({ productId: pizzaPepperoni.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizzaPepperoni.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizzaPepperoni.id, pizzaType: 2, size: 40 }),

      
      generateProductItem({ productId: pizzaCheese.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizzaCheese.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizzaCheese.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizzaCheese.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizzaCheese.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizzaCheese.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizzaChoriso.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizzaChoriso.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizzaChoriso.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '111111'
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222'
      }
    ]
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productItemId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1}, { id: 2}, { id: 3}],
      }
    }
  });

}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
