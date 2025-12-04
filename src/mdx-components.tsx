import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import React from "react";

const headingBase = "group relative scroll-m-28 font-semibold tracking-tight text-slate-900 dark:text-slate-50";
const headingLink = "inline-flex items-baseline gap-3 pl-6 text-balance text-inherit no-underline";
const HeadingAccent = () => (
    <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-[70%] w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-sky-400 via-indigo-500 to-fuchsia-500 opacity-80 transition-opacity group-hover:opacity-100"
    />
);

export const mdxComponents: MDXComponents = {
    h1: ({ children, id }) => (
        <h1 id={id} className={`${headingBase} mt-16 text-4xl sm:text-5xl`}>
            <HeadingAccent />
            <a href={id ? `#${id}` : undefined} className={`${headingLink} font-bold`}>
                <span className="text-sm uppercase tracking-[0.35em] text-slate-400 opacity-0 transition group-hover:opacity-100 dark:text-slate-500">#</span>
                {children}
            </a>
        </h1>
    ),
    h2: ({ children, id }) => (
        <h2 id={id} className={`${headingBase} mt-12 text-3xl sm:text-4xl`}>
            <HeadingAccent />
            <a href={id ? `#${id}` : undefined} className={headingLink}>
                <span className="text-xs font-medium text-slate-400 opacity-0 transition group-hover:opacity-100 dark:text-slate-500">#</span>
                {children}
            </a>
        </h2>
    ),
    h3: ({ children, id }) => (
        <h3 id={id} className={`${headingBase} mt-10 text-2xl`}>
            <HeadingAccent />
            <a href={id ? `#${id}` : undefined} className={headingLink}>
                <span className="text-xs font-medium text-slate-400 opacity-0 transition group-hover:opacity-100 dark:text-slate-500">#</span>
                {children}
            </a>
        </h3>
    ),
    h4: ({ children, id }) => (
        <h4 id={id} className={`${headingBase} mt-8 text-xl`}>
            <HeadingAccent />
            <a href={id ? `#${id}` : undefined} className={headingLink}>
                <span className="text-[0.65rem] font-medium text-slate-400 opacity-0 transition group-hover:opacity-100 dark:text-slate-500">#</span>
                {children}
            </a>
        </h4>
    ),
    h5: ({ children, id }) => (
        <h5 id={id} className={`${headingBase} mt-6 text-lg`}>
            <HeadingAccent />
            <a href={id ? `#${id}` : undefined} className={headingLink}>
                <span className="text-[0.6rem] font-medium text-slate-400 opacity-0 transition group-hover:opacity-100 dark:text-slate-500">#</span>
                {children}
            </a>
        </h5>
    ),
    h6: ({ children, id }) => (
        <h6 id={id} className={`${headingBase} mt-6 text-base`}>
            <HeadingAccent />
            <a href={id ? `#${id}` : undefined} className={headingLink}>
                <span className="text-[0.6rem] font-medium text-slate-400 opacity-0 transition group-hover:opacity-100 dark:text-slate-500">#</span>
                {children}
            </a>
        </h6>
    ),

    p: ({ children }) => (
        <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">
            {children}
        </p>
    ),

    a: ({ href, children }) => (
        <a
            href={href}
            className="font-semibold text-sky-600 underline decoration-dotted underline-offset-4 transition hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
        >
            {children}
        </a>
    ),

    ul: ({ children }) => (
        <ul className="mt-6 list-disc space-y-2 pl-6 text-slate-600 marker:text-sky-500 dark:text-slate-300 dark:marker:text-sky-300">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="mt-6 list-decimal space-y-2 pl-6 text-slate-600 marker:text-sky-500 dark:text-slate-300 dark:marker:text-sky-300">
            {children}
        </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,

    blockquote: ({ children }) => (
        <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-lg italic text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
            <div className="mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500" />
            {children}
        </blockquote>
    ),

    code: ({ children }) => (
        <code className="rounded-md border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-sm font-medium text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
            {children}
        </code>
    ),

    pre: ({ children }) => (
        <div className="relative my-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-sm text-slate-50 shadow-lg dark:border-slate-800">
            <div className="pointer-events-none absolute inset-x-4 top-3 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <pre className="overflow-x-auto p-6 pt-10 font-mono text-[0.95rem]">
                {children}
            </pre>
        </div>
    ),

    hr: () => (
        <hr className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />
    ),

    img: (props) => (
        <figure className="my-12 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl dark:border-slate-800 dark:bg-slate-900">
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
};
