import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a valid email address" })
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @ApiProperty()
    readonly password: string;
}