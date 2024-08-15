"use client";

import React, { useState } from "react";
import { Button, Typography, Box, Container, Paper } from "@mui/material";
import { X } from "lucide-react";
import Home from "./chat";

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {!isChatOpen ? (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              align="center"
              sx={{ color: "#FE6B8B" }}
            >
              Welcome to AI Customer Support
            </Typography>
            <Typography
              variant="h5"
              paragraph
              align="center"
              sx={{ maxWidth: 600, mb: 4, color: "#FF8E53" }}
            >
              We're here to help you with any questions or issues you might
              have. Click the button below to start chatting with our AI
              assistant.
            </Typography>
            <Button
              onClick={() => setIsChatOpen(true)}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#FE6B8B",
                "&:hover": {
                  backgroundColor: "#FF8E53",
                },
              }}
            >
              Open Chat Support
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              width: "100%",
              maxWidth: 600,
              height: "80vh",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              margin: "auto",
              backgroundColor: "#f0f0f0",
            }}
          >
            <Box
              sx={{
                bgcolor: "#FE6B8B",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                Customer Support Chat
              </Typography>
              <Button
                onClick={() => setIsChatOpen(false)}
                sx={{ color: "white" }}
                size="small"
              >
                <X />
              </Button>
            </Box>
            <Box sx={{ height: "calc(80vh - 56px)" }}>
              <Home />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
