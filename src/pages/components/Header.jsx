"use client";

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext for User Authentication State Management
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClipboardList,
  faUser,
  faBars,
  faClose,
  faBoxOpen,
  faShareAlt,
  faStore,
  faGifts,
  faUserCircle,
  faInfoCircle,
  faHandHoldingDollar,
  faQuestionCircle,
  faScroll,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

// import media
import logo from "../../assets/bubbli-icon_white.svg";
import avatar from "../../assets/profile_avatar.jpg";
import meshBackground from "../../assets/brand/mesh-white-0_7.png";
import meshBackgroundRed from "../../assets/brand/mesh-red-1.png";

// import icons
import rewardsGif from "../../assets/icons/icons8-reward.gif";

// import components
import Cart from "./Cart";

// import custom css
import "../custom.css";

// tailwind styled header imports
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const shopLinks = [
  {
    name: "Home Catalogue",
    description: "View our product catalogue",
    href: "clients/home",
    icon: faBook,
  },
  {
    name: "Orders",
    description: "Track your orders",
    href: "clients/orders",
    icon: faClipboardList,
  },
  {
    name: "Profile",
    description: "Manage your profile",
    href: "clients/profile",
    icon: faUser,
  },
  {
    name: "Subscriptions",
    description: "Manage your subscriptions",
    href: "clients/subscribe",
    icon: faBoxOpen,
  },
  {
    name: "Social media",
    description: "Follow us on social media",
    href: "https://linktr.ee/",
    icon: faShareAlt,
  },
];
const callsToAction = [
  {
    name: "bubbli products demo",
    href: "https://youtube.com/",
    icon: PlayCircleIcon,
  },
  { name: "Contact sales", href: "customercare/support/", icon: PhoneIcon },
];

