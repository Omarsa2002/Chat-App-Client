import classes from './notLogin.module.css'
import { Container, Title, Text, Button, Stack, SimpleGrid, Card } from '@mantine/core';

function NotLogin(){
    const features = [
        { title: 'Real-time Messaging', description: 'Experience instant messaging with zero delays.' },
        { title: 'Group Chats', description: 'Create and manage group conversations effortlessly.' },
        { title: 'Media Sharing', description: 'Share photos, videos, and files with your contacts.' },
    ];
    return(
        <div>
            <Container size="xl" style={{ textAlign: 'center', padding: '80px 0' }}>
                    <Title className={classes.title} order={1}>Welcome to Chat App</Title>
                    <Text className={classes.text} size="lg" mt="md">
                        Connect with your friends and family seamlessly.
                    </Text>
                    <Stack align="center" mt="xl">
                        <Button size="lg" onClick={()=>location.href = '/login'}>Get Started</Button>
                        <Button variant="outline" size="lg">Learn More</Button>
                    </Stack>
            </Container>
            <Container size="xl" py="xl">
                <SimpleGrid  type="container" cols={{ base: 1, '300px': 2, '500px': 3 }} spacing={{ base: 10, '300px': 'xl' }}>
                    {features.map((feature) => (
                        <Card className={classes.card} key={feature.title} shadow="sm" padding="lg">
                            <Title className={classes.title} order={3}>{feature.title}</Title>
                            <Text className={classes.text} mt="sm">{feature.description}</Text>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>
            <Container id='about' className={classes.about}>
                <Title className={classes.title} order={1}>About us</Title>
                <Text className={classes.text} size="lg" mt="md">
                    Welcome to ChatApp, your secure and modern communication platform designed for seamless connectivity. 
                    Whether you&apos;re catching up with friends, 
                    collaborating with colleagues, or building new connections, 
                    ChatApp empowers you to stay connected anytime, anywhere. 
                    With user privacy at the heart of our design, we ensure your 
                    conversations remain secure and private. Our intuitive interface, rich features, 
                    and cross-device compatibility make chatting more enjoyable and productive. 
                    Join us and experience a whole new way of communication, where every message matters!
                </Text>
            </Container>
        </div>
    )

}

export default NotLogin