import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@/public/images/logo.png';
import { auth, signOut } from '@/auth';
import NavLink from './navLink';

const Navbar = async () => {
    const session = await auth();

    return (
        <nav className='bg-white shadow'>
            <div className='max-w-screen-xl flex items-center justify-between mx-auto p-2'>
                {/* Logo */}
                <Link href='/' className='flex items-center'>
                    <Image src={logo} alt='Logo' width={50} height={50} priority />
                </Link>

                {/* Navigation Links */}
                <NavLink />

                {/* User Session Controls */}
                <div className='flex items-center gap-3'>
                    {session ? (
                        <form
                            action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/login' });
                            }}
                        >
                            <button
                                type='submit'
                                className='bg-red-500 text-white px-4 py-2 text-[12px] rounded-md hover:bg-red-600 transition-colors'
                            >
                                Logout
                            </button>
                        </form>
                    ) : (
                        <Link href='/login'>
                            <span className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>
                                Login
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
