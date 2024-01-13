import { Database } from '@job-application-tracker/types';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';

/**
 * Service for interacting with Supabase. A single instance of the provider is shared across the entire application. We use a service account for auth so we don't need to worry about auth per request.
 */
@Injectable({ scope: Scope.DEFAULT })
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private clientInstance: SupabaseClient<Database>;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService
  ) {}

  /**
   * Get the Supabase client instance.
   * If the client instance already exists, it returns the existing client.
   * Otherwise, it initializes a new client and returns it.
   * @returns The Supabase client instance.
   */
  getClient() {
    if (this.clientInstance) {
      this.logger.log(`Supabase client already exists - returning existing client`);
      return this.clientInstance;
    }

    this.logger.log(`Initialising and returning new Supabase client`);

    this.clientInstance = createClient<Database>(
      this.configService.get('NEXT_PUBLIC_SUPABASE_URL'),
      this.configService.get('SUPABASE_SERVICE_ROLE_KEY')
    );

    return this.clientInstance;
  }
}
