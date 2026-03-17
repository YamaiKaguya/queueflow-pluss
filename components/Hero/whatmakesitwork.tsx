"use client";

import { useEffect, useRef, useState } from "react";

const features = [
    {
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
        ),
        title: "JOIN VIRTUALLY",
        titleStyle: "uppercase tracking-widest text-sm font-bold",
        description: "Customer can join virtual queue via their devices without needing physical interaction.",
        hasImage: true,
        imageSrc: "/dashboard-preview.png", // replace with your actual image
        span: "col-span-1 row-span-2",
    },
    {
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
        ),
        title: "Predictive AI",
        titleStyle: "text-base font-semibold",
        description: "Proprietary algorithms analyze historical data to provide hyper-accurate wait time estimates.",
        hasImage: false,
        span: "col-span-1 row-span-1",
    },
    {
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        ),
        title: "Watch Your Queue Move",
        titleStyle: "text-base font-semibold",
        description: "Live dashboard for staff to adjust flow on one fly, prioritize urgent cases or high-value clients effortlessly.",
        hasImage: false,
        span: "col-span-1 row-span-1",
    },
    {
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        ),
        title: "Real-time Position Tracking",
        titleStyle: "text-base font-semibold",
        description: "Automatic SMS notifications keep users informed of their place in line without requiring them to stay on site.",
        hasImage: false,
        span: "col-span-1 row-span-1",
    },
    {
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        ),
        title: "Control From The Dashboard",
        titleStyle: "text-base font-semibold",
        description: "Automatic SMS notifications keep users informed of their place in line without requiring them to stay on site.",
        hasImage: false,
        span: "col-span-1 row-span-1",
    }
];

function FeatureCard({feature,index}: {
        feature: (typeof features)[0];
        index: number;
    }) {

    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setVisible(true); },
        { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
        ref={ref}
        className={`
            feature-card ${feature.span}
            rounded-2xl border border-gray-100 bg-white p-6
            flex flex-col gap-3 overflow-hidden relative
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
        <span className="text-blue-500 w-8 h-8 flex items-center justify-center
                            rounded-lg bg-blue-50">
            {feature.icon}
        </span>

        <h3 className={`text-gray-900 ${feature.titleStyle} leading-snug`}>
            {feature.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
            {feature.description}
        </p>

        {feature.hasImage && (
            <div className="mt-2 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Replace with <Image> once you have the real asset */}
            <div className="bg-gray-900 h-44 flex items-center justify-center text-gray-500 text-xs">
                {/* <Image src={logo} alt="QueueFlow Logo" className="max-w-12" /> */}
            </div>
            </div>
        )}
        </div>
    );
}

export default function WhatMakesItWork() {
    return (
        <section className="bg-[#f5f5f3] min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="text-center mb-14">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                    What makes it work
                </h2>
                <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
                    Simplifies queue management by combining virtual queuing, real-time
                    tracking, and smart dashboards. It helps businesses serve customers
                    faster while keeping everyone informed about their place in line.
                </p>
            </div>

            {/* Bento grid */}
            <div
            className="grid gap-4"
            style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "auto",
            }}
            >

                {/* Card 0 — tall, spans 2 rows */}
                <div className="row-span-2" style={{ gridRow: "1 / span 2", gridColumn: "1" }}>
                    <FeatureCard feature={features[0]} index={0} />
                </div>

                <div style={{ gridColumn: "2", gridRow: "1" }}>
                    <FeatureCard feature={features[1]} index={1} />
                </div>
                <div style={{ gridColumn: "3", gridRow: "1" }}>
                    <FeatureCard feature={features[2]} index={2} />
                </div>
                <div style={{ gridColumn: "2", gridRow: "2" }}>
                    <FeatureCard feature={features[3]} index={3} />
                </div>
                <div style={{ gridColumn: "3", gridRow: "2" }}>
                    <FeatureCard feature={features[4]} index={4} />
                </div>
            </div>
        </div>
        </section>
    );
}