import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressCreateDto, AddressUpdateDto, AddressResponseDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get an address by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the address' })
  @ApiResponse({
    status: 200,
    description: 'The found address',
    type: AddressResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AddressResponseDto> {
    return await this.addressService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({
    status: 200,
    description: 'List of all addresses',
    type: [AddressResponseDto],
  })
  async findAll(): Promise<AddressResponseDto[]> {
    return await this.addressService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  @ApiBody({ type: AddressCreateDto })
  @ApiResponse({
    status: 201,
    description: 'Address created',
    type: AddressResponseDto,
  })
  async create(@Body() dto: AddressCreateDto): Promise<AddressResponseDto> {
    return await this.addressService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update address information by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the address' })
  @ApiBody({ type: AddressUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Address updated',
    type: AddressResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddressUpdateDto,
  ): Promise<AddressResponseDto> {
    return await this.addressService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an address by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the address' })
  @ApiResponse({
    status: 200,
    description: 'Address deleted',
    type: AddressResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AddressResponseDto> {
    return await this.addressService.remove(id);
  }
}
