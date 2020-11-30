import { set } from "mongoose";
import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
export default function Menubar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  
  const menuBar = user ? (
    <Menu pointing secondary size="huge" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item  
        name="community"
        active={activeItem === "community"}
        onClick={handleItemClick}
        as={Link}
        to="/profile/all"
      />
      <Menu.Menu position="right">
      <Menu.Item name={user.name} active as={Link} to="/profile" />

        
        <Menu.Item
          name="chat"
          active={activeItem === "chat"}
          onClick={handleItemClick}
          as={Link}
          to="/live"
        />
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item  
        name="community"
        active={activeItem === "community"}
        onClick={handleItemClick}
        as={Link}
        to="/profile/all"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}
