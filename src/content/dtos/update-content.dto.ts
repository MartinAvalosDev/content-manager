import { IsString, IsNumber, IsEmpty } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContentDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNumber()
  @ApiProperty()
  readonly episode_id: number;

  @IsString()
  @ApiProperty()
  readonly opening_crawl: string;

  @IsString()
  @ApiProperty()
  readonly director: string;

  @IsString()
  @ApiProperty()
  readonly producer: string;

  @IsString()
  @ApiProperty()
  readonly release_date: string;

  //no aplica en arrays para updatear contents
  @ApiProperty()
  readonly characters: [string];
  @ApiProperty()
  readonly planets: [string];
  @ApiProperty()
  readonly starships: [string];
  @ApiProperty()
  readonly vehicles: [string];
  @ApiProperty()
  readonly species: [string];

  @IsString()
  @ApiProperty()
  readonly created: string;

  @IsString()
  @ApiProperty()
  readonly edited: string;

  @IsString()
  @ApiProperty()
  readonly url: string;

  @IsEmpty({ message: 'You cannot pass the user role' })
  readonly user: User;
}
