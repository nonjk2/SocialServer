import axios from 'axios';
import React, { useState } from 'react';

const KaKaoLogin = () => {
  const REST_API_KEY = 'bfd587f21bee3c4013621c9d16b0b6d8';
  const REDIRECT_URI = 'http://localhost:3000/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button type='button' onClick={loginHandler}>
      로그인 하기
    </button>
  );
};

export default KaKaoLogin;
