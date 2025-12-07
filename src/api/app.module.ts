import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from 'src/infrastructure/lib/multe-r/multer.module';
import { RegisterUsersModule } from './register-users/register-users.module';
import { RegisterUsersController } from './register-users/register-users.controller';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MulterModule,
    RegisterUsersModule,
    RegisterUsersModule,
    CommentModule,
    PostModule,
  ],
  controllers: [AppController, RegisterUsersController],
  providers: [AppService],
})
export class AppModule {}
