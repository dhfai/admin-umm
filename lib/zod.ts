import { object, string } from "zod";

export const RegisterSchema = object({
    name: string().min(3, "Nama harus lebih dari 3 karakter"),
    email: string().email("Email tidak valid"),
    password: string().min(6, "Password harus lebih dari 6 karakter"),
})


export const SignInSchema = object({
    email: string().email("Email tidak valid"),
    password: string().min(6, "Password harus lebih dari 6 karakter"),
})
