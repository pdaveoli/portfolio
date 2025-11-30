"use client";
import { useMemo } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const isIOSSafari = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    const isIOS = /iP(ad|hone|od)/.test(ua);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
    return isIOS && isSafari;
};

export function ScrollProgressGate() {
    const hideScrollProgress = useMemo(() => isIOSSafari(), []);
    if (hideScrollProgress) {
        console.log("Hiding ScrollProgress on iOS Safari");
        return null
    }
    console.log("Showing ScrollProgress");
    return <ScrollProgress />;
}