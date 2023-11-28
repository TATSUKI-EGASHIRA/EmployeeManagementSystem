import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CLIENT_ID = "592132542563-mebnha0jv0i0a4li6rvhnrqtgu30reef.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/LoginCallback";

const LoginCallback: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchAccessToken(code);
    } else {
      history.push('/login'); // 認証コードがない場合はログインページにリダイレクト
    }
  }, [history]);

  const fetchAccessToken = async (code: string) => {
    const tokenUrl = `https://oauth2.googleapis.com/token`;
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();
    console.log(data); // 追加されたデバッグ情報
    localStorage.setItem('accessToken', data.access_token);

    history.push('/login'); // アクセストークン取得後のリダイレクト先
  };

  return <div>Loading...</div>;
};

export default LoginCallback;
