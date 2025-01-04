import classes from './footer.module.css'
import { ActionIcon, Box, Container, Group, rem, Text } from "@mantine/core";
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";

const data = [
    {
        title: "About",
        links: [
            { label: "Features", link: "#" },
            { label: "Pricing", link: "#" },
            { label: "Support", link: "#" },
            { label: "Forums", link: "#" },
        ],
    },
    {
        title: "Project",
        links: [
            { label: "Contribute", link: "#" },
            { label: "Media assets", link: "#" },
            { label: "Changelog", link: "#" },
            { label: "Releases", link: "#" },
        ],
    },
    {
        title: "Community",
        links: [
            { label: "Follow on Twitter", link: "#" },
            { label: "Email newsletter", link: "#" },
            { label: "GitHub discussions", link: "#" },
        ],
    },
];

function AppFooter(){
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
                c={"white"}
            >
                {link.label}
            </Text>
        ))
        return (
            <div
                className={classes.wrapper}
                key={group.title}
                style={{ color: "white" }}
            >
                <Text className={classes.title} c={"white"}>
                    {group.title}
                </Text>
                {links}
            </div>
        );
    })
    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Box
                        onClick={() => {
                            location.href = "/";
                        }}
                        me={50}
                        display={"flex"}
                        style={{ alignItems: "center", cursor: "pointer", gap:"60px" }}
                    >
                        <img
                            src={"https://icon-library.com/images/icon-for-chat/icon-for-chat-21.jpg"}
                            alt=""
                            width={"50px"}
                            height={"50px"}
                        />
                            <Box ml={-50}>
                                <Text className={classes.inter} fz={25} fw={700}>
                                    Chat
                                </Text>
                                <Text
                                    className={classes.hub}
                                    c={"white"}
                                    fz={25}
                                    fw={700}
                                    mt={-13}
                                >
                                    App
                                </Text>
                            </Box>
                    </Box>
                    <Text
                        ta={"center"}
                        size="xs"
                        c="white"
                        className={classes.description}
                    >
                        Build fully functional accessible web applications faster than ever
                    </Text>
                </div>
                    
                <div className={classes.groups} style={{ color: "white" }}>
                    {groups}
                </div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="white" size="sm">© 2025 ChatApp. All rights reserved.</Text>
                <Group
                    gap={0}
                    className={classes.social}
                    justify="flex-end"
                    wrap="nowrap"
                >
                    <ActionIcon size="lg" color="white" variant="subtle">
                        <IconBrandTwitter
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={2.0}
                        />
                    </ActionIcon>
                    <ActionIcon size="lg" color="white" variant="subtle">
                        <IconBrandYoutube
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={2.0}
                        />
                    </ActionIcon>
                    <ActionIcon size="lg" color="white" variant="subtle">
                        <IconBrandInstagram
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={2.0}
                        />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
        // <div className={classes.footer}>
        //     <Container size="xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //         <Text>© 2025 ChatApp. All rights reserved.</Text>
        //         <Group>
        //             <Text className={classes.text}>Privacy Policy</Text>
        //             <Text className={classes.text}>Terms of Service</Text>
        //         </Group>
        //     </Container>
        // </div>
    )
}

export default AppFooter