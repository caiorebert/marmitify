import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ChefModule } from './modules/chef/chef.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '1234',
      database: process.env.POSTGRES_DB || 'marmitify',
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      autoLoadEntities: true, // Automatically load entities
    }),
    UserModule,
    ChefModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [
    UserModule,
    ChefModule
  ],
})
export class AppModule {}