function Header() {
  // const [user, setUser] = useState(null);
  const { user, logout } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate();

  // tailwind mobile menu toggle state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Mock function to remove item
  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  // Mock function to add an item (triggered from product cards, for example)
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // State to track scroll position and navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // handle logout
  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    navigate("/clients/login");
  };

  return (
    <header
      className={`bg-dark-900 text-white ${isNavbarHidden ? "translate-y-[-100%]" : "translate-y-0"} transition-transform duration-300`}
      style={styles.navbar}
    >
      <div style={styles.navWrap}>
        <div style={styles.nav}>
          <nav
            aria-label="Global"
            className="max-w-7xlz container mx-auto flex items-center justify-between p-6 lg:px-8"
          >
            {/* bubbli root-nav / logo */}
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">bubbli cleaning solutions</span>
                <img
                  alt="bubbli cleaning solutions"
                  src={logo}
                  className="h-8 w-auto animate__animated animate__pulse animate__infinite"
                  style={styles.logo}
                />
              </Link>
            </div>

            {/* <!-- Mobile menu button --> */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-lg p-6 shadow-lg focus:outline-none"
                style={styles.mobileMenuButton}
              >
                <span className="sr-only">Open main menu</span>
                {/* <Bars3Icon aria-hidden="true" className="size-6 text-white icon-white" style={{ color: '#fff' }} /> */}
                <FontAwesomeIcon
                  icon={faBars}
                  className="icon-white h-6 w-6"
                  style={{ color: "#FB6F92" }}
                />
              </button>
            </div>

            {/* Shop links */}
            <PopoverGroup className="hidden items-center lg:flex lg:gap-x-4">
              <Popover className="relative">
                {/* Shop Links main button */}
                <PopoverButton
                  className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 shadow-md focus:outline-none"
                  style={styles.shopDropButton}
                >
                  <FontAwesomeIcon icon={faStore} />
                  <span>Bubbli Store</span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none text-gray-400"
                  />
                </PopoverButton>

                {/* Shop Features Sub-Menu */}
                <PopoverPanel
                  transition
                  className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                  style={styles.shopFeaturesSubMenu}
                >
                  <div className="p-4">
                    {shopLinks.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <FontAwesomeIcon
                            icon={item.icon}
                            aria-hidden="true"
                            className="size-6 text-[#FB6F92] group-hover:text-[#1EBA15]"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            to={item.href}
                            className="block font-semibold text-[#FB6F92] group-hover:text-[#1EBA15]"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-[#FB6F92] group-hover:text-[#1EBA15]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        target="_blank"
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-[#FB6F92] hover:bg-gray-100"
                      >
                        <item.icon
                          aria-hidden="true"
                          className="size-5 flex-none text-[#1EBA15]"
                        />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>

              {/* community rewards link */}
              <Link
                to="/clients/rewards"
                className="flex items-center gap-x-2 text-sm/6 font-semibold"
                style={styles.link}
              >
                <span>Community Rewards</span>
                <img
                  src={rewardsGif}
                  alt="Reward icon by Icons8"
                  className="h-12 w-12"
                />
              </Link>
            </PopoverGroup>

            <div className="hidden gap-x-4 lg:flex lg:flex-1 lg:justify-end">
              {/* User Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                style={styles.cartButton}
                className="shadow-md"
              >
                <div className="flex items-center gap-x-2 text-sm/6 font-semibold">
                  <ShoppingCartIcon
                    className="h-6 w-6 fill-current text-white"
                    aria-hidden="true"
                  />
                  <span className="text-sm/6 font-semibold">Cart</span>(
                  {cartItems.length})
                </div>
              </button>

              {/* Customer Login */}
              {user ? (
                <div
                  className="user-profile shadow-md"
                  style={styles.userProfileCard}
                >
                  <Link
                    to="/clients/profile"
                    className="profile-link flex items-center gap-x-2"
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="profile-icon size-10 text-[#FB6F92]"
                    />
                    <span className="text-black">{user.first_name} {user.last_name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="logout-button"
                    style={styles.logoutButton}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-x-4">
                  <Link
                    to="/clients/login"
                    className="flex items-center gap-x-2 text-sm/6 font-semibold shadow-md"
                    style={styles.loginButton}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="icon-white h-6 w-6 text-white"
                      style={{ color: "#fff" }}
                    />
                    <span>Log in</span>
                  </Link>
                  {/* signup button */}
                  {/* <Link
                    to="clients/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    style={styles.signupButton}
                    className="flex-1 rounded-lg px-3 py-2.5 text-center text-base/7 font-semibold text-white shadow-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-x-2.5">
                      <FontAwesomeIcon
                        icon={faUserPen}
                        className="text-whitez h-6 w-6 fill-current text-[#FB6F92]"
                        aria-hidden="true"
                      />
                      <span className="text-[#FB6F92]">Sign Up</span>
                    </div>
                  </Link> */}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu is visible on screen less than large */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div style={{ paddingTop: "200px" }}>
          <div className="z-10z fixed inset-0" />
          <DialogPanel
            className="z-10z fixed inset-y-0 right-0 w-full overflow-y-auto bg-white shadow-lg sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            style={styles.mobileNavbar}
          >
            <div style={styles.mobileNavbarWrap}>
              <div style={styles.mobileNav}>
                {/* header */}
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="gap-x-2.5z -m-1.5 flex items-center p-1.5"
                  >
                    <span className="sr-only">bubbli cleaning solutions</span>
                    <img
                      alt="bubbli cleaning solutions"
                      src={logo}
                      className="h-20 w-auto"
                    />
                    <span className="pt-5 text-white">Cleaning Solutions</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md bg-white p-2.5 text-gray-700"
                  >
                    <span className="sr-only">Close menu</span>
                    <FontAwesomeIcon
                      icon={faClose}
                      aria-hidden="true"
                      className="size-6 text-[#FB6F92]"
                    />
                  </button>
                </div>
                {/* body */}
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {/* Store Links */}
                      <Disclosure as="div" className="-mx-3">
                        <DisclosureButton
                          className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 shadow-lg hover:bg-gray-50"
                          style={styles.mobileNavbarStoreButton}
                        >
                          <div className="flex items-center gap-x-2.5">
                            <FontAwesomeIcon
                              icon={faStore}
                              className="h-6 w-6 fill-current text-[#FB6F92]"
                              aria-hidden="true"
                            />
                            Bubbli Store
                          </div>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 flex-none group-data-[open]:rotate-180"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2 rounded-lg bg-white shadow-lg">
                          {[...shopLinks, ...callsToAction].map((item) => (
                            <DisclosureButton
                              key={item.name}
                              as="a"
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-white hover:bg-gray-50"
                            >
                              <Link
                                to={item.href}
                                className="text-[#FB6F92]"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>

                      {/* about us link */}
                      <Link
                        to="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-x-2.5">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="h-6 w-6 fill-current text-white"
                            aria-hidden="true"
                          />
                          <span>About Us</span>
                        </div>
                      </Link>

                      {/* Community Rewards Link */}
                      <Link
                        to="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-x-2.5">
                          <FontAwesomeIcon
                            icon={faGifts}
                            className="h-6 w-6 fill-current text-white"
                            aria-hidden="true"
                          />
                          <span>Bubbli Community Rewards</span>
                        </div>
                      </Link>

                      {/* Refer a friend link */}
                      <Link
                        to="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-x-2.5">
                          <FontAwesomeIcon
                            icon={faHandHoldingDollar}
                            className="h-6 w-6 fill-current text-white"
                            aria-hidden="true"
                          />
                          <span>Refer a Friend</span>
                        </div>
                      </Link>

                      {/* FAQs link */}
                      <Link
                        to="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-x-2.5">
                          <FontAwesomeIcon
                            icon={faQuestionCircle}
                            className="h-6 w-6 fill-current text-white"
                            aria-hidden="true"
                          />
                          <span>FAQs</span>
                        </div>
                      </Link>

                      {/* Policies link */}
                      <Link
                        to="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-x-2.5">
                          <FontAwesomeIcon
                            icon={faScroll}
                            className="h-6 w-6 fill-current text-white"
                            aria-hidden="true"
                          />
                          <span>Policies</span>
                        </div>
                      </Link>
                    </div>

                    {/* login / signup */}
                    <div className="py-6">
                      {user ? (
                        <div
                          className="user-profile-mobile-card rounded-xl p-4"
                          style={styles.userProfileMobileCard}
                        >
                          <Link
                            to="/clients/profile"
                            className="profile-link"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <FontAwesomeIcon
                              icon={faUserCircle}
                              className="profile-icon size-10 text-[#FB6F92]"
                            />
                            {/* <img src={user.profilePic} alt={user.username} /> */}
                            <span className="text-black">{user.first_name} {user.last_name}</span>
                          </Link>
                          <div className="grid-cols-2z grid w-full gap-x-2">
                            <button
                              onClick={handleLogout}
                              className="logout-button"
                              style={styles.logoutButton}
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex w-full gap-x-4">
                          {/* login button */}
                          <Link
                            to="clients/login"
                            onClick={() => setMobileMenuOpen(false)}
                            style={styles.signupButton}
                            className="flex-1 rounded-lg px-3 py-2.5 text-center text-base/7 font-semibold text-white shadow-lg hover:bg-gray-50"
                          >
                            <div className="col-span-6 flex items-center gap-x-2.5">
                              <FontAwesomeIcon
                                icon={faUser}
                                className="text-whitez h-6 w-6 fill-current text-[#FB6F92]"
                                aria-hidden="true"
                              />
                              <span className="text-[#FB6F92]">Log in</span>
                            </div>
                          </Link>
                          {/* sign up button */}
                          <Link
                            to="clients/signup"
                            onClick={() => setMobileMenuOpen(false)}
                            style={styles.signupButton}
                            className="flex-1 rounded-lg px-3 py-2.5 text-center text-base/7 font-semibold text-white shadow-lg hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-x-2.5">
                              <FontAwesomeIcon
                                icon={faUserPen}
                                className="text-whitez h-6 w-6 fill-current text-[#FB6F92]"
                                aria-hidden="true"
                              />
                              <span className="text-[#FB6F92]">Sign Up</span>
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* User Cart */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </header>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: "0",
    zIndex: "100",
    // backgroundColor: "#FB6F92",
    // backgroundColor: "#fff",
    // backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, rgba(0,0,0,0) 100%)",
  },
  navWrap: {
    // backgroundImage: `url(${meshBackgroundRed})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
  },
  nav: {
    // display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundImage: "linear-gradient(120deg, #FB6F92 30%, rgba(0,0,0,0) 90%)",
    color: "#fff",
  },
  mobileNav: {
    backgroundImage: "linear-gradient(120deg, #FB6F92 30%, rgba(0,0,0,0) 90%)",
    color: "#fff",
    padding: "20px 40px",
  },
  shopFeaturesSubMenu: {
    backgroundColor: "#fff",
  },
  mobileNavbar: {
    padding: "0px",
    backgroundColor: "#FB6F92",
    color: "#fff",
    zIndex: "1010",
  },
  mobileNavbarWrap: {
    backgroundImage: `url(${meshBackground})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
    height: "100%",
    // padding: "20px",
  },
  mobileNavbarStoreButton: {
    backgroundColor: "#fff",
    color: "#FB6F92",
    padding: "10px",
    borderRadius: "10px",
    outline: "none",
    textDecoration: "none",
  },
  mobileNavbarStoreLinks: {
    color: "#fff",
  },
  mobileNavbarLinkButtons: {
    color: "#fff",
    textDecoration: "none",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    width: "100px",
    height: "100px",
  },
  logoText: {
    margin: 0,
    fontSize: "20px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
  icon: {
    marginRight: "5px",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
    borderColor: "#fff",
    borderWidth: "3px",
  },
  profileName: {
    fontSize: "16px",
    color: "#FB6F92",
  },
  mobileMenuButton: {
    backgroundColor: "#fff",
    color: "#FB6F92",
  },
  mobileMenuText: {
    fontSize: "16px",
    color: "#fff",
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FB6F92",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  signupButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "#FB6F92",
    padding: "10px 20px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  userProfileMobileCard: {
    display: "flex",
    alignItems: "center",
    justify: "space-between",
    gap: "10px",
    backgroundColor: "#fff",
  },
  cartButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FB6F92",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  shopDropButton: {
    backgroundColor: "#fff",
    color: "#FB6F92",
    padding: "10px",
    borderRadius: "10px",
    outline: "none",
    textDecoration: "none",
  },
  // user logged in styles
  userProfileCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "10px",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    textDecoration: "none",
    color: "#FB6F92",
  },
  profileIcon: {
    fontSize: "24px",
  },
  logoutButton: {
    backgroundColor: "#FB6F92",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default Header;
