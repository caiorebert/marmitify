import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client-dto';
import { UpdateClientDto } from './dto/update-client-dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        const client = this.clientRepository.create(createClientDto);
        return await this.clientRepository.save(client);
    }

    async findAll(): Promise<Client[]> {
        return await this.clientRepository.find();
    }

    async findOne(id: number): Promise<Client> {
        const client = await this.clientRepository.findOne({ where: { id } });
        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }

    async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
        await this.findOne(id);
        await this.clientRepository.update(id, updateClientDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const client = await this.findOne(id);
        await this.clientRepository.remove(client);
    }
}