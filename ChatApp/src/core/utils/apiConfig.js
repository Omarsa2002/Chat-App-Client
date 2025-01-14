const API_CONFIG = {
  //baseUrl: "",
  baseUrl: "http://localhost:3000/api/v1/",
  socketConnection:"http://localhost:3000",
  secretKey:"",
  endpoints: {
      auth: {
          login: "auth/login",
          signup: "auth/signup",
          resendCode: "auth/resendcode",
          confirmEmail:"auth/verifyemail",
          forgetPassword: "auth/forgetPassword",
          setPassword: "auth/setPassword",
          logout: "auth/logout",
      },
      user:{
        allUsers: "user/users",
        userDetails: "user/userdata",
        sendFriendRequest: "user/sendfriendrequest",
        acceptFriendRequest: "user/acceptfriendrequest",
        cancelFriendRequest: "user/cancelfriendrequest",
        refuseFriendRequest: "user/refusefriendrequest",
        removeFriend: "user/removefriend"
      },
      chat:{
        getChat:"chat/chatmessages"
      }
  },
};
export default API_CONFIG;
