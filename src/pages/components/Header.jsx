'use client'

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClipboardList, faUser, faBars, faBoxOpen, faShareAlt, faStore } from '@fortawesome/free-solid-svg-icons';

// import media
import logo from "../../assets/bubbli-icon_white.svg";
import avatar from "../../assets/profile_avatar.jpg";
import meshBackground from "../../assets/brand/mesh-white-0_7.png";
import meshBackgroundRed from "../../assets/brand/mesh-red-1.png";

// import icons
import rewardsGif from '../../assets/icons/icons8-reward.gif';

// import components
import Cart from "../clients/Cart";

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
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  UserIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const shopLinks = [
  { name: 'Home Catalogue', description: 'View our product catalogue', href: '#', icon: faBook },
  { name: 'Orders', description: 'Track your orders', href: '#', icon: faClipboardList },
  { name: 'Profile', description: 'Manage your profile', href: '#', icon: faUser },
  { name: 'Subscriptions', description: 'Manage your subscriptions', href: '#', icon: faBoxOpen },
  { name: 'Social media', description: 'Follow us on social media', href: '#', icon: faShareAlt },
]
const callsToAction = [
  { name: 'bubbli products demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function Header() {
  // tailwind mobile menu toggle state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Example: Mocking user login state
  const isLoggedIn = true; // Change to `false` to test behavior for non-logged-in users
  const userProfile = {
    name: "John Doe",
    profileImage: "https://via.placeholder.com/40", // Replace with actual profile image URL
  };

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

  return (
    <header className="bg-dark-900 text-white" style={styles.navbar}>
      <div style={styles.navWrap}>
        <div style={styles.nav}>
          <nav aria-label="Global" className="container mx-auto flex max-w-7xlz items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">bubbli cleaning solutions</span>
                <img
                  alt="bubbli cleaning solutions"
                  src={logo}
                  className="h-8 w-auto"
                  style={styles.logo}
                />
              </Link>
            </div>
            <div className="flex lg:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-lg p-6 shadow-lg focus:outline-none"
                style={styles.mobileMenuButton}
              >
                <span className="sr-only">Open main menu</span>
                {/* <Bars3Icon aria-hidden="true" className="size-6 text-white icon-white" style={{ color: '#fff' }} /> */}
                <FontAwesomeIcon icon={faBars} className="h-6 w-6 text-white icon-white" style={{ color: '#fff'}} />
              </button>
            </div>
            <PopoverGroup className="hidden lg:flex lg:gap-x-4 items-center">
              {/* <Link to="/clients/orders" className="text-sm/6 font-semibold" style={styles.link}>
                Orders
              </Link> */}

              {/* Shop links */}
              <Popover className="relative">
                
                <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 focus:outline-none shadow-md"
                  style={styles.shopDropButton}>
                    <FontAwesomeIcon icon={faStore} />
                    <span>Store</span>
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
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
                          <FontAwesomeIcon icon={item.icon} aria-hidden="true" className="size-6 text-[#E44548] group-hover:text-[#1EBA15]" />
                        </div>
                        <div className="flex-auto">
                          <a href={item.href} className="block font-semibold text-[#E44548] group-hover:text-[#1EBA15]">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-[#E44548] group-hover:text-[#1EBA15]">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-[#E44548] hover:bg-gray-100"
                      >
                        <item.icon aria-hidden="true" className="size-5 flex-none text-[#1EBA15]" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>

              <Link to="/clients/products" className="text-sm/6 font-semibold flex gap-x-2 items-center" style={styles.link}>
                <span>Get Community Rewards</span>
                <img src={rewardsGif} alt="Reward icon by Icons8" className="h-12 w-12" />
              </Link>

            </PopoverGroup>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
              {/* Customer Login */}
              <Link to="#" className="text-sm/6 font-semibold flex items-center gap-x-2 shadow-md"
                style={styles.loginButton}>
                  <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-white icon-white" style={{ color: '#fff'}} />
                 <span>Log in</span>
                 {/* <UserIcon className="h-6 w-6 text-white fill-current" aria-hidden="true" /> */}
              </Link>

              {/* User Cart */}
              <button
                onClick={() => setCartOpen(true)}
                style={styles.cartButton}
                className="shadow-md"
              >
                <div className="text-sm/6 font-semibold flex items-center gap-x-2">
                  <ShoppingCartIcon className="h-6 w-6 text-white fill-current" aria-hidden="true" />
                  <span className="text-sm/6 font-semibold">Cart</span>
                  ({cartItems.length})
                </div>
              </button>
            </div>
          </nav>
        </div>
      </div>
     
      {/* Mobile menu is visible on screen less than large */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden" style={styles.mobileNavbar}>
        <div style={{paddingTop:"200px"}}>
          <div className="fixed inset-0 z-10z" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10z w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">bubbli cleaning solutions</span>
                <img
                  alt="bubbli cleaning solutions"
                  src={logo}
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 bg-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Product
                      <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {[...shopLinks, ...callsToAction].map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

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
    // backgroundColor: "#E44548",
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
    backgroundImage: "linear-gradient(120deg, #E44548 30%, rgba(0,0,0,0) 90%)",
    color: "#fff",
  },
  shopFeaturesSubMenu: {
    backgroundColor: "#fff",
    
  },
  mobileNavbar: {
    padding: "10px 20px",
    backgroundColor: "#E44548",
    color: "#fff",
    zIndex: "1010",
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
  profileLink: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    textDecoration: "none",
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
    color: "#E44548",
  },
  mobileMenuButton: {
    backgroundColor: "#E44548",
    color: "#fff",
  },
  mobileMenuText: {
    fontSize: "16px",
    color: "#fff",
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#E44548",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  cartButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#E44548",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  shopDropButton: {
    backgroundColor: "#fff",
    color: "#E44548",
    padding: "10px",
    borderRadius: "10px",
    outline: "none", 
    textDecoration: "none",
  },
};

/* 
<nav>
    <img src="./bubbli-icon_white.svg" alt="svg image here" style="height: auto;width: 500px;"/>
    <h1>Bubbli Cleaning Solutions</h1>
    <ul>
      <li>
        <Link to="/clients/home">Home</Link>
      </li>
      <li>
        <Link to="/clients/products">Catalogue</Link>
      </li>
      <li>
        <Link to="/clients/login">Login</Link>
      </li>
    </ul>
  </nav>
*/



export default Header;
