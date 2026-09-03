
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

import {
  UserRole,
  PropertyStatus,
  RentalRequestStatus,
  PaymentProvider,
  PaymentStatus,
  PaymentMethod,
} from "./generated/prisma/client";

import prisma from "../src/lib/prisma";

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // =========================
  // USERS
  // =========================

  const [landlord1, landlord2, tenant1, tenant2, admin] =
    await Promise.all([
      prisma.user.create({
        data: {
          name: "Rahim Ahmed",
          email: "rahim.ahmed@gmail.com",
          password,
          role: UserRole.LANDLORD,
        },
      }),

      prisma.user.create({
        data: {
          name: "Karim Hasan",
          email: "karim.hasan@gmail.com",
          password,
          role: UserRole.LANDLORD,
        },
      }),

      prisma.user.create({
        data: {
          name: "Nusrat Jahan",
          email: "nusrat.jahan@gmail.com",
          password,
          role: UserRole.TENANT,
        },
      }),

      prisma.user.create({
        data: {
          name: "Tanvir Hossain",
          email: "tanvir.hossain@gmail.com",
          password,
          role: UserRole.TENANT,
        },
      }),

      prisma.user.create({
        data: {
          name: "Admin User",
          email: "admin@rentnest.com",
          password,
          role: UserRole.ADMIN,
        },
      }),
    ]);

  console.log("Created 5 users");

  // =========================
  // CATEGORIES
  // =========================

  const [apartment, house, studio] = await Promise.all([
    prisma.category.create({
      data: {
        name: "Apartment",
      },
    }),

    prisma.category.create({
      data: {
        name: "House",
      },
    }),

    prisma.category.create({
      data: {
        name: "Studio",
      },
    }),
  ]);

  console.log("Created 3 categories");

  // =========================
  // PROPERTIES
  // =========================

  const property1 = await prisma.property.create({
    data: {
      title: "Modern Family Apartment",
      description:
        "A comfortable modern apartment in a convenient residential area.",
      location: "Gulshan, Dhaka",
      price: 45000,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["WiFi", "Parking", "Balcony"],
      images: ["apartment1.jpg", "apartment2.jpg"],
      status: PropertyStatus.AVAILABLE,
      landlordId: landlord1.id,
      categoryId: apartment.id,
    },
  });

  const property2 = await prisma.property.create({
    data: {
      title: "Spacious Family House",
      description:
        "A spacious house suitable for a family with a peaceful environment.",
      location: "Mirpur, Dhaka",
      price: 35000,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ["Parking", "Garden", "Security"],
      images: ["house1.jpg", "house2.jpg"],
      status: PropertyStatus.AVAILABLE,
      landlordId: landlord2.id,
      categoryId: house.id,
    },
  });

  const property3 = await prisma.property.create({
    data: {
      title: "Cozy Studio Apartment",
      description:
        "A compact and affordable studio apartment for comfortable living.",
      location: "Banani, Dhaka",
      price: 25000,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Furnished"],
      images: ["studio1.jpg"],
      status: PropertyStatus.AVAILABLE,
      landlordId: landlord1.id,
      categoryId: studio.id,
    },
  });

  console.log("Created 3 properties");

  // =========================
  // RENTAL REQUESTS
  // =========================

  const rentalRequest1 = await prisma.rentalRequest.create({
    data: {
      tenantId: tenant1.id,
      propertyId: property1.id,
      status: RentalRequestStatus.COMPLETED,
      message: "I would like to rent this apartment.",
    },
  });

  const rentalRequest2 = await prisma.rentalRequest.create({
    data: {
      tenantId: tenant2.id,
      propertyId: property2.id,
      status: RentalRequestStatus.PENDING,
      message: "I am interested in renting this property.",
    },
  });

  const rentalRequest3 = await prisma.rentalRequest.create({
    data: {
      tenantId: tenant1.id,
      propertyId: property3.id,
      status: RentalRequestStatus.REJECTED,
      message: "I would like to rent this studio.",
    },
  });

  console.log("Created 3 rental requests");

  // =========================
  // PAYMENTS
  // =========================

  await prisma.payment.create({
    data: {
      transactionId: randomUUID(),
      rentalRequestId: rentalRequest1.id,
      amount: property1.price,
      method: PaymentMethod.CARD,
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.COMPLETED,
      paidAt: new Date(),
    },
  });

  await prisma.payment.create({
    data: {
      transactionId: randomUUID(),
      rentalRequestId: rentalRequest3.id,
      amount: property3.price,
      method: PaymentMethod.MOBILE_BANKING,
      provider: PaymentProvider.SSLCOMMERZ,
      status: PaymentStatus.FAILED,
    },
  });

  console.log("Created 2 payments");

  // =========================
  // REVIEW
  // =========================

  await prisma.review.create({
    data: {
      tenantId: tenant1.id,
      propertyId: property1.id,
      rentalRequestId: rentalRequest1.id,
      rating: 5,
      comment: "Very good property and a great rental experience.",
    },
  });

  console.log("Created 1 review");

  console.log("Seed finished successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

