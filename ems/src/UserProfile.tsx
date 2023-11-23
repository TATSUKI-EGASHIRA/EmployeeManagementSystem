import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";

type Params = {
  userId: string;
};

type User = string[]; // 各ユーザーのデータ型

function UserProfile() {
  const { userId } = useParams<Params>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // APIからデータを取得
        const response = await fetch(
          "https://sheets.googleapis.com/v4/spreadsheets/1yajpuM9YfEqlHgGbDxYVQOcHrFfJYoTho1b1qoOME6Y/values/%E3%82%B7%E3%83%BC%E3%83%881?key=AIzaSyBoGN_ggnHtfZrcL1FX81HSWzQirXL8eyg"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        if (!result.values || !Array.isArray(result.values)) {
          throw new Error("No data available");
        }

        // ユーザーを検索
        const numericUserId = parseInt(userId, 10);
        const userData = result.values.find(
          (row: User) => parseInt(row[0], 10) === numericUserId
        );

        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
          setError("User not found");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <Header />
      <SideMenu />
      <div className="userProfileBack">
        <div className="buttonArea">
          <button className="userEditButton"></button>
          <button className="backButton"></button>
        </div>
        <div className="profileArea">
          <img
            className="userProfileFhoto"
            src={user[5] ? user[5] : "/Noimage.png"}
            alt="Profile"
          />
          <div className="userProfileText">
            <div className="nameContainer">
              <p className="userName">{user[1]}</p>
              <p className="userFurigana">{user[2]}</p>
            </div>
            <button className="editButton"></button>
            <div className="userData">
              <p className="userNo">{user[0]}</p>
              <p className="userGender">{user[4]}</p>
              <p className="userJoiningDate">{user[9]}</p>
              <div className="hiddenArea">
                <p className="userPass">{user[6]}</p>
                <p className="userPermissionLevel">{user[11]}</p>
              </div>
              <p className="userComment">{user[8]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
