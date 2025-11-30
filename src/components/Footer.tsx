

export default function Footer() {
    return (
        <footer className="w-full py-4 border-t mt-10 mb-25 text-center text-sm text-neutral-500">
            <p className="font-medium text-md mt-5">© {new Date().getFullYear()} Oliver Dave. All rights reserved.</p>
            <p className="font-medium text-md py-2">Contact: <a className="underline" href="mailto:oliversadave@gmail.com">oliversadave@gmail.com</a></p>
            <p>Build with Next.JS + Tailwind</p>
        </footer>
    )
}