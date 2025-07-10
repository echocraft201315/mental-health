"use client";
import { useEffect, useState } from "react";

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
      if (!alertShown) {
        alert("You can install this app for a better experience! Click the 'Install App' button.");
        setAlertShown(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [alertShown]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowButton(false);
      setDeferredPrompt(null);
    }
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleInstall}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        padding: "12px 24px",
        background: "#0ca5f2",
        color: "white",
        border: "none",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        fontSize: 16,
        cursor: "pointer"
      }}
    >
      Install App
    </button>
  );
} 