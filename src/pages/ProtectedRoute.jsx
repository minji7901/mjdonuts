import React from 'react';
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();

  // 인증된 사용자가 아니거나 (관리자 전용이고 관리자가 아닌 경우)
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />
  }

  // 모든 조건을 만족할 경우 children을 반환하여 접근을 허용
  return children;
}