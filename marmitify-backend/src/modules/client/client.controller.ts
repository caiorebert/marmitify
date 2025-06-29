import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client-dto';
import { UpdateClientDto } from './dto/update-client-dto';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientService.create(createClientDto);
    }

    @Get()
    findAll() {
        return this.clientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.clientService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.update(id, updateClientDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.clientService.remove(id);
    }
}