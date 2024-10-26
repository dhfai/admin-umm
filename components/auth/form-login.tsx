'use client'

import { signInCredentials, signUpCredentials } from '@/lib/action'

import React from 'react'
import { LoginButton } from '../button'
const FormLogin = () => {
    const [state, formAction] = React.useActionState(signInCredentials, null)
    console.log({state})
    return (
        <form action={formAction} className='space-y-6'>
            {state?.message ? (
                <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100' role='alert'>
                    <span className='font-medium'>{state?.message}</span>
                </div>
            ): null}
            <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text0gray-900'>Email</label>
                <input placeholder='admin@unismuh.ac.id' type='text' name="email" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5' />
                <div aria-live='polite' aria-atomic='true'>
                    <span className='text sm text-red-500 mt-2'>{state?.error?.email}</span>
                </div>
            </div>
            <div>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text0gray-900'>Password</label>
                <input placeholder='*****' type='password' name="password" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5' />
                <div aria-live='polite' aria-atomic='true'>
                    <span className='text sm text-red-500 mt-2'>{state?.error?.password}</span>
                </div>
            </div>

            <LoginButton />

        </form>
    )
}

export default FormLogin
