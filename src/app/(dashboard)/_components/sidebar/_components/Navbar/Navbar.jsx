"use client";
// components/Navbar.js
import React from "react";
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRestaurentDetailsContext } from "@/context/restaurentDetailsContext";
const Navbar = ({ activeSection, setActiveSection }) => {
  const { restaurantDetails } = useRestaurentDetailsContext();
  function switchsection(section) {
    setActiveSection(() => section);
  }
  return (
    <div className={styles.navbar}>
      <Link
        href={`/dashboard/${restaurantDetails.restaurantName}/`}
        onClick={() => switchsection("Home")}
      >
        <h5
          className={`${styles.navName} ${
            activeSection === "Home" ? styles.activeSection : ""
          }`}
        >
          Home
        </h5>
      </Link>
      <Link
        href={`/dashboard/${restaurantDetails.restaurantName}/menu`}
        onClick={() => switchsection("Menu")}
      >
        <h5
          className={`${styles.navName} ${
            activeSection === "Menu" ? styles.activeSection : ""
          }`}
        >
          Menu
        </h5>
      </Link>
      <Link
        href={`/dashboard/${restaurantDetails.restaurantName}/orders`}
        onClick={() => switchsection("Orders")}
      >
        <h5
          className={`${styles.navName} ${
            activeSection === "Orders" ? styles.activeSection : ""
          }`}
        >
          Orders
        </h5>
      </Link>
      <Link
        href={`/dashboard/${restaurantDetails.restaurantName}/customer-insights`}
        onClick={() => switchsection("Customer Insights")}
      >
        <h5
          className={`${styles.navName} ${
            activeSection === "Customer Insights" ? styles.activeSection : ""
          }`}
        >
          Customer Insights
        </h5>
      </Link>
      <Link
        href={`/dashboard/${restaurantDetails.restaurantName}/payment-and-billings`}
        onClick={() => switchsection("Payment and Billings")}
      >
        <h5
          className={`${styles.navName} ${
            activeSection === "Payment and Billings" ? styles.activeSection : ""
          }`}
        >
          Payment and Billings
        </h5>
      </Link>
      <Link
        href={`/dashboard/${restaurantDetails.restaurantName}/reviews`}
        onClick={() => switchsection("Reviews")}
      >
        <h5
          className={`${styles.navName} ${
            activeSection === "Reviews" ? styles.activeSection : ""
          }`}
        >
          Reviews
        </h5>
      </Link>
    </div>
  );
};

export default Navbar;
