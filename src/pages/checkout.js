import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems,selectTotal } from "../slices/basketSlice";
import { useSession } from "next-auth/react";
function checkout() {
    const items = useSelector(selectItems);    // items has the product id and details
    const total = useSelector(selectTotal);
    const {data: session} = useSession();
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

                     {items.map((item, i) => (
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

                <button disabled={true} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
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
