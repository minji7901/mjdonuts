import React from 'react';
import { Link } from "react-router-dom";
import { RiGalleryView2 } from "react-icons/ri";
import logo from '../assets/logo.png'
import User from "./User";
import { useAuthContext } from "../context/AuthContext";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="rounded-full bg-primary text-sm px-3 py-1 text-base font-extrabold"
      onClick={onClick}
    >{text}</button>
  )
}
const HEADER_CLASSNAME = "fixed top-0 left-0 w-full bg-white/10 z-10 backdrop-blur-md"

export default function Header() {
  
  const { user, login, logout } = useAuthContext();
  return (
    <header className={HEADER_CLASSNAME}>
      <div className="flex items-center mx-auto max-w-7xl w-full h-20">
        <Link to="/">
          <img src={logo} className="w-14" alt="logo" />
        </Link>
        <div className="flex items-center gap-4 ml-auto text-lg">
          <Link to="/products"><RiGalleryView2 /></Link>
          {user && <User user={user} />}
          {user ?
            <Button text={'로그아웃'} onClick={logout} />
            : <Button text={'로그인'} onClick={login} />
          }
        </div>
      </div>
    </header>
  );
}