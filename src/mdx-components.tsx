import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageCarousel } from "@/components/ImageCarousel";
const headingBase =
    "group relative mt-14 scroll-m-28 font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-50 font-[Inter,'SF Pro Display',system-ui,sans-serif]";
const headingLink =
    "inline-flex items-baseline gap-3 pl-5 text-balance text-inherit no-underline";
const headingScale = {
    h1: "text-4xl sm:text-5xl",
    h2: "text-3xl sm:text-4xl",
    h3: "text-2xl sm:text-3xl",
    h4: "text-xl sm:text-2xl",
    h5: "text-lg sm:text-xl",
    h6: "text-base sm:text-lg",
};


const bodyText =
    "mt-6 text-base leading-7 text-slate-600 dark:text-slate-300 font-[Inter,'SF Pro Text',system-ui,sans-serif]";

const HeadingAccent = () => (
    <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-[70%] w-[3px] -translate-y-1/2 rounded-full bg-slate-900/15 transition group-hover:bg-slate-900/40 dark:bg-slate-50/20 dark:group-hover:bg-slate-50/50"
    />
);

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps = React.PropsWithChildren<{ id?: string }>;

const makeHeading = (tag: HeadingTag, sizeClass: string) => {
    const HeadingComponent = ({ children, id }: HeadingProps) =>
        React.createElement(
            tag,
            { id, className: `${headingBase} ${sizeClass}` },
            <HeadingAccent />,
            <a
                href={id ? `#${id}` : undefined}
                className={`${headingLink} font-semibold`}
            >
        <span className="text-xs uppercase tracking-[0.3em] text-slate-400 opacity-0 transition group-hover:opacity-80 dark:text-slate-500">
          #
        </span>
                {children}
            </a>
        );

    HeadingComponent.displayName = `MDX${tag.toUpperCase()}`;
    return HeadingComponent;
};




export const mdxComponents: MDXComponents = {
    h1: makeHeading("h1", headingScale.h1),
    h2: makeHeading("h2", headingScale.h2),
    h3: makeHeading("h3", headingScale.h3),
    h4: makeHeading("h4", headingScale.h4),
    h5: makeHeading("h5", headingScale.h5),
    h6: makeHeading("h6", headingScale.h6),
    p: ({ children }) => <p className={bodyText}>{children}</p>,
    blockquote: ({ children }) => (
        <blockquote className="mt-10 rounded-2xl border border-slate-200/80 bg-white/80 p-6 text-lg italic text-slate-700 shadow-[0_10px_35px_rgba(15,23,42,0.08)] dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-200">
            <div className="mb-4 h-[3px] w-14 rounded-full bg-slate-900/20 dark:bg-slate-50/30" />
            {children}
        </blockquote>
    ),
    pre: ({ children }) => (
        <div className="relative my-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-sm text-slate-50 shadow-[0_20px_60px_rgba(15,23,42,0.35)] dark:border-slate-800">
            <div className="pointer-events-none absolute inset-x-4 top-3 flex gap-2 text-slate-400">
                <span className="h-3 w-3 rounded-full bg-slate-500/70" />
                <span className="h-3 w-3 rounded-full bg-slate-500/50" />
                <span className="h-3 w-3 rounded-full bg-slate-500/30" />
            </div>
            <pre className="overflow-x-auto p-6 pt-10 font-mono text-[0.95rem] leading-relaxed text-slate-100">
        {children}
      </pre>
        </div>
    ),
    hr: () => <Separator className="my-12 bg-slate-200 dark:bg-slate-800" />,
    img: (props) => (
        <figure className="my-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900">
            <Image
                sizes="100vw"
                className="h-auto w-full object-cover"
                style={{ width: "100%", height: "auto" }}
                {...(props as ImageProps)}
                alt={props.alt || ""}
            />
            {props.alt ? (
                <figcaption className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {props.alt}
                </figcaption>
            ) : null}
        </figure>
    ),
    ul: ({ children }) => (
        <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-7 text-slate-600 marker:text-slate-400 dark:text-slate-300 dark:marker:text-slate-500">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="mt-6 list-decimal space-y-2 pl-6 text-base leading-7 text-slate-600 marker:text-slate-400 dark:text-slate-300 dark:marker:text-slate-500">
            {children}
        </ol>
    ),
    code: ({ children }) => (
        <code className="rounded-md bg-slate-900/5 px-2 py-1 text-sm font-mono text-slate-900 dark:bg-slate-50/10 dark:text-slate-100">
            {children}
        </code>
    ),
    Badge: (props) => <Badge {...props} />,
    a : (props) => (
        <a
            className="underline underline-offset-4  "
            {...props}
        />
    ),
    ImageCarousel: ImageCarousel,
};
