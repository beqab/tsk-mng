import { Body, Controller, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/singUp")
  registerUser(@Body() params: AuthCredentialsDto) {
    console.log(params, "ppp");
    return this.authService.registerUser(params);
  }

  @Post("/signIn")
  singIn(@Body() body: AuthCredentialsDto) {
    console.log("ttt");
    return this.authService.signIn(body);
  }
}
