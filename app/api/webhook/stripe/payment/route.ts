import { getUserFromDatabase } from "@/lib/userAction";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET as string);

interface Product {
  title: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  id: string;
  quantity: number;
}

export const POST = async (request: NextRequest) => {
  try {
    const { cartItems, country } = await request.json();
    console.log("Received products:", cartItems);
    console.log("Received country:", country);

    const zoneA = [
      "AT",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MT",
      "NL",
      "PL",
      "PT",
      "RO",
      "SK",
      "SI",
      "ES",
      "SE",
      "CH",
      "GB",
    ];
    const zoneB = [
      "AM",
      "AL",
      "DZ",
      "AZ",
      "BY",
      "BA",
      "GE",
      "IS",
      "MK",
      "MA",
      "MD",
      "ME",
      "NO",
      "RS",
      "TN",
      "TR",
      "UA",
    ];
    const zoneOutremer1 = ["GP", "MQ", "RE", "GF", "YT", "PM", "MF", "BL"];
    const zoneOutremer2 = ["NC", "PF", "WF", "TF"];

    let totalWeight = 0;
    cartItems.forEach((item: any) => {
      totalWeight += item.product.weight * item.quantity;
    });

    const { userId } = await auth();

    /*if (!userId) {
    redirect("/");
  }*/

    const user = await getUserFromDatabase(userId!); // Get from YOUR DB (again, now with stripeCustomerId)
    if (!user?.email) {
      throw new Error("User not authenticated");
    }

    const customer = await stripe.customers.create({ email: user.email });
    console.log("Customer created:", customer);

    console.log("cartItems", cartItems);

    const lineItems = cartItems.map((product: any) => {
      const amountInCents = Math.round(product.product.price * 100);
      if (amountInCents < 50) {
        throw new Error(
          `The price of ${product.product.title} is too low, must be at least 0.50 in your currency.`
        );
      }
      return {
        quantity: product.quantity,
        price_data: {
          product_data: {
            name: product.product.title,
            description: product.product.description,
            images: [product.product.images[0]],
          },
          currency: "EUR",
          unit_amount: amountInCents,
        },
      };
    });
    let checkOutSession;
    if (country === "FR" && totalWeight <= 500) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["FR"], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 700,
                currency: "eur",
              },
              display_name: "Livraison en France",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (country === "FR" && totalWeight <= 1000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["FR"], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 880,
                currency: "eur",
              },
              display_name: "Livraison en France moins de 1kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (country === "FR" && totalWeight <= 2000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["FR"], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1015,
                currency: "eur",
              },
              display_name: "Livraison en France moins de 2kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (country === "FR" && totalWeight <= 5000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["FR"], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1560,
                currency: "eur",
              },
              display_name: "Livraison en France moins de 5kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (country === "FR" && totalWeight <= 10000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["FR"], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 2270,
                currency: "eur",
              },
              display_name: "Livraison en France moins de 10kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (country === "FR" && totalWeight <= 15000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["FR"], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 2870,
                currency: "eur",
              },
              display_name: "Livraison en France moins de 15kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (country === "FR" && totalWeight <= 30000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["FR"], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 3555,
                currency: "eur",
              },
              display_name: "Livraison en France moins de 30kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneA.includes(country) && totalWeight <= 500) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1425, // 20€ en cents
                currency: "eur",
              },
              display_name:
                "Livraison dans l'Union Européenne + Suisse moins de 0.5 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneA.includes(country) && totalWeight <= 1000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1760, // 20€ en cents
                currency: "eur",
              },
              display_name:
                "Livraison dans l'Union Européenne + Suisse moins de 1 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneA.includes(country) && totalWeight <= 2000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1995, // 20€ en cents
                currency: "eur",
              },
              display_name:
                "Livraison dans l'Union Européenne + Suisse moins de 2 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneA.includes(country) && totalWeight <= 5000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 2550,
                currency: "eur",
              },
              display_name:
                "Livraison dans l'Union Européenne + Suisse moins de 5 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneA.includes(country) && totalWeight <= 10000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 4205,
                currency: "eur",
              },
              display_name:
                "Livraison dans l'Union Européenne + Suisse moins de 10 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneA.includes(country) && totalWeight <= 15000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 6180,
                currency: "eur",
              },
              display_name:
                "Livraison dans l'Union Européenne + Suisse moins de 15 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneA.includes(country) && totalWeight <= 30000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 8005,
                currency: "eur",
              },
              display_name:
                "Livraison dans l'Union Européenne + Suisse moins de 30 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneB.includes(country) && totalWeight <= 500) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 2140,
                currency: "eur",
              },
              display_name: "Livraison Zone B moins de 0.5 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneB.includes(country) && totalWeight <= 1000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 2555, // 20€ en cents
                currency: "eur",
              },
              display_name: "Livraison Zone B moins de 1 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneB.includes(country) && totalWeight <= 2000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 2795, // 20€ en cents
                currency: "eur",
              },
              display_name: "Livraison Zone B moins de 2 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneB.includes(country) && totalWeight <= 5000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 3590,
                currency: "eur",
              },
              display_name: "Livraison Zone B moins de 5 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneB.includes(country) && totalWeight <= 10000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 5940,
                currency: "eur",
              },
              display_name: "Livraison Zone B moins de 10 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneB.includes(country) && totalWeight <= 15000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 8060,
                currency: "eur",
              },
              display_name: "Livraison Zone B moins de 15 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneB.includes(country) && totalWeight <= 20000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 9855,
                currency: "eur",
              },
              display_name: "Livraison Zone B moins de 20 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer1.includes(country) && totalWeight <= 500) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1265,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 0.5 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer1.includes(country) && totalWeight <= 1000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 2000,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 1 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer1.includes(country) && totalWeight <= 2000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 2725, // 20€ en cents
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 2 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer1.includes(country) && totalWeight <= 5000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 4095,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 5 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer1.includes(country) && totalWeight <= 10000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 6560,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 10 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer1.includes(country) && totalWeight <= 15000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 13705,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 15 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer1.includes(country) && totalWeight <= 30000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 15055,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 30 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer2.includes(country) && totalWeight <= 500) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1285,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 0.5 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer2.includes(country) && totalWeight <= 1000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1995,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 1 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer2.includes(country) && totalWeight <= 2000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 3525, // 20€ en cents
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 2 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer2.includes(country) && totalWeight <= 5000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 5890,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 5 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer2.includes(country) && totalWeight <= 10000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 11535,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 10 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer2.includes(country) && totalWeight <= 15000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 26315,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 15 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else if (zoneOutremer2.includes(country) && totalWeight <= 30000) {
      checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Méthodes de paiement acceptées
        customer: customer.id,
        mode: "payment", // Mode de paiement unique
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country], // Liste des pays de l'Union Européenne
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 30235,
                currency: "eur",
              },
              display_name: "Livraison Zone Outremer moins de 30 kg",
            },
          },
        ],
        customer_update: {
          address: "auto",
          name: "auto",
        },

        success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
        line_items: lineItems,
      });
    } else {
      if (totalWeight <= 500) {
        checkOutSession = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], // Méthodes de paiement acceptées
          customer: customer.id,
          mode: "payment", // Mode de paiement unique
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: [country], // Liste des pays de l'Union Européenne
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 3160,
                  currency: "eur",
                },
                display_name: "Livraison Zone C",
              },
            },
          ],
          customer_update: {
            address: "auto",
            name: "auto",
          },

          success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
          cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
          line_items: lineItems,
        });
      } else if (totalWeight <= 1000) {
        checkOutSession = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], // Méthodes de paiement acceptées
          customer: customer.id,
          mode: "payment", // Mode de paiement unique
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: [country], // Liste des pays de l'Union Européenne
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 3515,
                  currency: "eur",
                },
                display_name: "Livraison Zone C, moins de 1kg",
              },
            },
          ],
          customer_update: {
            address: "auto",
            name: "auto",
          },

          success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
          cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
          line_items: lineItems,
        });
      } else if (totalWeight <= 2000) {
        checkOutSession = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], // Méthodes de paiement acceptées
          customer: customer.id,
          mode: "payment", // Mode de paiement unique
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: [country], // Liste des pays de l'Union Européenne
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 4850,
                  currency: "eur",
                },
                display_name: "Livraison Zone C, moins de 2kg",
              },
            },
          ],
          customer_update: {
            address: "auto",
            name: "auto",
          },

          success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
          cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
          line_items: lineItems,
        });
      } else if (totalWeight <= 5000) {
        checkOutSession = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], // Méthodes de paiement acceptées
          customer: customer.id,
          mode: "payment", // Mode de paiement unique
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: [country], // Liste des pays de l'Union Européenne
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 7080, // 20€ en cents
                  currency: "eur",
                },
                display_name: "Livraison Zone C, moins de 5kg",
              },
            },
          ],
          customer_update: {
            address: "auto",
            name: "auto",
          },

          success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
          cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
          line_items: lineItems,
        });
      } else if (totalWeight <= 10000) {
        checkOutSession = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], // Méthodes de paiement acceptées
          customer: customer.id,
          mode: "payment", // Mode de paiement unique
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: [country], // Liste des pays de l'Union Européenne
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 13380, // 20€ en cents
                  currency: "eur",
                },
                display_name: "Livraison Zone C, moins de 10kg",
              },
            },
          ],
          customer_update: {
            address: "auto",
            name: "auto",
          },

          success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
          cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
          line_items: lineItems,
        });
      } else if (totalWeight <= 15000) {
        checkOutSession = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], // Méthodes de paiement acceptées
          customer: customer.id,
          mode: "payment", // Mode de paiement unique
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: [country], // Liste des pays de l'Union Européenne
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 19015, // 20€ en cents
                  currency: "eur",
                },
                display_name: "Livraison Zone C, moins de 15kg",
              },
            },
          ],
          customer_update: {
            address: "auto",
            name: "auto",
          },

          success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
          cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
          line_items: lineItems,
        });
      } else {
        checkOutSession = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], // Méthodes de paiement acceptées
          customer: customer.id,
          mode: "payment", // Mode de paiement unique
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: [country], // Liste des pays de l'Union Européenne
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 23180, // 20€ en cents
                  currency: "eur",
                },
                display_name: "Livraison Zone C, moins de 20kg",
              },
            },
          ],
          customer_update: {
            address: "auto",
            name: "auto",
          },

          success_url: `${process.env.DOMAIN_URL}/dashboard/payment/success`, // URL de succès
          cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment/cancel`, // URL d'annulation
          line_items: lineItems,
        });
      }
    }

    console.log("Checkout session created:", checkOutSession.url);

    // Retourner une réponse JSON avec l'URL de la session de paiement
    return NextResponse.json(
      { msg: checkOutSession, url: checkOutSession.url },
      { status: 200 }
    );
  } catch (error: any) {
    // Gestion des erreurs et retour d'une réponse JSON avec le message d'erreur
    console.error("Error occurred:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

/*

shipping_address_collection:{
                  allowed_countries: ['FR']
                },
                shipping_options: [
                  {
                    shipping_rate_data: {
                      type: 'fixed_amount',
                      fixed_amount: {
                        amount: 100,
                        currency: 'eur',
                      },
                      display_name: 'Zone France',

                    }
                  }
                ],

                */
