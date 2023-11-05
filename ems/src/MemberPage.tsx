import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import "./MemberPage.css";

function MemberPage() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://sheets.googleapis.com/v4/spreadsheets/1yajpuM9YfEqlHgGbDxYVQOcHrFfJYoTho1b1qoOME6Y/values/%E3%82%B7%E3%83%BC%E3%83%881?key=AIzaSyBoGN_ggnHtfZrcL1FX81HSWzQirXL8eyg"
        );
        const result = await response.json();
        setData(result.values);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    }

    fetchData();
  }, [sortOrder]);

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="MemberBackGround">
      <Header />
      <SideMenu />
      <div className="sortBox">
        <Box sx={{ minWidth: 100 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="sorting-native">
              並べ替え
            </InputLabel>
            <NativeSelect
              defaultValue="asc"
              inputProps={{
                name: "sorting",
                id: "sorting-native",
              }}
            >
              <option value="asc">入社日昇順</option>
              <option value="desc">入社日降順</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
      <div className="profileArea">
        {data.map((row, index) =>
          index !== 0 ? (
            <div key={index} className="profileContainer">
              <div className="memberFhotFrame">
                <img
                  className="memberFhoto"
                  src={row[5] ? row[5] : "/Noimage.png"}
                  alt={`profile of employee ${index}`}
                />
              </div>
              <p className="employeeNumber">{row[0]}</p>
              <p className="employeeName">{row[1]}</p>
              <p className="employeeFurigana">{row[2]}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default MemberPage;
