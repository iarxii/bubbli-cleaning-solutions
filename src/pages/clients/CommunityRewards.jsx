import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRibbon,
  faAward,
  faWallet,
  faGift,
  faStar,
  faClipboardList,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
// import { ProgressBar } from 'react-bootstrap';
// import { Tab, Tabs } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import media
import userProfileImage from "../../assets/profile_avatar.jpg";

// import components
import CommunityBoard from "../components/CommunityBoard";
import ProductReviews from "../components/ProductReviews";

// import pages
import MyOrders from "./Orders";
import MySubs from "./UserSubscription";

function CommunityRewards() {
  // Mock data
  const userProfile = {
    name: "Thabang Mposula",
    totalPoints: 1200,
    redeemedPoints: 200,
    target: 2000,
    walletBalance: 150.75,
    coupons: [
      {
        id: 1,
        description: "10% off on next purchase (10 pts)",
        expiry: "2023-12-31",
      },
      {
        id: 2,
        description: "Free shipping on orders over R250",
        expiry: "2023-11-30",
      },
    ],
  };

  const mockTabsContent = {
    communityBoard: "Community Board",
    productReviews: "Product Reviews",
    mySubscription: "My Subscription",
    myOrders: "My Orders",
  };

  const [activeTab, setActiveTab] = useState("communityBoard");

  return (
    <div>
      {/* Header */}
      <div className="z-10 mb-2 grid gap-y-4 bg-[#f7f7f7] p-10 text-center shadow-md">
        <h1 className="text-[#FB6F92]">Community Rewards</h1>
        <p className="text-black">
          Manage your subscription account and interact with the community on all things Cleaning and Cost Saving.
        </p>
      </div>

      <div className="container mx-auto p-4 text-black">
        {/* Hero Section */}
        <section className="bubbli-pink-slant-gradient-dark mb-6 rounded-xl p-5 shadow-md">
          <div className="-mx-4 flex flex-wrap">
            {/* Profile Card */}
            <div className="mb-4 h-full w-full flex-grow px-4 md:mb-0 md:w-2/3">
              <div className="rounded-lg bg-white p-5 text-center shadow-md">
                <div className="mb-4 grid justify-center">
                  <img
                    src={userProfileImage}
                    alt="profile image"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    className="mx-auto mb-2 shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-black">
                    {userProfile.name}
                  </h3>
                </div>
                <div class="mx-auto my-2 h-1 w-16 rounded-xl bg-[#FB6F92]"></div>
                {/* points progress */}
                <div className="user-points-container my-4">
                  <p className="mt-2">
                    Total Points: {userProfile.totalPoints}
                  </p>
                  <div className="relative mt-2 h-8 w-full rounded-full bg-gray-200">
                    {/* remaining bar */}
                    <div
                      className="absolute left-0 top-0 flex h-8 items-center justify-end rounded-full bg-pink-500 shadow-md"
                      style={{
                        width: `${((userProfile.totalPoints - userProfile.redeemedPoints) / userProfile.target) * 100}%`,
                      }}
                    >
                      <div
                        className="truncate px-2 text-end font-bold text-white"
                        style={{ fontSize: "8px" }}
                      >
                        {userProfile.totalPoints - userProfile.redeemedPoints}{" "}
                        pts remaining
                      </div>
                    </div>
                    {/* redeemed bar */}
                    <div
                      className="absolute left-0 top-0 flex h-8 items-center justify-end rounded-full bg-pink-300 shadow-md"
                      style={{
                        width: `${(userProfile.redeemedPoints / userProfile.target) * 100}%`,
                      }}
                    >
                      <div
                        className="[#FB6F92] truncate px-2 text-end font-bold text-pink-800"
                        style={{ fontSize: "8px" }}
                      >
                        {userProfile.redeemedPoints} pts redeemed
                      </div>
                    </div>
                  </div>
                  <p className="mt-2">Target: {userProfile.target} points</p>
                </div>
                <p className="mt-2 flex items-start justify-center gap-x-4 text-start">
                  <FontAwesomeIcon
                    icon={faAward}
                    className="mb-2 text-[#FB6F92]"
                    size="4x"
                  />
                  <span>
                    Each item you purchase gives you one (1) point. <br />
                    You can use these points to redeem Extra Savings Coupons for
                    your next checkout.
                  </span>
                </p>
              </div>
            </div>

            {/* Wallet and Coupons */}
            <div className="flex w-full flex-col px-4 md:w-1/3">
              {/* wallet balance */}
              <div className="mb-4 rounded-lg bg-white p-5 text-center shadow-md">
                <FontAwesomeIcon
                  icon={faWallet}
                  className="mb-2 text-[#FB6F92]"
                  size="2x"
                />
                <div class="mx-auto my-2 h-1 w-16 rounded-xl bg-[#FB6F92]"></div>
                <h3 className="text-xl font-semibold">
                  Wallet Balance: R{userProfile.walletBalance.toFixed(2)}
                </h3>
              </div>
              {/* coupons */}
              <div className="flex-grow rounded-lg bg-white p-5 text-center shadow-md">
                <FontAwesomeIcon
                  icon={faGift}
                  className="mb-2 text-[#FB6F92]"
                  size="2x"
                />
                <div class="mx-auto my-2 h-1 w-16 rounded-xl bg-[#FB6F92]"></div>
                <h3 className="text-xl font-semibold">Available Coupons</h3>
                <ul className="mt-2">
                  {userProfile.coupons.map((coupon) => (
                    <li key={coupon.id} className="mt-1">
                      {coupon.description} (Expires: {coupon.expiry})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="container mx-auto">
          {/* tab buttons */}
          <div className="mb-4 flex justify-center gap-x-2">
            <button
              className={`px-4 py-2 ${activeTab === "communityBoard" ? "bg-[#FB6F92] text-white" : "bg-white text-black hover:bg-[#FB6F92] hover:text-white"} rounded-xl shadow-md`}
              onClick={() => setActiveTab("communityBoard")}
            >
              Community Board
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "productReviews" ? "bg-[#FB6F92] text-white" : "bg-white text-black hover:bg-[#FB6F92] hover:text-white"} rounded-xl shadow-md`}
              onClick={() => setActiveTab("productReviews")}
            >
              Product Reviews
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "mySubscription" ? "bg-[#FB6F92] text-white" : "bg-white text-black hover:bg-[#FB6F92] hover:text-white"} rounded-xl shadow-md`}
              onClick={() => setActiveTab("mySubscription")}
            >
              My Subscription
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "myOrders" ? "bg-[#FB6F92] text-white" : "bg-white text-black hover:bg-[#FB6F92] hover:text-white"} rounded-xl shadow-md`}
              onClick={() => setActiveTab("myOrders")}
            >
              My Orders
            </button>
          </div>
          {/* tab pages */}
          <div className="bubbli-pink-slant-gradient-light rounded-xl bg-white p-0 shadow-md">
            {activeTab === "communityBoard" && (
              <div className="overflow-hidden rounded-2xl bg-white p-4">
                <CommunityBoard />
              </div>
            )}
            {activeTab === "productReviews" && (
              <div className="overflow-hidden rounded-2xl bg-white p-4">
                <ProductReviews />
              </div>
            )}
            {activeTab === "mySubscription" && (
              <div className="overflow-hidden rounded-2xl bg-white p-4">
                <MySubs />
              </div>
            )}
            {activeTab === "myOrders" && (
              <div className="overflow-hidden rounded-2xl bg-white p-4">
                <MyOrders />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// Styles
const styles = {
  maxHeight100: {
    maxHeight: "100vh",
    overflowY: "auto",
  },
  hero: {
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    padding: "20px",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
  },
  walletSection: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
  },
  couponsSection: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
  },
  tabContent: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    marginTop: "20px",
  },
};

export default CommunityRewards;
