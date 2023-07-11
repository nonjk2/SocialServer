const jwt = require("jsonwebtoken");
const auth = require("../jwt/auth");
const refreshauth = require("../jwt/refreshauth");
const axios = require("axios");

module.exports = function(app, User)
{
  app.post('/kakaoLogin', async (req, res) => {
    const { code } = req.query;  // 클라이언트에서 보낸 code를 받아옵니다.
    const response = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: {
        grant_type: 'authorization_code',
        client_id: 'bfd587f21bee3c4013621c9d16b0b6d8',
        redirect_uri: 'http://localhost:3000/kakao/callback',
        code,
      },
    });

    const { access_token } = response.data;

    const userInfoResponse = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('유저인포 2번',userInfoResponse)

    let mongoUser = await User.findOne({ email: userInfoResponse.data.kakao_account.email, method:'kakao' });
    if (!mongoUser) {
      mongoUser = new User({
        email: userInfoResponse.data.kakao_account.email,
        nickName:userInfoResponse.data.properties.nickname,
        password:userInfoResponse.data.kakao_account.email,
        method:'kakao',
        profileUrl:userInfoResponse.data.properties.thumbnail_image,
        profileContent:'카카오로 회원가입 하였습니다.',
      });
      await mongoUser.save();
    }
    console.log('몽고유저 생성됨 카카오:',mongoUser)
    const payload = {
      email: mongoUser.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 30), //토큰 유효기간 30분
    };
    const refreshPayload = {
      email: mongoUser.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1), // Refresh token valid for 1 days
    };
    const token = jwt.sign(payload, 'jwtSecret');
    const refreshToken = jwt.sign(refreshPayload, 'jwtRefreshSecret');
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });

    return res.status(200).json({ data:userInfoResponse.data, token });
  });

  app.post('/naverLogin', async (req, res) => {
    const { code } = req.query;  // 클라이언트에서 보낸 code를 받아옵니다.
    const response = await axios({
      method: 'POST',
      url: 'https://nid.naver.com/oauth2.0/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: {
        grant_type: 'authorization_code',
        client_id: 'VeYNVSB0X3qWGYK7n8yS',
        client_secret:'9yS8Ddlssx',
        redirect_uri: 'http://localhost:3000/naver/callback',
        code,
      },
    });

    const { access_token } = response.data;

    const userInfoResponse = await axios({
      method: 'GET',
      url: 'https://openapi.naver.com/v1/nid/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('유저인포 2번',userInfoResponse.data)

    let mongoUser = await User.findOne({ email: userInfoResponse.data.response.email, method:'naver' });
    if (!mongoUser) {
      mongoUser = new User({
        email: userInfoResponse.data.response.email,
        nickName:userInfoResponse.data.response.nickname,
        password:userInfoResponse.data.response.email,
        method:'naver',
        profileUrl:userInfoResponse.data.response.profile_image,
        profileContent:'네이버로 회원가입 하였습니다.',
      });
      await mongoUser.save();
    }
    console.log('몽고유저 생성됨 네이버:',mongoUser)
    const payload = {
      email: mongoUser.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 30), //토큰 유효기간 30분
    };
    const refreshPayload = {
      email: mongoUser.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1), // Refresh token valid for 1 days
    };
    const token = jwt.sign(payload, 'jwtSecret');
    const refreshToken = jwt.sign(refreshPayload, 'jwtRefreshSecret');
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });

    return res.status(200).json({ data:userInfoResponse.data.response, token });
  });

  app.post('/googleLogin', async (req, res) => {
    const { code } = req.query;  // 클라이언트에서 보낸 code를 받아옵니다.
    const response = await axios({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: {
        grant_type: 'authorization_code',
        client_id: '305871425957-hgvbf3fdjga9cvbo00o9uh36sgf8auue.apps.googleusercontent.com',
        client_secret:'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',
        redirect_uri: 'http://localhost:3000/google/callback',
        code,
      },
    });

    const { access_token } = response.data;

    const userInfoResponse = await axios({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('유저인포 2번',userInfoResponse.data)

    let mongoUser = await User.findOne({ email: userInfoResponse.data.email , method:'google'});
    if (!mongoUser) {
      mongoUser = new User({
        email: userInfoResponse.data.email,
        nickName:userInfoResponse.data.name,
        password:userInfoResponse.data.email,
        method:'google',
        profileUrl:userInfoResponse.data.response.picture,
        profileContent:'구글로 회원가입 하였습니다.',
      });
      await mongoUser.save();
    }
    console.log('몽고유저 생성됨 구글:',mongoUser)
    const payload = {
      email: mongoUser.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 30), //토큰 유효기간 30분
    };
    const refreshPayload = {
      email: mongoUser.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1), // Refresh token valid for 1 days
    };
    const token = jwt.sign(payload, 'jwtSecret');
    const refreshToken = jwt.sign(refreshPayload, 'jwtRefreshSecret');
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });

    return res.status(200).json({ data:userInfoResponse.data, token });
  });

  app.get('/usertoken', auth, async (req, res) => { // auth 미들웨어 적용
    try {
      const user = await User.findOne({ email: req.user.email });
      console.log('액세스토큰',req.user.email)
      if (!user) res.status(404).send("No user found");
      const userResponse = user.toObject();
      delete userResponse.password;
      console.log(userResponse)
      return res.status(200).json({userResponse});
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/refreshToken',refreshauth, async (req, res) => { // auth 미들웨어 적용
    try {
      console.log('리프레시토큰',req.user.email)
      const payload = {
        email: req.user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 30), //토큰 유효기간 30분
      };
      const token = jwt.sign(payload, 'jwtRefreshSecret');
      return res.status(200).json({token});
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post("/user/logout", (req, res) => {
      res.cookie('refreshToken', '', { expires: new Date(0), httpOnly: true, sameSite: 'None', secure: true });
      res.send("ok");
  });
}
