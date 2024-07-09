import React from 'react';
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { useAuthContext } from "../context/AuthContext";

export default function UserInfo() {
  const { user, login, logout } = useAuthContext();

  return (
    <>
      {user ? (
        <>
          <Link to="/cart"><FiShoppingCart /></Link>
          {user.isAdmin && (
            <Link to="/products/new"><FaRegEdit /></Link>
          )}
          <button onClick={logout}><IoMdLogOut /></button>
          <div className="flex items-center gap-1">
            <img src={user.photoURL} className="w-7 h-7 rounded-full" alt="프로필사진" />
          </div>
        </>
      ) : (
        <button onClick={login}><IoMdLogIn /></button>
      )}
    </>
  );
}
