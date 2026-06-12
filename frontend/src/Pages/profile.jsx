import React, { useEffect, useState } from 'react'
import Service from '../utils/http'
import { Avatar, Container, Stack, Text } from '@mantine/core';
const service = new Service();
export default function Profile() {
  const [profileData, setProfileData] = useState(null);

  async function getProfileData() {
    let data = await service.get("user/me");
    setProfileData(data);
    console.log(data);
  }

  useEffect(() => {
    getProfileData();
  }, [])

  return (
    <Container size={"sm"}>
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="lg"
      >
        <Avatar size={"xl"} radius={"xl"} src={profileData?.avatar} ></Avatar>
        <Text tt=""><b>Email :</b>{profileData?.email}</Text>
        <Text tt="capitalize"><b>Name :</b> {profileData?.name}</Text>
      </Stack>
    </Container>
  )
}
