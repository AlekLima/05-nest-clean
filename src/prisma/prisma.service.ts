import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService
 extends PrismaClient 
 implements OnModuleInit, 
 OnModuleDestroy {
    public client: PrismaClient

    constructor() {
        super({
            log:  ['warn', 'error']
        })
    } 
    onModuleInit() {
        return this.$connect()
    }
    onModuleDestroy() {
        return this.$disconnect()
    }
}

