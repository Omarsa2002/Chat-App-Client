import classes from './AppHeader.module.css';
import { Group, Button, Box, Text,  Burger, Drawer, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { UserInfo } from '../../Home/components/userInfo/UserInfo';
import UserInfoNav from '../../Home/components/userInfo/component/userInfoNav/UserInfoNav'
import Search from '../../Home/components/userInfo/component/search/Search'
import { useNavigate } from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%" className={classes.group}>
                    <Box
                        onClick={() => {
                            location.href = "/";
                        }}
                        display={"flex"}
                        className={classes.logoBox}
                        style={{ alignItems: "center", cursor: "pointer" }}
                    >
                        <img
                            className={classes.image}
                            src="https://icon-library.com/images/icon-for-chat/icon-for-chat-21.jpg"
                        />
                        <Box ml={-50}>
                            <Text className={classes.Chat} fz={25} fw={700}>
                                Chat
                            </Text>
                            <Text className={classes.App} fz={25} fw={700} mt={-13}>
                                App
                            </Text>
                        </Box>
                    </Box>
                    <Box className={classes.buttonContainer}>
                        {localStorage.length ? 
                            (
                                <>
                                    <Search/>
                                    <UserInfo/>
                                </>
                            ):(
                            <Group
                                visibleFrom="md"
                                justify="flex-end"
                                className={classes.group}
                            >
                                <Button className={classes.button} onClick={() => navigate('/login')}>Login</Button>
                                <Button className={classes.button} onClick={() => navigate('/signup')}>Sign up</Button>
                                <Button className={classes.button} onClick={() => location.href='/#about'}>About</Button>
                            </Group>
                        )}
                    </Box>
                    <Burger
                        color='var(--primary-color)'
                        lineSize={4}
                        size="xl"
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom="md"
                    />
                </Group>
            </header>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="50%"
                padding="md"
                title="Menu"
                hiddenFrom="md"
                zIndex={1000000}
                radius="md"
                transitionProps={{ transition: 'rotate-left', duration: 150, timingFunction: 'linear' }}
                shadow="3px 2px 6px var(--primary-color)"
                styles={{
                    header: {
                        backgroundColor: 'var(--first-color)',
                        color: 'white',
                        boxShadow:"0 2px 4px var(--primary-color)"
                    },
                    title:{
                        fontSize: '20px',
                    },
                    body: {
                        backgroundColor: 'var(--background-latest)',
                        color: 'var(--second-color)'
                    },
                    footer: {
                        backgroundColor: 'var(--first-color)',
                    },
                    close: {
                        color: 'var(--primary-color)',
                        transform: 'scale(1.5)'
                    },
                }}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    {localStorage.length ? (
                        <UserInfoNav />
                    ) : (
                    <Box style={{display:"block"}}>
                        {/* <Group justify="center" grow pb="xl" px="md"> */}
                            <Button className={classes.button} onClick={() => navigate('/login')}>Login</Button>
                            <Button className={classes.button} onClick={() => navigate('/signup')}>Sign up</Button>
                            <Button className={classes.button} onClick={() => location.href='/#about'}>About</Button>
                        {/* </Group> */}
                    </Box>
                    )}
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default AppHeader;
