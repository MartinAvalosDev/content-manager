import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    const { role, email, password } = signupDto;
    const hashPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      role,
      email,
      password: hashPassword,
    });
    return { message: 'Se ha registrado correctamente.' };
  }

  async login(loginDto: LoginDto): Promise<{ message: string; token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid email or password');

    const token = await this.jwtService.sign({
      role: user.role,
      id: user._id,
    });

    return {
      message:
        'Ha iniciado sesion correctamente. Utilice este token para autenticarse en las rutas de /contents :)',
      token: token,
    };
  }
}
