import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSignupInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
