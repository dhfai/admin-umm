'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsCalendar2Date } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";

export default function NavLink() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/dashboard', label: 'Dashboard', icon: <LuLayoutDashboard /> },
        { href: '/buat-jadwal', label: 'Buat Jadwal', icon: <BsCalendar2Date /> },
    ];

    return (
        <ul className='flex lg:flex-row items-center lg:gap-4 text-gray-500'>
            {navLinks.map((link) => (
                <li key={link.href}>
                    <Link href={link.href}>
                        <span
                            className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors duration-300 ease-in-out relative ${
                                pathname === link.href
                                    ? 'text-blue-500'
                                    : 'hover:bg-gray-200 hover:text-gray-700'
                            }`}
                        >
                            {link.icon}
                            <span className="text-[12px] lg:text-[17px]">{link.label}</span>
                            {pathname === link.href && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500"></span>
                            )}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
