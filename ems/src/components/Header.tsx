import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="headerBackGround">
      <div className="navImg">
        <img className="mainLogo" src="/top-logo-white.png" alt="" />
        <p className="logoText">社員管理システム</p>
      </div>
      <div className="searchForm">
        <form action="#" className="search-form">
          <label>
            <input
              className="search-form-input"
              type="text"
              placeholder="キーワードを入力"
            />
          </label>
          <button
            className="search-form-button"
            type="submit"
            aria-label="検索"
          ></button>
        </form>
      </div>
    </div>
  );
}

export default Header;
