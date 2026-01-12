import { ApiProperty } from '@nestjs/swagger';
import { AddressResponseDto } from 'src/address/dto';

export class PropertyResponseDto {
  @ApiProperty({ description: 'Property ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Name of the property', example: 'Beach House' })
  name: string;

  @ApiProperty({
    description: 'Location of the property',
    example: 'Vancouver',
  })
  location: string;

  @ApiProperty({ description: 'ID of the owner', example: 1 })
  ownerId: number;

  @ApiProperty({
    description: 'Address of the property',
    example: '123 ABC Street',
  })
  address?: AddressResponseDto;

  @ApiProperty({ description: 'Created timestamp', example: new Date() })
  createdAt: Date;
}
