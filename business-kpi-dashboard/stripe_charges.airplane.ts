import airplane from "airplane";

const stripe = require('stripe')(process.env.STRIPE_KEY);

export default airplane.task(
  {
    slug: "stripe_charges",
    name: "Stripe Charges",
  },
  // This is your task's entrypoint. When your task is executed, this
  // function will be called.
  async () => {
    const charges = await stripe.charges.list({
      limit: 10, // Number of charges to retrieve, adjust as per your requirements
      status: 'succeeded',
    });

    let formattedData = charges.data.map(item => {
      return {
        Amount: '$' + (item.amount / 100).toFixed(2),
        Description: item.description,
        Status: item.status
      }
    });

    return formattedData;
  }
);
