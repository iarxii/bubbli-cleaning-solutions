import React from "react";
import { useNavigate } from "react-router-dom";

function Subscribe() {
  const navigate = useNavigate();

  const subscriptionTiers = [
    {
      title: "Community (Free)",
      offers: [
        "Access to Bubbli discount points (1 point per item)",
        "Cleaning tips and newsletter",
        "Community rewards giveaways",
      ],
      currencySymbol: "R",
      subscriptionCost: 0.0,
      callToAction: "Sign Up",
      ctaLink: "/clients/signup",
    },
    {
      title: "Monthly Supporter (Starter)",
      offers: [
        "Access to Free offers",
        "Free delivery for checkout over R300",
        "We deliver the Clean Home Savings Pack to you every month",
      ],
      currencySymbol: "R",
      subscriptionCost: 180.00,
      callToAction: "Join Today",
      ctaLink: "/admin/onboard/client/starter",
    },
    {
      title: "3-Month Premium",
      offers: [
        "Access to Free tier offers",
        "Pay every 3-months",
        "Free Delivery on checkout (any amount of items)",
        "Double points obtained on each purchase (1 point per item x2)",
        "We deliver the 3-Month Bundle Savings Pack every 3-Months",
        "✨Bonus: Once-Off Cooking Apron & Cleaning Gloves",
      ],
      currencySymbol: "R",
      subscriptionCost: 350.00,
      callToAction: "Join Today",
      ctaLink: "/admin/onboard/client/premium",
    },
  ];

  return (
    <div className="mx-auto p-4 text-black">
      {/* Hero Section */}
      <section className="bubbli-pink-slant-gradient-dark mb-6 rounded-xl p-5 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-white">
          Subscription Tiers
        </h1>
        <p className="mb-6 text-white">
          Choose the best plan that suits your needs and enjoy exclusive
          benefits!
        </p>
        <div className="flex flex-wrap justify-center gap-0">
          {subscriptionTiers.map((tier, index) => (
            <div key={index} className="w-full p-4 md:w-1/3z">
              <div className="rounded-2xl bg-white p-5 shadow-md">
                {/* subs tier title */}
                <h2 className="mb-4 text-2xl font-semibold text-[#FB6F92]">
                  {tier.title}
                </h2>
                {/* subs cost */}
                <p className="text-center mb-4 font-bold">
                  Subscription Cost: {tier.currencySymbol}{" "}
                  {tier.subscriptionCost}
                </p>
                {/* offers list */}
                <ol className="text-left mb-4">
                  {tier.offers.map((offer, idx) => (
                    <li key={idx} className="mb-4">
                      {idx+1}. {offer}
                    </li>
                  ))}
                </ol>
                {/* cta button */}
                <button
                  onClick={() => {
                    navigate(tier.ctaLink);
                  }}
                  className="mt-2"
                >
                  {tier.callToAction}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Subscribe;
