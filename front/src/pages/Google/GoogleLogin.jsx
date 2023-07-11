import axios from 'axios';
import React, { useState } from 'react';

const GoogleLogin = () => {
  const REST_API_KEY = '305871425957-hgvbf3fdjga9cvbo00o9uh36sgf8auue.apps.googleusercontent.com';
  const GOOGLE_CLIENT_SECRET='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';
  const REDIRECT_URI = 'http://localhost:3000/google/callback';
  const SCOPE = 'email%20profile';
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button type='button' onClick={loginHandler}>
      로그인 하기
    </button>
  );
};

export default GoogleLogin;