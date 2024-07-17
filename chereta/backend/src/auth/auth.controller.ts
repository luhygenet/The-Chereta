import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth-guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      console.log("in auth controller")
      console.log(req.user)
      console.log(req.user.userId)
      console.log('Logging in user:', req.user.username); // Example: Log user's username
      const authResult = await this.authService.login(req.user);
      console.log('Login successful:', authResult); // Example: Log authentication result
      return authResult;
    } catch (error) {
      console.error('Error during login:', error); // Log any errors that occur during login
      throw error; // Rethrow the error to propagate it with appropriate handling
    }
  }


  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
