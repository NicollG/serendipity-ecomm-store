import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe.apply(process.env.NEXT_PUBLIC_STRIPE_API_KEY)


export async function initiateCheckOut() {
    console.log('CheckOut!')
}