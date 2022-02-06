import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectCheckoutItems, selectTotal } from "../slices/basketSlice";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
    const Checkoutitems = useSelector(selectCheckoutItems);    // array having non-duplicated items.
    const items = useSelector(selectItems); // array having repeated items.
    const total = useSelector(selectTotal);
    const {data: session} = useSession();

    const createCheckoutSession = async () => {
      const stripe = await stripePromise; // if we do not use await operator it will return just a promise instead of the resolved one.

      // call the backend to create a checkout session..
      const checkoutSession = await axios.post('/api/create-checkout-session', 
      {            
        items: items,                               // These 2 props are the body
        email: session.user.email
      });

      // Redirect the user/customer to Stripe checkout
      const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id
      });

      if(result.error) {
        alert(result.error.message);  //A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
      }
    };

    return (
     <div className="bg-gray-300">
            
        <Head>
            <title>Checkout Page</title>
            <link rel = "icon" href = "https://icons.iconarchive.com/icons/bokehlicia/pacifica/96/amazon-icon.png" type = "image/x-icon">
            </link>
        </Head>

        <Header />

        <main className="lg:flex max-w-screen-2xl mx-auto">  
          {/* left section */}
            <div className="flex-grow m-5 shadow-sm">
                <Image 
                  src="https://links.papareact.com/ikj"
                  width={1020}
                  height={250} 
                  objectFit="contain"
                />

                <div className="flex flex-col space-y-10 p-10 bg-white">
                    <h1 className="text-3xl border-b pb-4">
                       {items.length === 0 
                         ? "Your Amazon Cart is empty."
                         : "Shopping Cart"}  
                    </h1>
                      {/* we'll map here from cart items */}

                     {Checkoutitems.map((item, i) => (
                       <CheckoutProduct
                          key={i}         
                          id={item.id}
                          title={item.title}
                          rating={item.rating}
                          price={item.price}
                          description={item.description}
                          category={item.category}
                          image={item.image}
                          hasPrime={item.hasPrime}
                          count={item.count}
                        />
                     ))}

                </div>
            </div>

          {/* right section */}
          <div className="flex flex-col bg-white p-10 shadow-md">
            {items.length > 0 && 
              <>
                 <h2 className="whitespace-nowrap">
                  Subtotal ({items.length} items):{" "}
                  <span className="font-bold">
                  <Currency quantity={total} currency="INR" />
                  </span>
                </h2>

                <button
                 role="link"
                 onClick={createCheckoutSession}
                 disabled={!session} 
                 className={`button mt-2 ${
                   !session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                   }`}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </button>
              </>
               
             
            } 
          </div>
        </main>
        </div>
    )
}
export default checkout;
