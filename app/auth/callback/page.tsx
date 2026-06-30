"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/Appwrite";
import { useRouter } from "next/navigation";
import { Terminal } from "lucide-react";

const steps = [
  "Verifying credentials...",
  "Fetching user profile...",
  "Preparing your workspace...",
];

export default function CallbackPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState("");

  // Animate the step messages
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(stepInterval);
  }, []);

  // Animate ellipsis
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  // Auth logic
  useEffect(() => {
    async function verify() {
      try {
        const user = await account.get();
        console.log(user);
        router.replace("/dashboard");
      } catch {
        router.replace("/get-started");
      }
    }
    verify();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "hsl(222 47% 11%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Geist', sans-serif",
        padding: "1rem",
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(160 84% 39% / 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Terminal
            style={{ width: "1.75rem", height: "1.75rem", color: "hsl(160 84% 39%)" }}
          />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              fontFamily: "'Geist Mono', monospace",
              letterSpacing: "-0.05em",
              color: "hsl(210 40% 98%)",
            }}
          >
            CodeClash
          </span>
        </div>

        {/* Terminal card */}
        <div
          className="hero-code-block"
          style={{ width: "100%" }}
        >
          {/* Terminal title bar */}
          <div className="terminal-bar">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="terminal-title">auth/callback — zsh</span>
          </div>

          {/* Terminal body */}
          <div className="terminal-body">
            {steps.map((step, i) => (
              <div key={i} className="code-line" style={{ opacity: i > currentStep ? 0.2 : 1, transition: "opacity 0.4s ease" }}>
                <span className="line-number">{i + 1}</span>
                <span className="line-content">
                  {i < currentStep ? (
                    <>
                      <span style={{ color: "hsl(160 84% 39%)" }}>✓</span>{" "}
                      <span style={{ color: "hsl(215 20.2% 65.1%)" }}>{step.replace("...", "")}</span>
                      <span style={{ color: "hsl(160 84% 39%)" }}> done</span>
                    </>
                  ) : i === currentStep ? (
                    <>
                      <span style={{ color: "hsl(210 100% 60%)" }}>›</span>{" "}
                      <span style={{ color: "hsl(210 40% 88%)" }}>{step.replace("...", "")}</span>
                      <span style={{ color: "hsl(215 20.2% 65.1%)" }}>{dots}</span>
                      <span className="cursor-block" />
                    </>
                  ) : (
                    <span style={{ color: "hsl(215 20% 38%)" }}>{step}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status text */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "0.8rem",
              color: "hsl(215 20.2% 65.1%)",
              letterSpacing: "0.03em",
            }}
          >
            Signing you in{dots}
          </p>
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "0.7rem",
              color: "hsl(215 20% 38%)",
              marginTop: "0.25rem",
            }}
          >
            You will be redirected automatically
          </p>
        </div>

        {/* Spinner ring */}
        <div
          aria-label="Loading"
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            border: "2px solid hsl(217 33% 22%)",
            borderTopColor: "hsl(160 84% 39%)",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}