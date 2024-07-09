import React from 'react';
import { Link } from "react-router-dom";
import { RiGalleryView2 } from "react-icons/ri";
import { useAuthContext } from "../context/AuthContext";
import logo from '../logo.svg';
import UserInfo from "./UserInfo";

export default function Header() {
  const { user } = useAuthContext();

  return (
    <header className="px-3 lg:px-0 text-white">
      <div className="flex items-center mx-auto max-w-7xl w-full h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-10" alt="logo" />
          <span className="text-xl font-bold">MJDONUTS</span>
        </Link>
        <div className="flex items-center gap-4 ml-auto text-xl">
          <Link to="/products"><RiGalleryView2 /></Link>
          <UserInfo user={user} />
        </div>
      </div>
    </header>
  );
}
