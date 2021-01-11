import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Signupdb } from './entities/signup.entity'
import { SignupService } from './signup.service';
import { SignupResolver } from './signup.resolver';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Signupdb] })],
  providers: [SignupResolver, SignupService]
})
export class SignupModule {}
