import React from 'react';
import Service from '../utils/http';
import {
  Anchor,
  Button,
  Card,
  Text,
  Group,
  Title,
  Space,
  Stack,
  TextInput,
  ActionIcon,
  Tooltip,
  Divider,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCopy, IconDownload, IconArrowLeft, IconQrcode, IconExternalLink } from '@tabler/icons-react';

const service = new Service();

export default function Response(props) {
  const baseUrl = service.getBaseURL();
  const redirectUrl = `${baseUrl}/api/s/${props?.response?.shortCode}`;
  
  const longUrl = props.originalUrl || props.response?.originalUrl || "";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(longUrl)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(redirectUrl);
    showNotification({
      title: "Copied!",
      message: "Shortened URL copied to clipboard.",
      color: "green",
    });
  };

  const downloadQRCode = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `qrcode_${props.response?.shortCode || 'shorturl'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      showNotification({
        title: "Downloaded",
        message: "QR Code image downloaded successfully!",
        color: "green",
      });
    } catch (error) {
      console.error("Error downloading QR code:", error);
      window.open(qrCodeUrl, "_blank");
    }
  };

  const formattedExpiry = props.response?.expiresAt
    ? new Date(props.response.expiresAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Card
      shadow="xl"
      radius="xl"
      p="xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Title order={3} style={{ color: "#2c3e50", fontWeight: 700 }} mb="sm">
        Short Link Created!
      </Title>

      <Text size="sm" c="dimmed" mb="lg">
        Your link has been successfully trimmed and is ready to share.
      </Text>

      <Stack gap="md">
        <div>
          <Text size="xs" fw={700} c="dimmed" mb={5} style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Shortened URL
          </Text>
          <Group gap="xs" wrap="nowrap">
            <TextInput
              style={{ flex: 1 }}
              value={redirectUrl}
              readOnly
              size="md"
              radius="md"
            />
            <Tooltip label="Copy Link">
              <ActionIcon onClick={copyToClipboard} size="lg" radius="md" variant="light" color="indigo">
                <IconCopy size={18} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Open Link">
              <ActionIcon component="a" href={redirectUrl} target="_blank" size="lg" radius="md" variant="light" color="blue">
                <IconExternalLink size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </div>

        {props.response?.title && (
          <div>
            <Text size="xs" fw={700} c="dimmed" mb={2} style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Link Title
            </Text>
            <Text size="sm" fw={600} c="dark">
              {props.response.title}
            </Text>
          </div>
        )}

        {formattedExpiry && (
          <div>
            <Text size="xs" fw={700} c="dimmed" mb={2} style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Expires On
            </Text>
            <Text size="sm" fw={600} c="red">
              {formattedExpiry}
            </Text>
          </div>
        )}

        <Divider my="sm" />

        <Stack align="center" gap="sm">
          <Text size="xs" fw={700} c="dimmed" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
            QR Code for Long URL
          </Text>
          <div
            style={{
              padding: "12px",
              borderRadius: "16px",
              backgroundColor: "white",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={qrCodeUrl}
              alt="QR Code"
              style={{ width: 180, height: 180, display: "block" }}
            />
          </div>
          <Button
            variant="light"
            color="indigo"
            radius="md"
            size="sm"
            leftSection={<IconDownload size={16} />}
            onClick={downloadQRCode}
            mt="xs"
          >
            Download QR Code
          </Button>
        </Stack>

        <Divider my="sm" />

        <Button
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => props.setResponse(null)}
          radius="md"
        >
          Create Another Link
        </Button>
      </Stack>
    </Card>
  );
}

