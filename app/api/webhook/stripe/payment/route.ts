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
              images: [product.product.image],
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
                customer_update: {
                    address: 'auto',
                    name: 'auto',
                },
                payment_intent_data: {
                    shipping: {
                        name: 'required',
                        address: {
                            line1: 'required',
                            line2: 'Adress Line 2',
                            city: 'City',
                            country: 'Country',
                            postal_code: 'string',
                        },
                    },
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
