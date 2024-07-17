import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TendersModule } from './tenders/tenders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BidsModule } from './bids/bids.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/the-chereta-db'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'public'),
    }),

    // MongooseModule.forRoot('mongodb://localhost/the-chereta-db'),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', 'frontend', 'public'),
    // },
    // {
    //   rootPath: join(__dirname, '..', '..', 'frontend', 'src'),
    //   serveRoot: '/src',
    // },),
    AuthModule, UsersModule, TendersModule, BidsModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
