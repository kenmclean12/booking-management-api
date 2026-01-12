/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressCreateDto, AddressResponseDto, AddressUpdateDto } from './dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<AddressResponseDto> {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException(
        `No address found with the provided ID: ${id}`,
      );
    }

    return address as AddressResponseDto;
  }

  async findAll(): Promise<AddressResponseDto[]> {
    return (await this.prisma.address.findMany()) as AddressResponseDto[];
  }

  async create(dto: AddressCreateDto): Promise<AddressResponseDto> {
    const created = await this.prisma.address.create({ data: dto });
    if (!created) {
      throw new BadRequestException(
        `Could not create address with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return created as AddressResponseDto;
  }

  async update(id: number, dto: AddressUpdateDto): Promise<AddressResponseDto> {
    const existing = await this.prisma.address.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(
        `No address found with the provided ID: ${id}`,
      );
    }

    const updated = await this.prisma.address.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Could not update address ID: ${id} with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return updated as AddressResponseDto;
  }

  async remove(id: number): Promise<AddressResponseDto> {
    const existing = await this.prisma.address.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(
        `No address found with the provided ID: ${id}`,
      );
    }

    await this.prisma.address.delete({ where: { id } });
    return existing as AddressResponseDto;
  }
}
