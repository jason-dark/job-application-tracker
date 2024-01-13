import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@job-application-tracker/types';

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
