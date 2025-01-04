import classes from "./UserInfoNav.module.css";

import {
  Avatar,
  Box,
  // Burger,
  Container,
  Group,
  rem,
  Text,
  useMantineTheme,
} from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandTelegram,
  IconEdit,
  IconFile,
  IconLogout,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
// import {
//   HTTP_METHODS,
//   httpRequest,
// } from "../../../../core/utils/httpRequest.js";
import APP_CONFIG from "../../../../../../core/utils/apiConfig.js";
import { Link, useNavigate } from "react-router-dom";
import {
  HTTP_METHODS,
  httpRequest,
} from "../../../../../../core/utils/httpRequest";

function UserInfoNav() {
  const navigate = useNavigate();
  const user = localStorage.getItem("userInfo");
  const userData = JSON.parse(user);

  function logout() {
    // navigate to login page
    if (JSON.parse(localStorage.getItem("userInfo")).data.userId) {
      location.href = "LoginUser";
    } else if (JSON.parse(localStorage.getItem("userInfo")).data.companyId) {
      location.href = "LoginCompanies";
    } else {
      location.href = "LoginUser";
    }
    localStorage.clear();
    httpRequest(APP_CONFIG.endpoints.user.logout, HTTP_METHODS.POST).then(
      (res) => {
        console.log(res);
      }
    );
  }

  const handleChangePassword = () => {
    navigate("/changePassword");
  };
  const handleProfile = () => {
    navigate("/edite_user_profile");
  };
  const handleApplication = () => {
    navigate("/user/myapps");
  };

  const handleDeleteAccount = () => {
    navigate("/delete_account");
  };

  const theme = useMantineTheme();
 

  return (
    <div className={classes.header}>
      <Container m={0} pl={0} className={classes.mainSection} size="xl">
        <Box display={"flex"} ml={8}  style={{justifyContent:"center", flexWrap:"wrap"}}>

          <Group gap={16} mr={5} >
            <Avatar
              src={
                userData.data.profileImage
              }
              alt={"fff"}
              radius="xl"
              size={40}
            />
            <div style={{ flex: 1 }}>
              {user ? (
                <>
                  <Box>
                    {userData.data.userName? (
                      <Text>{userData.data.userName} </Text>
                    ) : (
                    <Text>User</Text>
                    )}
                  </Box>
                  <Text c="dimmed" size="xs">
                    {userData.email}
                  </Text>
                </>
              ) : (
                <>Company</>
              )}
            </div>
          </Group>

          <Box
            className={classes.profile}
          >
          
              <Link
                onClick={() => {
                  navigate("/user_profile");
                }}
                className={classes.setting}
              >
                <IconFile
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
                <Text>Profile</Text>
              </Link>

              <Link onClick={handleProfile} className={classes.setting}>
                <IconEdit
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
                <Text>Edit Profile</Text>
              </Link>

              {/* user || company application */}
              <Link onClick={handleApplication} className={classes.setting}>
                <IconFile
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors.green[6]}
                  stroke={1.5}
                />
                <Text>My Application</Text>
              </Link>

              {/* saved jobs */}
              <Link
                onClick={() => {
                  location.href = "/chat";
                }}
                className={classes.setting}
              >
                <IconBrandTelegram
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors.green[6]}
                  stroke={1.5}
                />
                <Text>Chat</Text>
              </Link>

              <Link
                onClick={() => {
                  location.href = "/favorite";
                }}
                className={classes.setting}
              >
                <IconStar
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
                <Text>Favorite</Text>
              </Link>
         
              {/* saved jobs */}

              {/* <Menu trigger="hover"> */}

              <Link onClick={handleChangePassword} className={classes.setting}>
                <IconSwitchHorizontal
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors[6]}
                  stroke={1.5}
                />
                <Text> Change Password</Text>
              </Link>

              <Link
                color="red"
                onClick={handleDeleteAccount}
                className={classes.setting}
              >
                <IconTrash
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
                <Text>Delete Acoount</Text>
              </Link>

              <Link
                onClick={() => {
                  logout();
                }}
                className={classes.setting}
              >
                <IconLogout
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  stroke={1.5}
                />
                <Text>Logout</Text>
              </Link>
            </Box>

        </Box>
      </Container>
    </div>
  );
}

export default UserInfoNav