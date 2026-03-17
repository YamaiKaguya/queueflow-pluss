import logo from "../../public/QueueFlow+.png";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className={"flex items-center justify-between px-5 py-1 border-b"}>
        <div className="flex items-center gap-2 font-semibold">
            <Image src={logo} alt="QueueFlow Logo" className="max-w-12" />
            QueueFlow
        </div>

        <div className="flex items-center gap-6">
            <a className="text-sm">Log In</a>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Sign Up
            </button>
        </div>
        </nav>
    )
}

