"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the AI support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f0f0f0",
      }}
    >
      <Stack
        sx={{
          flexGrow: 1,
          overflow: "auto",
          p: 2,
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(254, 107, 139, 0.5)",
            borderRadius: "10px",
          },
        }}
        spacing={2}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.role === "assistant" ? "flex-start" : "flex-end",
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 4,
                maxWidth: "70%",
                wordBreak: "break-word",
                bgcolor: message.role === "assistant" ? "#FE6B8B" : "#FF8E53",
                color: "white",
              }}
            >
              <Typography variant="body1">{message.content}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ p: 2, bgcolor: "white" }}>
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#FE6B8B",
              },
              "&:hover fieldset": {
                borderColor: "#FF8E53",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FF8E53",
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          disabled={isLoading}
          sx={{
            bgcolor: "#FE6B8B",
            "&:hover": {
              bgcolor: "#FF8E53",
            },
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </Stack>
    </Box>
  );
}
