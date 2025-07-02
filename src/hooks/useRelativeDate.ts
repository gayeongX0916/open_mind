import { useMemo } from "react";

export function useRelativeDate(date: Date | string): string {
  return useMemo(() => {
    const now = new Date();
    const target = typeof date === "string" ? new Date(date) : date;

    const diffMs = now.getTime() - target.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffMs / 60);
    const diffHour = Math.floor(diffMs / 60);
    const diffDay = Math.floor(diffMs / 24);

    if (diffSec < 60) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    if (diffDay === 1) return "어제";
    if (diffDay < 7) return `${diffDay}일 전`;
    if (diffDay < 14) return "1주 전";
    if (diffDay < 21) return "2주 전";
    if (diffDay < 28) return "3주 전";
    if (diffDay < 60) return "한 달 전";

    const months = Math.floor(diffDay / 30);
    if (months < 12) return `${months}달 전`;

    const years = Math.floor(diffDay / 365);
    return `${years}년 전`;
  }, [date]);
}
