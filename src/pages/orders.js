import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import db from "../../firebase";
import moment from "moment";
import Order from "../components/Order";

function orders({orders}) {     // here orders prop object comes from server side render
const{data: session} = useSession();

console.log("orders are:", orders);

    return (
        <div>
            <Head>
            <title>Success Page</title>
                <link rel = "icon" href = "https://icons.iconarchive.com/icons/bokehlicia/pacifica/96/amazon-icon.png" type = "image/  x-icon">
                </link>
            </Head>

            <Header />

            <main className="max-w-screen-lg mx-auto p-10">
              <h1 className="text-3xl border-b pb-1 mb-2 border-yellow-400">Your Orders</h1>
              
              {session ? (
                  <h2 className="font-medium">{orders.length} Orders</h2>
              ) : (
                  <h2>Please sign in to see your orders</h2>
              )}

              <div className="mt-5 space-y-4">
                  {orders?.map(
                    ({ id, amount, amountShipping, items, timestamp, images }
                    ) => (
                      <Order
                        key={id}
                        id={id}
                        amount={amount}
                        amountShipping={amountShipping}
                        items={items}
                        images={images}
                        timestamp={timestamp}
                      />
                    )
                 )}
              </div>
            </main>

        </div>
    )
}

export default orders;

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    // Get the users logged in credentials..
    const session = await getSession(context);

    if(!session) {
        return {
            props: {},
        };
    }

    // Firebase DB
    const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timestamp','desc')
    .get();
    
    // Stripe Orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async(order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (                                            // So we're gonna fetch some info's and access it and it's asynchronous
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    );

    return { props: {orders, session } }
}