import { Job, RequestWithUser } from '@job-application-tracker/types';
import { Inject, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class JobsService {
  constructor(
    @Inject(REQUEST) private readonly request: RequestWithUser,
    private readonly supabase: SupabaseService
  ) {}

  async getAllJobsForUser(): Promise<Job[]> {
    console.log('user:', this.request.user);
    const anyData = await this.supabase.getClient().from('jobs').select();
    console.log(anyData);
    const userId = this.request?.user?.id;
    if (!userId) {
      return [];
    }
    const { data, error } = await this.supabase.getClient().from('jobs').select().eq('id', userId);

    if (error || !data.length) {
      return [];
    }

    return data;
  }
}
