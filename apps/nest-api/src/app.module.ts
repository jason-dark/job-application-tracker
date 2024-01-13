import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { JobsController } from './jobs/jobs.controller';
import { JobsService } from './jobs/jobs.service';
import { AuthGuard } from './supabase/auth/supabase.guard';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [ConfigModule.forRoot(), SupabaseModule],
  controllers: [JobsController],
  providers: [
    JobsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
