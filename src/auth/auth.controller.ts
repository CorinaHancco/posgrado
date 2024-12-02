import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const token = req.user.token; // Obtén el token generado en GoogleStrategy

    // Redirige al frontend con el token como parámetro
    return res.redirect(`http://localhost:4200/login?token=${token}`);
  }
}
