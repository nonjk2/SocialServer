import axios from 'axios';
import React, { useState } from 'react';

const NaverLogin = () => {
  const NAVER_CLIENT_ID='VeYNVSB0X3qWGYK7n8yS'
  const NAVER_CLIENT_SECRET='9yS8Ddlssx'
  const REDIRECT_URI = 'http://localhost:3000/naver/callback';
  const link = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button type='button' onClick={loginHandler}>
      로그인 하기
    </button>
  );
};

export default NaverLogin;

