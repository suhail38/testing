import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { SignupService } from './signup.service';
import { Signup, Signupdb } from './entities/signup.entity';
import { CreateSignupInput } from './dto/create-signup.input';
import { UpdateProfileDto } from './dto/updatesignup.dto';

@Resolver(() => Signup)
export class SignupResolver {
  constructor(private readonly signupService: SignupService) {}

  @Mutation(() => Signup)
  createProfile(@Args('Name', {type:()=>String}) name: String, 
  @Args('DOB', {type:()=>String}) DOB:string,
  @Args('email',{type:()=>String}) email:string,
  @Args('hometown', {type:()=>String}) town:string,
  @Args('product', {type:()=>String}) product:string, 
  @Args('phone', {type:()=>String, nullable:true}) phone:string ){
    return this.signupService.create(name, DOB, email, product, town, phone);
  }

  @Query(() => [Signup])
  findAll() {
    return this.signupService.findAll();
  }

  @Query(() => Signup)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.signupService.findOne(id);
  }

  @Query(() => Signup)
  findFirst() {
    return this.signupService.findFirst();
  }

  @Query(() => String)
  findTotal() {
    return this.signupService.findTotal();
  }
  @Query(() => [Signup])
  findBy(@Args("category", {type:()=>String}) category:string,
  @Args("search", {type:()=>String}) search:string){
    return this.signupService.findBy(category,search);
  }

  @Mutation(() => Signup)
  updateProfile(@Args('id', {type:()=>ID}) id:string,
  @Args('updateProfile') updateProfile: UpdateProfileDto) {
    return this.signupService.update(id, updateProfile);
  }

  @Mutation(() => Boolean)
  deleteProfile(@Args('id', { type:()=>ID}) id: string) {
    return this.signupService.delete(id);
  }
}
