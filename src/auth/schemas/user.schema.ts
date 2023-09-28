import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../dtos/signup.dto';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  role: Role;

  @Prop({
    unique: [true, 'Duplicate email entered'],
  })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
