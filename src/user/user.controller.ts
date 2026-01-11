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
import { UserService } from './user.service';
import { UserCreateDto, UserResponseDto, UserUpdateDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return await this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserCreateDto })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserResponseDto,
  })
  async create(@Body() dto: UserCreateDto): Promise<UserResponseDto> {
    return await this.userService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user information by user ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiBody({ type: UserUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return await this.userService.remove(id);
  }
}
