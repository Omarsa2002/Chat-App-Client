import classes from "./UserInfo.module.css";

import cx from "clsx";
import { useState } from "react";
import {
  Avatar,
  Box,
  Burger,
  Container,
  Group,
  Menu,
  rem,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandTelegram,
  IconChevronDown,
  IconEdit,
  IconFile,
  IconLogout,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import {
  HTTP_METHODS,
  httpRequest,
  contentType
} from "../../../../core/utils/httpRequest.js";
import APP_CONFIG from "../../../../core/utils/apiConfig.js";
import { useNavigate } from "react-router-dom";

export function UserInfo() {
  const navigate = useNavigate();
  const user = localStorage.getItem("userInfo");
  const userData = JSON.parse(user);

  function logout() {
    localStorage.clear();
      httpRequest(APP_CONFIG.endpoints.auth.logout, HTTP_METHODS.POST, contentType.appJson).then(
      (res) => {
        console.log(res);
        //   location.href = "login";
      }
    ).catch(
      (error) => {
        console.error("Logout request failed", error);
        //   location.href = "login";
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
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
      <div className={classes.header}>
        <Container m={0} pl={0} className={classes.mainSection} size="md">
          <Group justify="space-between">
            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
              radius='5px'
              offset={20}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group gap={16}>
                    <Box></Box>
                    <Avatar
                      src={userData?.data?.profileImage || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"}
                      alt="User Avatar"
                      radius="xl"
                      size={40}
                    />
                    <div style={{ flex: 1 }}>
                      <Box>
                        {userData.data.userName ? (
                          <Text>{userData.data.userName}</Text>
                        ) : (
                          <Text size="sm" fw={500}>user</Text>
                        )}
                      </Box>
                      <Text c="dimmed" size="xs">
                        {userData.email}
                      </Text>
                    </div>
                    <IconChevronDown style={{ width: rem(15), height: rem(15) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => navigate("/user_profile")}
                  leftSection={<IconFile style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} stroke={1.5} />}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  onClick={handleProfile}
                  leftSection={<IconEdit style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} stroke={1.5} />}
                >
                  Edit Profile
                </Menu.Item>
                <Menu.Item
                  onClick={handleApplication}
                  leftSection={<IconFile style={{ width: rem(16), height: rem(16) }} color={theme.colors.green[6]} stroke={1.5} />}
                >
                  My Application
                </Menu.Item>
                <Menu.Item
                  onClick={() => { location.href = "/chat"; }}
                  leftSection={<IconBrandTelegram style={{ width: rem(16), height: rem(16) }} color={theme.colors.green[6]} stroke={1.5} />}
                >
                  Chat
                </Menu.Item>
                <Menu.Item
                  onClick={() => { location.href = "/favorite"; }}
                  leftSection={<IconStar style={{ width: rem(16), height: rem(16) }} color={theme.colors.yellow[6]} stroke={1.5} />}
                >
                  Favorite
                </Menu.Item>
                <Menu.Label>Settings</Menu.Label>
                <Menu trigger="hover">
                  <Menu.Target>
                    <Group>
                      <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                        Account settings
                        <IconChevronDown size="0.9rem" style={{ marginLeft: "15px" }} stroke={1.5} />
                      </Menu.Item>
                    </Group>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={handleChangePassword}
                      leftSection={<IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} color={theme.colors[6]} stroke={1.5} />}
                    >
                      Change Password
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      onClick={handleDeleteAccount}
                      leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} stroke={1.5} />}
                    >
                      Delete Account
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <Menu.Item
                  onClick={logout}
                  leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </div>
  );
}
