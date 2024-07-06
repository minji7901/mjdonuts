import React from 'react';
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

export default function User({user:{isAdmin,photoURL,displayName}}) {
  return (
    <>
      <Link to="/carts"><FiShoppingCart /></Link>
      {
        isAdmin && <Link to="/product/new" aria-label="Edit Products"><FaRegEdit /></Link>
      }
      <div className="flex items-center gap-1">
        <img src={photoURL} className="w-7 h-7 rounded-full" alt="프로필사진" />
        <span className="hidden md:block text-sm">{displayName}</span>
      </div>
    </>
  );
}