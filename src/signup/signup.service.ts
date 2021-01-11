import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Signupdb } from './entities/signup.entity'
import { Entity, wrap } from '@mikro-orm/core';
import { UpdateProfileDto } from './dto/updatesignup.dto';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(Signupdb)
    private readonly signupRepo: EntityRepository<Signupdb>
  ){}

  async findAll() {
    return this.signupRepo.findAll();
  }

  async findOne(id: string) {
    return this.signupRepo.findOneOrFail({id});
  }

  async findFirst() {
    const first = await this.signupRepo.findAll();
    return first[0];
  }

  async findTotal() {
    const first = await this.signupRepo.findAll();
    console.log(first.length)
    return "Total user: "+first.length;
  }

  // async filterBy(productName:string) {
  //   const filtered = await this.signupRepo.find(product, {}, {
  //     filters: { byProduct: { item: productName } },
  //   });
  //   console.log(first.length)
  //   return "Total user: "+first.length;
  // }

  async findBy(category:string, element:string) {
    const all = await this.signupRepo.findAll();
    var found=[];
    for(var i=0;i<all.length;i++){
      if(category=="town"&&all[i].town.includes(element))
        found.push(all[i]);
        else if(category=="product"&&all[i].product.includes(element))
        found.push(all[i]);
    }
    return found;
  }

  async create(name, DOB, email, product, town, phone:string) {
    const newSignup = new Signupdb(name, DOB, email, product, town, phone)
    //var age = (new Date()) - DOB;
    await this.signupRepo.persistAndFlush(newSignup)
    return newSignup;
  }

  async update(id: string,updateProfile: UpdateProfileDto) {
    const update = await this.signupRepo.findOneOrFail({ id });
    wrap(update).assign(updateProfile);
    await this.signupRepo.flush();
    return update;
  }

  async delete(id: string): Promise<Boolean>{
    const deleted = await this.signupRepo.nativeDelete({id})
    return deleted === 1;
  }
}
