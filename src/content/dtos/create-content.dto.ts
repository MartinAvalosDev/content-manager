import { IsString, IsNumber, IsNotEmpty, IsEmpty } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNumber()
  @ApiProperty()
  readonly episode_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly opening_crawl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly director: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly producer: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly release_date: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly characters: [string];

  @IsNotEmpty()
  @ApiProperty()
  readonly planets: [string];

  @IsNotEmpty()
  @ApiProperty()
  readonly starships: [string];

  @IsNotEmpty()
  @ApiProperty()
  readonly vehicles: [string];

  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  readonly species: [string];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly created: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly edited: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly url: string;

  @IsEmpty({ message: 'You cannot pass the user role' })
  readonly user: User;
}
