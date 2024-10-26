'use client';
import { useFormStatus } from "react-dom";

export const RegisterButton = () => {
    const {pending} = useFormStatus();
    return (
        <button disabled={pending} type='submit' className='w-full text-white bg-blue-700 font-medium rounded-lg p-2.5 text-center uppercase hover:bg-blue-800'>{pending ? "Registering..." : "Register"}</button>
    )
}


export const LoginButton = () => {
    const {pending} = useFormStatus();
    return (
        <button disabled={pending} type='submit' className='w-full text-white bg-blue-700 font-medium rounded-lg p-2.5 text-center uppercase hover:bg-blue-800'>{pending ? "Authenticating..." : "Login"}</button>
    )
}
