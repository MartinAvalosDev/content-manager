import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';

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
}
