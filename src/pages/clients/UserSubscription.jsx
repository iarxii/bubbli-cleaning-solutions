import React from "react";
import { useNavigate } from "react-router-dom";

function UserSubscription() {
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
      subscriptionCost: 200.0,
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
      subscriptionCost: 400.0,
      callToAction: "Join Today",
      ctaLink: "/admin/onboard/client/premium",
    },
  ];

  const userSubscription = {
    tier: "Monthly Supporter (Starter)",
    renewalDate: "2025-03-01",
    subscriptionID: "bubbli_subs_id_000000000000000000000",
  };

  return (
    <div className="glassmorphic pb-4">
      {/* Hero Title */}
      <div className="z-10 mb-5 grid gap-y-4 bg-[#f7f7f7] p-10 text-center shadow-md">
        <h1 className="text-[#FB6F92]">Manage Your Subscription</h1>
        <p className="text-black">
          View and manage your current subscription plan.
        </p>
      </div>

      {/* Hero Section */}
      <section className="bubbli-pink-slant-gradient-dark mx-4 mt-6 rounded-xl p-5 text-center shadow-md">
        <div className="rounded-lg bg-white p-5 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-[#FB6F92]">
            Current Subscription: {userSubscription.tier}
          </h2>
          <p className="mb-4">
            Renewal Date:{" "}
            {new Date(userSubscription.renewalDate).toLocaleDateString()}
          </p>
          <button
            onClick={() => {
              navigate("/clients/manage-subscription");
            }}
            className="rounded-xl bg-[#FB6F92] px-4 py-2 text-white shadow-md"
          >
            Manage Subscription
          </button>
        </div>
      </section>
    </div>
  );
}

export default UserSubscription;
