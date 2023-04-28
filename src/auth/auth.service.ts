import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  //
  async registerUser(param: AuthCredentialsDto) {
    console.log(param, "ggg");

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(param.password, salt);

    const user = await this.repo.create({
      userName: param.userName,
      password: hashedPassword,
    });
    console.log(user);
    try {
      return await this.repo.save(user);
    } catch (error) {
      console.log();
      if (error.code === "23505") {
        throw new ConflictException("user already exist");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(params: AuthCredentialsDto) {
    const { userName, password } = params;

    const user = await this.repo.findOne({
      where: { userName },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return "success";
    } else {
      throw new UnauthorizedException("check your credentials");
    }
  }
}
