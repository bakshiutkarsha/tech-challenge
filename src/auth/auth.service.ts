import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return await this.usersService.validate(username, pass);
  }

  async login(user: any) {
    const resp = await this.validateUser(user.username, user.password)
    if(resp == null || resp.user_id == null) {
      return {
        "error": "User name or password is incorrect"
      }
    }

    const payload = { 
      user_id: resp.user_id,
      username: user.username, 
      sub: user.password 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}