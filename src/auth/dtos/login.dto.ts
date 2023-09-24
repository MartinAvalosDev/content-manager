import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class loginDto{
    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter a valid email address"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    readonly password: string;
}