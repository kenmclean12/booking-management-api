import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PropertyModule } from './property/property.module';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, PropertyModule, AddressModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
