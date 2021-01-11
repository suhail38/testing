import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './signup/signup.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [GraphQLModule.forRoot({
    debug: true,
    autoSchemaFile: join(process.cwd(), 'src/gqlSchema.gql'),
  }), MikroOrmModule.forRoot({
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    dbName: 'sign-up',
    type: 'mongo',
    forceUtcTimezone: true,
    debug: true,
  }), SignupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
