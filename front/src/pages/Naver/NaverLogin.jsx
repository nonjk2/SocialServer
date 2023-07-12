import { useEffect } from "react";

const NaverLogin = () => {
  const NAVER_CLIENT_ID = "UHsA9WPc45locmpxyvMT";
  const NAVER_CLIENT_SECRET = "jJi0n67vub";
  const REDIRECT_URI = "http://localhost:3000/naver/callback";
  const link = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&response_type=code&state=test`;

  // 로그인핸들러
  const code = new URL(window.location.href).searchParams.get("code");
  const loginHandler = async () => {
    // 링크
    window.location.href = link;
    // await

    // const response = await api.post(`/user/login`, loginUser);
  };

  useEffect(() => {
    console.log(code);
  }, [code]);

  return (
    <button type="button" onClick={loginHandler}>
      로그인 하기
    </button>
  );
};

export default NaverLogin;
