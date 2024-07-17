import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    console.log(user.id, user.username, user.password)
    if (user && (user.username === username && user.password === password)) {
      const { password: userPassword, ...result } = user; // Rename password to userPassword or omit entirely
      return user; // Return the user object without the password field
    }
    return null; // Return null if user does not exist or password does not match
  }
 
  async login(user: any) {
    const payload = { username: user.username, userId: user._id };
    console.log(user._id, user.username)
    return {
      
      access_token: this.jwtService.sign(payload),
      role: user.role,  // Include any additional properties needed
    };
  }
}