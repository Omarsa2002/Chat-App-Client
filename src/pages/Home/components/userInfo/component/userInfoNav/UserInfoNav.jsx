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
  IconEdit,
  IconFile,
  IconLogout,
  IconSwitchHorizontal,
  IconTrash,
  IconUsersGroup,
  IconUserPlus
} from "@tabler/icons-react";
// import {
//   HTTP_METHODS,
//   httpRequest,
// } from "../../../../core/utils/httpRequest.js";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../../../../context/UserContext.jsx";
import { useEffect } from "react";

function UserInfoNav() {
  const navigate = useNavigate();
  const { userDetails, isLoading, fetchUserDetails, clearUserData } = useUser();

  function logout() {
    localStorage.clear();
    clearUserData().then(() => {
        location.href = "/login";  // Redirect after logout process is complete
    }).catch((err) => {
        console.error("Error during logout:", err);
    });
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

  useEffect(() => {
    if (!userDetails &&localStorage.length) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, userDetails]);
  if (isLoading) {
    return (
      <Container size="md" style={{ textAlign: 'center', padding: '100px 0' }}>
        <Text>Loading...</Text>
      </Container>
    );
  }
  return (
    <div className={classes.header}>
      <Container m={0} pl={0} className={classes.mainSection} size="xl">
        <Box display={"flex"} ml={8}  style={{justifyContent:"center", flexWrap:"wrap"}}>

          <Group gap={16} mr={5} >
            <Avatar
              src={userDetails?.profileImage || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"}
              alt={"fff"}
              radius="xl"
              size={40}
            />
            <div style={{ flex: 1 }}>
              {
                <>
                  <Box>
                    {userDetails.userName? (
                      <Text>{userDetails.userName} </Text>
                    ) : (
                    <Text>User</Text>
                    )}
                  </Box>
                  <Text c="dimmed" size="xs">
                    {userDetails.email}
                  </Text>
                </>
              }
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
                <IconUsersGroup
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors.green[6]}
                  stroke={1.5}
                />
                <Text>Friends</Text>
              </Link>

              {/* saved jobs */}
              <Link
                onClick={() => {
                  location.href = "/chat";
                }}
                className={classes.setting}
              >
                <IconUserPlus
                  style={{
                    width: rem(16),
                    height: rem(16),
                    marginRight: "3px",
                  }}
                  color={theme.colors.green[6]}
                  stroke={1.5}
                />
                <Text>Friends requests</Text>
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