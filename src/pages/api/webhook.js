// This is the backend stuff to be interacted with firebase.
import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// secure a connection to FIREBASE from the backend
const serviceAccount = require('../../../permissions.json');  // to communicate with the firebase.
const app = !admin.apps.length     //to avoid double initialization we do it in this way
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      }) : admin.app();  // if it was already initialized we use this

//Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;  // this key was used while listening to events in stripe.

const fulfillOrder = async (session) => {
    console.log('Fulfilling order', session);

    return app.firestore().collection("users").doc(session.metadata.email).collection("orders").doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()

    })
    .then(() => {
        console.log(`SUCCESS: Order ${session.id} had been added to the DB`)
    })
};

export default async (req, res) => {
      //In next.js we check Http methods in this way but in express.js we use app.get or app.post all these.
    if(req.method === 'POST') {
      const requestBuffer = await buffer(req);
      const payload = requestBuffer.toString();
      const sig = req.headers["stripe-signature"];

      let event;

      //verify that the Event occurred or posted came from stripe
      try {
          event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
      } catch (err) {
          console.log('ERROR', err.message)
          return res.status(400).send(`Webhook error: ${err.message}`)
      }

      // Handle the checkout.session.completed event
      if(event.type === 'checkout.session.completed') {
          const session = event.data.object;

          console.log("session data:", session);

          //Fulfill the order...
          return fulfillOrder(session)
           .then(() => res.status(200))
           .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
      }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};