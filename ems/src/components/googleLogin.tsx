import React from "react";

const CLIENT_ID =
  "592132542563-mebnha0jv0i0a4li6rvhnrqtgu30reef.apps.googleusercontent.com.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:3000/login";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&prompt=consent&response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      SCOPE
    )}&access_type=offline`;
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;