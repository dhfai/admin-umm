'use client';
import { useFormStatus } from 'react-dom';

const Spinner = () => (
    <svg
        className='animate-spin h-5 w-5 text-white mr-2'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
    >
        <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
        />
        <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
        />
    </svg>
);

export const RegisterButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
            disabled={pending}
            type='submit'
            className='flex items-center justify-center w-full text-white bg-blue-700 font-medium rounded-lg p-2.5 text-center uppercase hover:bg-blue-800'
        >
            {pending ? (
                <>
                    <Spinner />
                    Loading...
                </>
            ) : (
                'Register'
            )}
        </button>
    );
};

export const LoginButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
            disabled={pending}
            type='submit'
            className='flex items-center justify-center w-full text-white bg-blue-700 font-medium rounded-lg p-2.5 text-center uppercase hover:bg-blue-800'
        >
            {pending ? (
                <>
                    <Spinner />
                    Loading...
                </>
            ) : (
                'Login'
            )}
        </button>
    );
};
