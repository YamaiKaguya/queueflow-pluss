"use client";

import { useRouter } from "next/navigation"; // use this in App Router
import React from "react";

interface NavButtonProps {
    href: string;
    children: React.ReactNode;
}

export default function NavButton({ href, children }: NavButtonProps) {
    const router = useRouter();

    return (
        <button
        className="text-base text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        onClick={() => router.push(href)}
        >
        {children}
        </button>
    );
}