import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum } from "class-validator";

export enum Role {
    USER = "Usuario Regular",
    ADMIN = "Administrador"
}

export class SignupDto{
    @IsNotEmpty()
    @IsEnum(Role, {message: `Please enter a valid role, try with:"${Role.USER}"or"${Role.ADMIN}"`})
    readonly role: Role;

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter a valid email address"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    readonly password: string;
}