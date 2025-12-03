import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export const mdxComponents: MDXComponents = {
    // Headings
    h1: ({ children }) => <h1 className="mt-10 scroll-m-20 border-b pb-2 text-4xl font-bold tracking-tight first:mt-0">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>,
    h5: ({ children }) => <h5 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">{children}</h5>,
    h6: ({ children }) => <h6 className="mt-8 scroll-m-20 text-base font-semibold tracking-tight">{children}</h6>,

    // Paragraph
    p: ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>,

    // Links
    a: ({ href, children }) => <a href={href} className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700">{children}</a>,

    // Lists
    ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
    ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,

    // Blockquote
    blockquote: ({ children }) => <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>,

    // Inline Code
    code: ({ children }) => <code className="relative rounded bg-gray-200 dark:bg-gray-700 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold">{children}</code>,

    // Code Block
    pre: ({ children }) => (
        <pre className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-white">
            {children}
        </pre>
    ),

    // Horizontal Rule
    hr: () => <hr className="my-8" />,

    // Image - using next/image for optimization
    // Note: You might need to configure `next.config.js` for remote image sources.
    img: (props) => (
        <Image
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="my-8 rounded-md shadow-lg"
            {...(props as ImageProps)}
            alt={props.alt || ''}
        />
    ),
};
