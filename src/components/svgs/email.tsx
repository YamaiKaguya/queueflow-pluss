import React from "react";

interface EyeIconProps {
    className?: string; 
}

export default function BellIcon({ className }: EyeIconProps) {
    return (
        <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
        />
        </svg>
    );
}