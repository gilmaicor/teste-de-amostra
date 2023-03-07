import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ToxicologicalSampleModule } from './toxicological-sample/toxicological-sample.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'nestjs',
      password: '12345',
      database: 'nestjs',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    ToxicologicalSampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
