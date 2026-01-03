import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    report.userId = user.id;

    const savedReport = await this.repo.save(report);

    return this.repo.findOne({
      where: { id: savedReport.id },
      relations: ['user'],
    });
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found!');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate({ make, model, lng, lat, milage, year }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make=:make', { make })
      .andWhere('model=:model', { model })
      .andWhere('lat -:lat BETWEEN -5 AND +5', { lat })
      .andWhere('lng -:lng BETWEEN -5 AND +5', { lng })
      .andWhere('year -:year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(milage -:milage)', 'DESC')
      .setParameters({ milage })
      .limit(3)
      .getRawOne();
  }
}
