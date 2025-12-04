import React from "react";

export type TOCItem = {
    id: string;
    text: string;
    depth: number;
};

export function TOC({ toc} : { toc: TOCItem[] }) {
    if (!toc || toc.length === 0) return null;
    return (
        <nav aria-label="Table of contents" className="mb-8 w-full max-w-xs">
            <p className="text-sm font-semibold mb-2">On this page</p>
            <ul>
                {toc.map((item) => (
                    <li key={item.id} className={`ml-${(item.depth - 2) * 4}`}>
                        <a
                            href={`#${item.id}`}
                            className="text-sm text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 hover:text-gray-700 hover:underline transition-all duration-200"
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );

}