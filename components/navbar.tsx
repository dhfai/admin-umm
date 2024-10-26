import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/logo.png'
import { auth, signOut } from '@/auth'

const Navbar = async () => {
    const session = await auth()
  return (
    <nav className='bg-white border-gray-200 border-b'>
        <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4'>
            <Link href='/'>
                <Image src={logo} alt='logo' width={50} height={50} priority />
            </Link>
            <div className='flex items-center gap-3'>
                <div className='flex gap-3 items-center'>
                    <div className='flex flex-col justify-center -space-y-1'>
                        <span className='font-semibold text-gray-600 text-right capitalize'>{session?.user.name}</span>
                        <span className='font-xs text-gray-400 text-right capitalize'>{session?.user.role}</span>

                    </div>
                    <button type='button' className='text-sm ring-2 bg-gray-100 rounded-full'>
                        <Image src={session?.user.image || 'https://avatar.iran.liara.run/public'} alt='logo' width={50} height={50} />
                    </button>
                    {session ? (
                        <form action={async () => {
                            "use server"
                            await signOut({redirectTo: '/login'})
                        }}>
                            <button type='submit' className='bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500'>Logout</button>
                        </form>
                    ) : (
                        <Link href='/login'>
                            <span className='bg-red-400 text-white px-4 py-2 rounded-e-md hover:bg-red-500'>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
