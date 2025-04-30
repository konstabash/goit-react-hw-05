import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <header className={s.header}>
      <NavLink className={setActiveClass} to="/">
        Home
      </NavLink>
      <NavLink className={setActiveClass} to="/movies">
        Movies
      </NavLink>
    </header>
  );
};

export default Navigation;
