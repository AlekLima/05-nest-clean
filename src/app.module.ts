import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config'
import { CreateAccountController } from './controllers/create-account.controller';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateQuestionController } from './controllers/create-question.controler';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-question.controller';

@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true,
  }),
  AuthModule,
],
  controllers: [CreateAccountController,AuthenticateController,CreateQuestionController, FetchRecentQuestionsController ],
  providers: [PrismaService],
})
export class AppModule {}
