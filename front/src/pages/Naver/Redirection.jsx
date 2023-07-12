import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverRedirection = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  console.log(code);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .post(`http://localhost:3001/naverLogin`, {
          code: code,
        })
        .then((r) => {
          console.log(r.data);
          console.log(r.token);
          localStorage.setItem("data", JSON.stringify(r.data));
          localStorage.setItem("token", r.data.token);
          console.log(localStorage.getItem("token"));
          console.log(localStorage.getItem("data"));
          navigate("/");
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, [code, navigate]);

  return <div>로그인 중입니다.</div>;
};

export default NaverRedirection;
