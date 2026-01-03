import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(currentUser: CreateUserDto) {
    const user = this.repo.create(currentUser);
    return this.repo.save(user);
    // console.log([email, password]);
  }

  async findOne(id: number) {
    if (!id) return '';
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not found');
    return user;
  }
  find(email?: string) {
    const users = this.repo.find({ where: { email } });
    return users;
  }
  async update(id: number, attr: Partial<User>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Error, user not found');
    Object.assign(user, attr);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not found');
    return this.repo.remove(user);
  }
}
