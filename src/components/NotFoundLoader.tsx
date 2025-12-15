"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IoIosSkipForward } from "react-icons/io";


const loadingStates = [
    {
        text: "Got request..."
    },
    {
        text: "Finding the right page..."
    },
    {
        text: "Almost there..."
    },
    {
        text: "What a weird URL!"
    },
    {
        text: "This page must be lost...",
    },
]


export const NotFoundLoader = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="w-full flex items-center justify-center">
            <Loader
                loadingStates={loadingStates}
                loading={loading}
                duration={2000}
                loop={false}
            />
        </div>
    )
}