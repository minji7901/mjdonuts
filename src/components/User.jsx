import React from 'react';
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

export default function User({user}) {
  
  return (
    <>
      <Link to="/carts"><FiShoppingCart /></Link>
      {
        user.isAdmin && <Link to="/product/new"><FaRegEdit /></Link>
      }
      <div className="flex items-center gap-1">
        <img src={user.photoURL} className="w-7 h-7 rounded-full" alt="user photo" />
        <span className="hidden md:block text-sm">{user.displayName}</span>
      </div>
    </>
  );
}