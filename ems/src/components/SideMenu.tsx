import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "./SideMenu.css";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Redux ストアから従業員情報とプロファイル画像URLを取得
  const {
    employeeNumber,
    employeeName,
    employeeFurigana,
    employeeComment,
    employeeImg,
  } = useSelector((state: RootState) => {
    const userData = state.auth.userData || [];
    return {
      employeeNumber: userData[0] || "",
      employeeName: userData[1] || "",
      employeeFurigana: userData[2] || "",
      employeeImg: userData[5] || "/Noimage.png",
      employeeComment: userData[8],
    };
  });

  const menuWidth = 350; // ここでサイドメニューの幅を定義

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* オーバーレイ */}
      {isOpen && (
        <div
          className="overlay"
          onClick={toggleMenu} // オーバーレイをクリックするとメニューが閉じる
        />
      )}

      <div className="menuToggleArea">
        {/* メニュートグルボタン */}
        <button
          className="menuToggle"
          onClick={toggleMenu}
          style={{
            left: isOpen ? `${menuWidth}px` : "0", // isOpenがtrueならメニューの幅の位置に、falseなら0の位置に
          }}
        >
          {isOpen ? (
            <p className="toogleText">
              <CloseIcon />
              CLOSE
            </p>
          ) : (
            <p className="toogleText">
              <PersonIcon />
              MY PAGE
            </p>
          )}
        </button>

        {/* サイドメニュー */}
        <div
          className="sideMenu"
          style={{
            width: `${menuWidth}px`, // メニューの幅
            transform: isOpen ? "translateX(0)" : `translateX(-${menuWidth}px)`, // isOpenがtrueなら表示、falseなら隠す
          }}
        >
          {/* メニューコンテンツ */}
          <div className="SideProfileContainer">
            <div className="editBtn">
              <EditIcon />
            </div>
            <div className="profileImageContainer">
              <img className="memberFhoto" src={employeeImg} alt="Profile" />
            </div>
            <p className="employeeNumber">{employeeNumber}</p>
            <p className="employeeName">{employeeName}</p>
            <p className="employeeFurigana">{employeeFurigana}</p>
            <p className="employeeComment">{employeeComment}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideMenu;
