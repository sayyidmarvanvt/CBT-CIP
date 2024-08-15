import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="flexCenter">
      <div className="flexRow">
        <Link to={"/"}>
          <ul>HomePage</ul>
        </Link>
        <Link to={"/login"}>
          <ul>LoginPage</ul>
        </Link>
        <Link to={"/register"}>
          <ul>RegisterPage</ul>
        </Link>
        <Link to={"/profile"}>
          <ul>ProfilePage</ul>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
