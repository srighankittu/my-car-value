import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsLatitude()
  lat: string;

  @IsLongitude()
  lng: string;

  @IsNumber()
  @Min(2000)
  @Max(2025)
  year: number;

  @IsNumber()
  @Min(200000)
  @Max(800000)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: string;
}
