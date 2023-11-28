import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { updateUserData } from '../authSlice';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import "./SideMenu.css";

interface EmployeeData {
  employeeNumber: string;
  employeeName: string;
  employeeFurigana: string;
  employeeImg: string;
  employeeComment: string;
}

const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>("");

  const {
    employeeNumber,
    employeeName,
    employeeFurigana,
    employeeImg,
    employeeComment,
  } = useSelector<RootState, EmployeeData>((state) => {
    const userData = state.auth.userData || [];
    return {
      employeeNumber: userData[0] || "",
      employeeName: userData[1] || "",
      employeeFurigana: userData[2] || "",
      employeeImg: userData[5] || "/Noimage.png",
      employeeComment: userData[8] || "",
    };
  });

  const dispatch = useDispatch();

  const menuWidth = 350;

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = (): void => {
    setIsEditing(true);
    setEditedComment(employeeComment);
  };

  const handleSaveClick = async (): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert("Please log in with Google to update.");
      return;
    }

    const spreadsheetId = "1yajpuM9YfEqlHgGbDxYVQOcHrFfJYoTho1b1qoOME6Y";
    const range = "シート1";

    const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
    const getResponse = await fetch(getUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await getResponse.json();

    const rowIndex = data.values.findIndex((row: string[]) => row[0] === employeeNumber);
    if (rowIndex === -1) {
      alert("User not found");
      return;
    }

    const cellRange = `${range}!I${rowIndex + 1}`;

    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${cellRange}?valueInputOption=USER_ENTERED`;

    try {
      const updateResponse = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[editedComment]],
        }),
      });

      if (!updateResponse.ok) {
        const errorResponse = await updateResponse.json();
        console.error("Update Error:", errorResponse);
        alert("Failed to update comment.");
        return;
      }

      dispatch(updateUserData([...data.values[rowIndex], editedComment]));
      setIsEditing(false);
      alert("編集が適応されました。");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update comment.");
    }
  };

  

  return (
    <>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
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
};

export default SideMenu;
