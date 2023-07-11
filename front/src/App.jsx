import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import Main from "./layout/Main/Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GoogleLogin from "./pages/Google/GoogleLogin";
import GoogleRedirection from "./pages/Google/Redirection";
import KaKaoRedirection from "./pages/KaKao/Redirection";
import KaKaoLogin from "./pages/KaKao/KaKaoLogin";
import NaverRedirection from "./pages/Naver/Redirection";
import NaverLogin from "./pages/Naver/NaverLogin";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element=<Main/>/>
          <Route path='/GoogleLogin' element=<GoogleLogin/>/>
          <Route path='/KaKaoLogin' element=<KaKaoLogin/>/>
          <Route path='/NaverLogin' element=<NaverLogin/>/>
          <Route path='/kakao/callback' element=<KaKaoRedirection />/>
          <Route path='/google/callback' element=<GoogleRedirection />/>
          <Route path='/naver/callback' element=<NaverRedirection />/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;