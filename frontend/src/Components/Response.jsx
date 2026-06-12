import React from 'react';
import Service from '../utils/http';
import { Anchor, Button, Card, Text, Group, Title, Space } from '@mantine/core';


const service = new Service();


export default function Response(props) {
 const baseUrl = service.getBaseURL();
 const redirectUrl = `${baseUrl}/api/s/${props?.response?.shortCode}`;


 return (
   <Card shadow="md" radius="md" withBorder p="lg" mt="xl" style={{ maxWidth: 500, margin: '0 auto' }}>
     <Title order={4} mb="sm">Shortened URL</Title>


     <Text mb="sm">
       Here is your shortened URL:
     </Text>


     <Anchor href={redirectUrl} target="_blank" size="lg" weight={600} color="blue">
       {redirectUrl}
     </Anchor>


     <Space h="md" />


     <Group position="right">
       <Button variant="outline" color="red" onClick={() => props.setResponse(null)}>
         Clear Response
       </Button>
     </Group>
   </Card>
 );
}

