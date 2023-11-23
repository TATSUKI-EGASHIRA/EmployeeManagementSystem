import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";
import { login } from "./authSlice";
import { useDispatch } from "react-redux";
import GoogleLogin from "./components/googleLogin";

function Login() {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl =
      "https://sheets.googleapis.com/v4/spreadsheets/1yajpuM9YfEqlHgGbDxYVQOcHrFfJYoTho1b1qoOME6Y/values/%E3%82%B7%E3%83%BC%E3%83%881?key=AIzaSyBoGN_ggnHtfZrcL1FX81HSWzQirXL8eyg";

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const rows = data.values;

      const user = rows.find(
        (row: any[]) => row[0] === employeeNumber && row[6] === password
      );

      if (user) {
        dispatch(
          login({
            userData: user,
            expiryTimestamp: new Date().getTime() + 86400000,
          })
        );
        history.push("/MemberPage");
      } else {
        alert("ログインに失敗しました。");
      }
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  return (
    <div>
      <div className="LoginBackGround">
        <div className="formContainer">
          <form className="uiForm" onSubmit={handleSubmit}>
            <img className="mainLogo" src="/logo2.png" alt="" />
            <div className="formField">
              <input
                type="text"
                placeholder="社員番号"
                name="employeeNumber"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
              />
            </div>
            <div className="formField">
              <input
                type="password"
                placeholder="パスワード"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submitButton">
              ログイン
            </button>
          </form>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}

export default Login;
