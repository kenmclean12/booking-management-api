/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PropertyCreateDto,
  PropertyResponseDto,
  PropertyUpdateDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<PropertyResponseDto> {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: { owner: true, address: true },
    });

    if (!property) {
      throw new NotFoundException(`No property found with provided ID: ${id}`);
    }

    return property as PropertyResponseDto;
  }

  async findAll(): Promise<PropertyResponseDto[]> {
    return (await this.prisma.property.findMany({
      include: { address: true },
    })) as PropertyResponseDto[];
  }

  async findByUserId(id: number): Promise<PropertyResponseDto[]> {
    return (await this.prisma.property.findMany({
      where: { ownerId: id },
      include: { owner: true, address: true },
    })) as PropertyResponseDto[];
  }

  async create(dto: PropertyCreateDto): Promise<PropertyResponseDto> {
    const created = await this.prisma.property.create({
      data: dto,
      include: { address: true },
    });

    if (!created) {
      throw new BadRequestException(
        `Could not create property entry with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return created as PropertyResponseDto;
  }

  async update(
    id: number,
    dto: PropertyUpdateDto,
  ): Promise<PropertyResponseDto> {
    const existing = await this.prisma.property.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!existing) {
      throw new NotFoundException(`No user found with the provided ID: ${id}`);
    }

    const updated = await this.prisma.property.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Failed to update user ID: ${id} with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return updated as PropertyResponseDto;
  }

  async remove(id: number): Promise<PropertyResponseDto> {
    const existing = await this.prisma.property.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!existing) {
      throw new NotFoundException(
        `No existing property found with provided ID: ${id}`,
      );
    }

    await this.prisma.property.delete({ where: { id } });
    return existing as PropertyResponseDto;
  }
}
