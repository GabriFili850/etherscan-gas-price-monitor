import styled, { createGlobalStyle, keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Manrope", "Segoe UI", sans-serif;
    background: #f3f6fb;
    color: #0f1c2e;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  padding: 48px 20px 64px;
  background: linear-gradient(180deg, #f6f9ff 0%, #eef2f8 45%, #f6f9ff 100%);
  color: #0f1c2e;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    filter: blur(0);
    opacity: 0.6;
    z-index: 0;
  }

  &::before {
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(38, 113, 230, 0.25), transparent 70%);
    top: -120px;
    right: -80px;
  }

  &::after {
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(50, 201, 184, 0.18), transparent 70%);
    bottom: -140px;
    left: -60px;
  }
`;

export const AppShell = styled.div`
  max-width: 860px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const AppHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const LogoBadge = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(15, 28, 46, 0.08);
`;

export const LogoMark = styled.img`
  width: 30px;
  height: 30px;
`;

export const AppTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.6rem, 2.4vw, 2.4rem);
  font-weight: 700;
  color: #0b2c5f;
  letter-spacing: -0.02em;
`;

export const AppSubtitle = styled.p`
  margin: 6px 0 0;
  font-size: 0.98rem;
  color: #5b6b82;
`;

export const AppHeaderMeta = styled.div`
  display: flex;
  flex-direction: column;
`;
