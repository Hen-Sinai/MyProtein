import React from "react";
import { NavLink } from "react-router-dom";
import { GiMuscleUp, GiHoodie } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FcMoneyTransfer } from "react-icons/fc";

const Navigation = () => {
  return (
    <header className="header">
      <ul>
        <li>
          <NavLink to="/protein">
            <GiMuscleUp /> Protein
          </NavLink>
        </li>
        <li>
          <NavLink to="/clothing">
            <GiHoodie /> Clothing
          </NavLink>
        </li>
        <li>
          <NavLink to="/mySales">
            <FcMoneyTransfer /> My sales
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            <AiOutlineShoppingCart /> Cart
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Navigation;
