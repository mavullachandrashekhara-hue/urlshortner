import React, { useEffect, useState } from 'react';
import Service from '../utils/http';
import {
  Avatar,
  Card,
  Container,
  Stack,
  Text,
  Title,
  Group,
  Badge,
  Divider,
  Loader,
} from '@mantine/core';
import { IconMail, IconUser, IconCalendar, IconShield } from '@tabler/icons-react';

const service = new Service();

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getProfileData() {
    try {
      setLoading(true);
      const data = await service.get("user/me");
      if (data) {
        setProfileData(data);
      } else {
        setError("Could not retrieve profile data.");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfileData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "calc(100vh - 60px)",
          width: "100%",
          background: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack align="center" gap="md">
          <Loader size="xl" color="blue" type="bars" />
          <Text c="dimmed" fw={500}>Loading your profile...</Text>
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: "calc(100vh - 60px)",
          width: "100%",
          background: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card shadow="xl" radius="lg" p="xl" style={{ maxWidth: 400, textAlign: "center" }}>
          <Text c="red" fw={700} size="lg" mb="sm">Error Loading Profile</Text>
          <Text size="sm" mb="md">{error}</Text>
          <Badge color="red" variant="light" size="lg" style={{ cursor: 'pointer' }} onClick={getProfileData}>
            Try Again
          </Badge>
        </Card>
      </div>
    );
  }

  const joinDate = profileData?.createdAt
    ? new Date(profileData.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : "Recently";

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        width: "100%",
        background: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <Container size="xs" style={{ width: "100%" }}>
        <Card
          shadow="xl"
          radius="xl"
          p="xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Stack align="center" gap="md" mb="lg">
            <div
              style={{
                position: "relative",
                padding: "4px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7f5a83 0%, #0d324d 74%)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Avatar
                size={110}
                radius={110}
                src={profileData?.avatar}
                alt={profileData?.name}
              />
            </div>

            <Title order={2} style={{ color: "#2c3e50", fontWeight: 700 }}>
              {profileData?.name}
            </Title>
            <Badge
              size="lg"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              style={{ textTransform: "uppercase", letterSpacing: "1px" }}
            >
              {profileData?.role || 'User'}
            </Badge>
          </Stack>

          <Divider my="sm" />

          <Stack gap="md" mt="md">
            <Group justify="space-between" wrap="nowrap">
              <Group gap="xs">
                <IconUser size={18} color="#7f8c8d" />
                <Text fw={500} c="dimmed" size="sm">Full Name</Text>
              </Group>
              <Text fw={600} size="sm" c="dark" style={{ textTransform: 'capitalize' }}>
                {profileData?.name}
              </Text>
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <Group gap="xs">
                <IconMail size={18} color="#7f8c8d" />
                <Text fw={500} c="dimmed" size="sm">Email Address</Text>
              </Group>
              <Text fw={600} size="sm" c="dark">
                {profileData?.email}
              </Text>
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <Group gap="xs">
                <IconCalendar size={18} color="#7f8c8d" />
                <Text fw={500} c="dimmed" size="sm">Member Since</Text>
              </Group>
              <Text fw={600} size="sm" c="dark">
                {joinDate}
              </Text>
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <Group gap="xs">
                <IconShield size={18} color="#7f8c8d" />
                <Text fw={500} c="dimmed" size="sm">Status</Text>
              </Group>
              <Badge color="green" variant="light" size="sm">
                Active
              </Badge>
            </Group>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}
