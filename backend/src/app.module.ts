import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { PackagesModule } from './packages/packages.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { BlogModule } from './blog/blog.module';
import { SettingsModule } from './common/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ServicesModule,
    PackagesModule,
    InquiriesModule,
    TestimonialsModule,
    BlogModule,
    SettingsModule,
  ],
})
export class AppModule {}
