import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  return (
    <div className="headerBackGround">
      <div className="navImg">
        <img className="mainLogo" src="/top-logo-white.png" alt="" />
        <p className="logoText">社員管理システム</p>
      </div>
      <div className="search-box">
        <input
          className="search-txt"
          type="text"
          name=""
          placeholder="キーワードを入力"
        />
        <button className="search-btn">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
