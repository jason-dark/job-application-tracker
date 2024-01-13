import { Database } from '@job-application-tracker/types';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private clientInstance: SupabaseClient<Database>;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService
  ) {}

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log(`client exists - returning for current ${Scope.REQUEST}`);
      return this.clientInstance;
    }

    this.logger.log(`initialising new supabase client for new ${Scope.REQUEST}`);

    this.clientInstance = createClient<Database>(
      this.configService.get('NEXT_PUBLIC_SUPABASE_URL'),
      this.configService.get('SUPABASE_SERVICE_ROLE_KEY')
    );

    return this.clientInstance;
  }
}
