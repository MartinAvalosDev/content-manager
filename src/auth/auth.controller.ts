import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(
        @Body()
        signUpDto: SignupDto
    ): Promise<{message: string, token: string}>{
        return this.authService.signup(signUpDto)
    }

    @Post('/login')
    login(
        @Body()
        loginDto: LoginDto
    ): Promise<{message: string, token: string}>{
        return this.authService.login(loginDto)
    }
}
