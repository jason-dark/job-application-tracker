import {
  CreateJobPayload,
  Job,
  RequestWithUser,
  UpdateJobPayload,
} from '@job-application-tracker/types';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class JobsService {
  constructor(
    @Inject(REQUEST) private readonly request: RequestWithUser,
    private readonly supabase: SupabaseService
  ) {}

  async getAllJobsForUser(): Promise<Job[]> {
    console.log('userId:', this.request.user.sub);
    const userId = this.request?.user?.sub;
    const { data, error } = await this.supabase
      .getClient()
      .from('jobs')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error || !data.length) {
      return [];
    }

    return data;
  }

  async createJob(job: CreateJobPayload): Promise<Job> {
    console.log('userId:', this.request.user.sub);
    const { data, error } = await this.supabase
      .getClient()
      .from('jobs')
      .insert({ ...job, user_id: this.request.user.sub })
      .select();

    if (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return data[0];
  }

  async updateJob(jobUpdate: UpdateJobPayload): Promise<Job> {
    console.log('userId:', this.request.user.sub);

    // Explicitly only set these fields
    const update = {};
    ['company', 'job_title', 'hyperlink', 'status'].forEach((field) => {
      if (field in jobUpdate) {
        update[field] = jobUpdate[field].trim();
      }
    });

    console.log({ update });

    const { data, error } = await this.supabase
      .getClient()
      .from('jobs')
      .update(update)
      .eq('id', jobUpdate.id)
      .eq('user_id', this.request.user.sub)
      .select();

    if (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return data[0];
  }

  async deleteJobById(id: string): Promise<void> {
    console.log('userId:', this.request.user.sub);
    const { error } = await this.supabase
      .getClient()
      .from('jobs')
      .delete()
      .eq('id', id)
      .eq('user_id', this.request.user.sub);

    if (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
