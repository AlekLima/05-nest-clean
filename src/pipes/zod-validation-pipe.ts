import { PipeTransform,BadRequestException,} from '@nestjs/common'
import { fromZodError } from 'zod-validation-error'
import { ZodError, ZodSchema } from 'zod'

 export class  ZodValidationPipe implements PipeTransform {
    constructor(private  schema: ZodSchema)  {}

    transform(value: unknown ) {
        try {
            return this.schema.parse(value)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message:'Validation Failed',
                    statusCode: 400,
                    error: fromZodError(error),
                })

            }

            throw new BadRequestException('Validation failed')
        }

        return value
    }
 }