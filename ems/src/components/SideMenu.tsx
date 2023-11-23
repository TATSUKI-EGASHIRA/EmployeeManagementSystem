import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import "./SideMenu.css";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");

  const {
    employeeNumber,
    employeeName,
    employeeFurigana,
    employeeImg,
    employeeComment,
  } = useSelector((state: RootState) => {
    const userData = state.auth.userData || [];
    return {
      employeeNumber: userData[0] || "",
      employeeName: userData[1] || "",
      employeeFurigana: userData[2] || "",
      employeeImg: userData[5] || "/Noimage.png",
      employeeComment: userData[8] || "",
    };
  });

  const menuWidth = 350;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedComment(employeeComment);
  };

  const handleSaveClick = async () => {
    const spreadsheetId = "1yajpuM9YfEqlHgGbDxYVQOcHrFfJYoTho1b1qoOME6Y"; // スプレッドシートID
    const apiKey = "AIzaSyBoGN_ggnHtfZrcL1FX81HSWzQirXL8eyg"; // APIキー
    const range = "シート1"; // シート名

    const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    try {
      const getResponse = await fetch(getUrl);
      const data = await getResponse.json();
      console.log("Fetched Data:", data); // データ取得のデバッグ

      const rows = data.values;
      const rowIndex = rows.findIndex(
        (row: string[]) => row[0] === employeeNumber
      );
      console.log("Row Index:", rowIndex); // 行インデックスのデバッグ

      if (rowIndex === -1) {
        alert("User not found");
        return;
      }

      const cellRange = `${range}!I${rowIndex + 1}`;
      console.log("Cell Range:", cellRange); // セル範囲のデバッグ

      const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${cellRange}?valueInputOption=USER_ENTERED&key=${apiKey}`;

      const updateResponse = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[editedComment]],
        }),
      });

      console.log("Update Response:", await updateResponse.text()); // 更新レスポンスのデバッグ

      if (!updateResponse.ok) {
        throw new Error("Failed to update spreadsheet");
      }

      setIsEditing(false);
      alert("Comment updated successfully.");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update comment.");
    }
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={toggleMenu} />}

      <div className="menuToggleArea">
        <button
          className="menuToggle"
          onClick={toggleMenu}
          style={{ left: isOpen ? `${menuWidth}px` : "0" }}
        >
          {isOpen ? (
            <p className="toogleText">
              <CloseIcon /> CLOSE
            </p>
          ) : (
            <p className="toogleText">
              <PersonIcon /> MY PAGE
            </p>
          )}
        </button>

        <div
          className="sideMenu"
          style={{
            width: `${menuWidth}px`,
            transform: isOpen ? "translateX(0)" : `translateX(-${menuWidth}px)`,
          }}
        >
          <div className="SideProfileContainer">
            <h1 className="sideTitle">Profile</h1>
            <div className="editBtn" onClick={handleEditClick}>
              <EditIcon />
            </div>
            <div className="profileImageContainer">
              <img className="memberFhoto" src={employeeImg} alt="Profile" />
            </div>
            <p className="employeeNumber">{employeeNumber}</p>
            <p className="employeeName">{employeeName}</p>
            <p className="employeeFurigana">{employeeFurigana}</p>
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  variant="outlined"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <Button
                  startIcon={<SaveIcon />}
                  onClick={handleSaveClick}
                  color="primary"
                >
                  Save
                </Button>
              </>
            ) : (
              <p className="employeeComment">{employeeComment}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SideMenu;
