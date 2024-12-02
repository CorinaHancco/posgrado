import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    UseGuards
  } from '@nestjs/common';
  import { UserService } from '../service/user.service';
  import { CreateUserDto } from '../dto/create-user.dto';
  import { UpdateUserDto } from '../dto/update-user.dto';
  import { RolesGuard } from 'src/auth/roles.guard';
  import { Roles } from 'src/auth/roles.decorator';
  import { UserRole } from 'src/common/enums/user-role.enum';
  import { ApiBearerAuth,ApiTags } from '@nestjs/swagger';
  
  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get()
    @Roles(UserRole.USUARIO_ESCUELA)
    getUsers(@Query() filterQuery: any) {
      return this.userService.getUsers(filterQuery);
    }
  
    @Get(':id')
    @Roles(UserRole.USUARIO_ESCUELA)
    getUser(@Param('id') id: string) {
      return this.userService.getUser(Number(id));
    }
  
    @Post()
    @Roles(UserRole.USUARIO_ESCUELA)
    createUser(@Body() createUserDto: CreateUserDto) {
      return this.userService.createUser(createUserDto);
    }
  
    @Patch(':id')
    @Roles(UserRole.USUARIO_ESCUELA)
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.updateUser(Number(id), updateUserDto);
    }
  
    @Delete(':id')
    @Roles(UserRole.USUARIO_ESCUELA)
    deleteUser(@Param('id') id: string) {
      return this.userService.deleteUser(Number(id));
    }
  }
  