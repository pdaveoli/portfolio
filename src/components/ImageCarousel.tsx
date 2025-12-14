"use client";

import React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnMouseEnter: true })
    );

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full my-8"
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {imageUrls.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                        <div className="relative aspect-video overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                            <Image
                                src={image}
                                alt={`Screenshot ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 hidden md:flex" />
            <CarouselNext className="-right-12 hidden md:flex" />
        </Carousel>
    );
}
