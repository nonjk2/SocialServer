import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import Header from "../Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {GlobalStyle, LayOut, MainContainer, Parent,} from "./style";
import {getAuthToken} from "../../api/user";
import {authUser} from "../../redux/reducers/userSlice";
import Profile from "../../components/Profile/Profile";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user)
  const { isError:tokenError, data:userData ,isSuccess:tokenSuccess} = useQuery('user',getAuthToken, { cacheTime: 0 })

  useEffect(() => {
    if(tokenSuccess) {
      dispatch(authUser(userData));
    }else if(user.token===undefined){
      navigate("/GoogleLogin");
    }
  }, [user.token,tokenSuccess]);

  if (tokenError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <div id='root'>
      <GlobalStyle/>
      <LayOut>
        <Header title={'The Todo'} stack={'React'} user={user}/>
        <MainContainer>
          {tokenSuccess&&<Profile userData={userData.userResponse}/>}
        </MainContainer>
      </LayOut>
    </div>
  );
};

export default Main;