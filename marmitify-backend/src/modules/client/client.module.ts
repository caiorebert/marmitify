import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';

@Module({
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService],
    imports: [
        TypeOrmModule.forFeature([Client]),
    ],
})
export class ClientModule {}