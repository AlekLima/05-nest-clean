import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import type { Request } from 'express'
import { CurrentUser } from "src/auth/current-user-decorator";
import { UserPayload } from "src/auth/jwt.strategy";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";


const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
    constructor(
      private prisma: PrismaService
    ) {}

    @Post()
    async handle(
      @CurrentUser() user:UserPayload,
      @Body(bodyValidationPipe) body: CreateQuestionBodySchema
  ) {
      const { title, content } = body
      const userId = user.sub

      const slug = this.convertToSlug(title)
      
      await  this.prisma.question.create({
        data: {
          authorId: userId,
          title,
          content,
          slug,
        },
      })
    }

    private convertToSlug(title: string): string {
      return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "")
    }
}