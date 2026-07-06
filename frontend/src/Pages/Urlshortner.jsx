
import React, { useState } from 'react';
import Service from '../utils/http';
import Response from '../Components/Response';
import {
  Button,
  Card,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
  Center,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconLink, IconSparkles } from '@tabler/icons-react';

const service = new Service();

export default function UrlShortener() {
  const [input, setInput] = useState({
    originalUrl: "",
    customUrl: "",
    expiresAt: "",
    title: ""
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const generateShortUrl = async () => {
    if (!input.originalUrl) {
      showNotification({
        title: "Validation Error",
        message: "Original URL is required",
        color: "yellow",
      });
      return;
    }

    try {
      setLoading(true);
      const data = await service.post("s", input);
      setResponse(data);
      showNotification({
        title: "Success",
        message: "Short URL generated successfully!",
        color: "green",
      });
    } catch (error) {
      console.error("Error generating short URL:", error);
      showNotification({
        title: "Generation Failed",
        message: error.response?.data?.message || "Something went wrong while shortening the URL.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

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
        {!response ? (
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
            <Center mb="sm">
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <IconLink size={24} color="white" />
              </div>
            </Center>

            <Title order={2} style={{ textAlign: "center", color: "#2c3e50", fontWeight: 700 }} mb="xs">
              Trim Your URL
            </Title>
            <Text size="sm" c="dimmed" style={{ textAlign: "center" }} mb="xl">
              Create clean, memorable, and trackable links in seconds.
            </Text>

            <Stack gap="md">
              <TextInput
                size="md"
                label="Long URL"
                required
                placeholder="https://example.com/very-long-url-path"
                value={input.originalUrl}
                onChange={(e) => setInput({ ...input, originalUrl: e.target.value })}
              />

              <TextInput
                size="md"
                label="Custom Alias (Optional)"
                placeholder="my-custom-link"
                description="Custom letters or numbers at the end of the URL"
                value={input.customUrl}
                onChange={(e) => setInput({ ...input, customUrl: e.target.value })}
              />

              <TextInput
                size="md"
                label="Link Title (Optional)"
                placeholder="My Work Document"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />

              <TextInput
                size="md"
                type="date"
                label="Expiration Date (Optional)"
                description="When should the link stop working?"
                value={input.expiresAt}
                onChange={(e) => setInput({ ...input, expiresAt: e.target.value })}
              />

              <Button
                onClick={generateShortUrl}
                size="md"
                radius="md"
                mt="md"
                loading={loading}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                leftSection={<IconSparkles size={16} />}
              >
                Shorten Link
              </Button>
            </Stack>
          </Card>
        ) : (
          <Response response={response} setResponse={setResponse} originalUrl={input.originalUrl} />
        )}
      </Container>
    </div>
  );
}

