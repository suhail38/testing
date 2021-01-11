import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType('UpdateProfileDto')
export class UpdateProfileDto {
  @Field({ nullable: true })
  DOB: Date;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  town: string;

  @Field({ nullable: true })
  phone: string;
  
  @Field({ nullable: true })
  product: string;

  // @Field(type => TaskStatus)
  // status: TaskStatus;
}

// @InputType()
// export class UpdateSignupInput extends PartialType(CreateSignupInput) {
//   @Field(() => Int)
//   id: number;
// }