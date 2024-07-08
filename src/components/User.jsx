import React from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";

export default function User({user, user:{isAdmin,photoURL}}) {
  const { login, logout } = useAuthContext();
  return (
    <>
      <Link to="/carts"><FiShoppingCart /></Link>
      {
        isAdmin && <Link to="/product/new" aria-label="Edit Products"><FaRegEdit /></Link>
      }
      {user ?
            <button onClick={logout}><IoMdLogOut /></button>
            :<button onClick={login}><IoMdLogIn /></button>
          }
      <div className="flex items-center gap-1">
        <img src={photoURL} className="w-7 h-7 rounded-full" alt="프로필사진" />
      </div>
    </>
  );
}