import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ToDoModule } from './to-do/to-do.module';

// FIND ALL USERS
//ADD USER
//DELETE USER

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env']}),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (configService: ConfigService) => ({
        type : "postgres",
        host : configService.get("DATABASE_HOST"),
        port : configService.get<number>("DATABASE_PORT"),
        username : configService.get("DATABASE_USERNAME"),
        password : configService.get("DATABASE_PASSWORD"),
        synchronize : configService.get<boolean>("DATABASE_SYNC"),
        logging : configService.get<boolean>("DATABASE_LOGGING"),
        database : configService.get("DATABASE_NAME"),
        entities : [__dirname + '/**/*.entity{.ts,.js}'],
      })
    }),
    UserModule,
    ToDoModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
