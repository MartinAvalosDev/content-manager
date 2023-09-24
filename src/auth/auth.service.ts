import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signup(signupDto: SignupDto): Promise<{message: string, token: string}>{
        const {name, email, password} = signupDto
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashPassword
        })

        const token = await this.jwtService.sign({
            message: 'Se ha registrado correctamente. Utilice este token para logearse :)',
            id: user._id
        })

        return {message: 'Se ha registrado correctamente. Utilice este token para logearse :)', token: token }
    }

}
