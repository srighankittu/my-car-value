import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lat: number;

  @Expose()
  lang: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  milage: number;

  @Transform(({ obj }) => obj.user?.id)
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;
}
