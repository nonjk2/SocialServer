import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KaKaoRedirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`http://localhost:3001/kakaoLogin${code}`).then((r) => {
      console.log(r.data);
      console.log(r.token);
      localStorage.setItem('data', JSON.stringify(r.data));
      localStorage.setItem('token', r.data.token);
      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('data'));

      navigate('/');
    });
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default KaKaoRedirection;
