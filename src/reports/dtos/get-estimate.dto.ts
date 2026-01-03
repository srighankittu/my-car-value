import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: string;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(2000)
  @Max(2025)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: string;
}
