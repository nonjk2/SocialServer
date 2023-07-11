import {ProfileContainer, ProfilePicture, UserName} from "./style";
import {useNavigate} from "react-router-dom";
import useMutate from "../../hooks/useMutate";
import { userLogOut} from "../../api/user";
import { logOutUser} from "../../redux/reducers/userSlice";
import {useCallback, useEffect} from "react";
import CustomButton from "../CustomButton/CustomButton";

const Profile =({userData})=>{
  const navigate = useNavigate();
  const logOut_mutate= useMutate(userLogOut,'user',logOutUser)
  const onLogOut = useCallback(()=>{
    logOut_mutate.mutate()
  },[])
  useEffect(() => {
    if (logOut_mutate.isSuccess) {
      navigate("/");
    }
  }, [logOut_mutate.isSuccess, navigate]);
  return(<div>
    <ProfileContainer className="profile block">
      <ProfilePicture >
        {userData!==null ?
            <img src={`${userData.profileUrl}`} style={{ width: '200px' }} alt={userData.profileUrl} />
         : <img width="150px" alt="Anne Hathaway picture" src="https://avatars.githubusercontent.com/u/32028454?s=400&u=7993b49546f6ebb45968dbafa6c97c5789ec2254&v=4" />
        }
      </ProfilePicture>
      <UserName >{userData.nickName}</UserName>
      <UserName >{userData.email}</UserName>
      <div className="profile-description">
        <p className="scnd-font-color">{userData.profileContent}</p>
      </div>
      <CustomButton theme={'type2'} size={'small'} onClick={onLogOut}>LogOut</CustomButton>
    </ProfileContainer>
  </div>)
}

export default Profile