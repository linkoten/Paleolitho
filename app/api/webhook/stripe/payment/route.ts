import { getUser } from '@/lib/actionsUsers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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
      const products: any = await request.json();
      console.log("Received products:", products);
  
      const user = await getUser();
      if (!user?.email) {
        throw new Error('User not authenticated');
      }
  
      const customer = await stripe.customers.create({ email: user.email });
      console.log('Customer created:', customer);
  
      const lineItems = products.map((product: any) => {
        const amountInCents = Math.round(product.product.price * 100);
        if (amountInCents < 50) {
          throw new Error(`The price of ${product.title} is too low, must be at least 0.50 in your currency.`);
        }
        return {
          quantity: product.quantity,
          price_data: {
            product_data: {
              name: product.product.title,
              description: product.product.description,
              images: [product.product.images[0]],
            },
            currency: 'EUR',
            unit_amount: amountInCents,
          },
        };
      });

        const checkOutSession = await stripe.checkout.sessions.create(
            {
                
                payment_method_types: ['card'], // Méthodes de paiement acceptées
                customer: customer.id,
                mode: 'payment', // Mode de paiement unique
                billing_address_collection: 'required',
                shipping_address_collection: {
                  allowed_countries: [ 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'], // Liste des pays de l'Union Européenne
                },
                shipping_options: [
                  
                  {
                    shipping_rate_data: {
                      type: 'fixed_amount',
                      fixed_amount: {
                        amount: 1000, // 10€ en cents
                        currency: 'eur',
                      },
                      display_name: 'Livraison en France',
                      delivery_estimate: {
                        minimum: {
                          unit: 'business_day',
                          value: 3,
                        },
                        maximum: {
                          unit: 'business_day',
                          value: 5,
                        },
                      },
                    },
                  },
                  {
                    shipping_rate_data: {
                      type: 'fixed_amount',
                      fixed_amount: {
                        amount: 2000, // 20€ en cents
                        currency: 'eur',
                      },
                      display_name: 'Livraison dans l\'Union Européenne',
                      delivery_estimate: {
                        minimum: {
                          unit: 'business_day',
                          value: 5,
                        },
                        maximum: {
                          unit: 'business_day',
                          value: 10,
                        },
                      },
                    },
                  },
                ],
                customer_update: {
                    address: 'auto',
                    name: 'auto',
                },
                
                success_url:
                    'http://localhost:3000/dashboard/payment/success', // URL de succès
                cancel_url:
                    'http://localhost:3000/dashboard/payment/cancel', // URL d'annulation
                    line_items: lineItems,

                    });

        console.log('Checkout session created:', checkOutSession.url);

        

        // Retourner une réponse JSON avec l'URL de la session de paiement
        return NextResponse.json(
            { msg: checkOutSession, url: checkOutSession.url },
            { status: 200 }
        );
    } catch (error: any) {
        // Gestion des erreurs et retour d'une réponse JSON avec le message d'erreur
        console.error('Error occurred:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
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