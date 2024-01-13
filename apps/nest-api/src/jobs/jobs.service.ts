import {
  CreateJobPayload,
  Job,
  RequestWithUser,
  UpdateJobPayload,
} from '@job-application-tracker/types';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @Inject(REQUEST) private readonly request: RequestWithUser,
    private readonly supabase: SupabaseService
  ) {}

  async getAllJobsForUser(): Promise<Job[]> {
    const userId = this.request?.user?.sub;
    const { data, error } = await this.supabase
      .getClient()
      .from('jobs')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error || !data.length) {
      this.logger.error(`Unable to load jobs for ${this.request.user.email}`);
      return [];
    }

    this.logger.log(`Loaded jobs for ${this.request.user.email}`);
    return data;
  }

  async createJob(job: CreateJobPayload): Promise<Job> {
    const newJob = { ...job, user_id: this.request.user.sub };
    const { data, error } = await this.supabase.getClient().from('jobs').insert(newJob).select();

    if (error) {
      this.logger.error(
        `Unable to create job for ${this.request.user.email}: ${error.message}. ${newJob}`
      );
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(
      `Created new job for ${this.request.user.email}: ${JSON.stringify(data, null, 4)}`
    );
    return data[0];
  }

  async updateJob(jobUpdate: UpdateJobPayload): Promise<Job> {
    // Explicitly only set these fields
    const update = {};
    ['company', 'job_title', 'hyperlink', 'status'].forEach((field) => {
      if (field in jobUpdate) {
        update[field] = jobUpdate[field].trim();
      }
    });

    const { data, error } = await this.supabase
      .getClient()
      .from('jobs')
      .update(update)
      .eq('id', jobUpdate.id)
      .eq('user_id', this.request.user.sub)
      .select();

    if (error) {
      this.logger.error(
        `Unable to update job for ${this.request.user.email}: ${error.message}. ${update}`
      );
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(
      `Updated job for ${this.request.user.email}: ${JSON.stringify(data, null, 4)}}`
    );
    return data[0];
  }

  async deleteJobById(id: string): Promise<void> {
    const { error } = await this.supabase
      .getClient()
      .from('jobs')
      .delete()
      .eq('id', id)
      .eq('user_id', this.request.user.sub);

    if (error) {
      this.logger.error(
        `Unable to delete job for ${this.request.user.email}: ${error.message}. Job id: ${id}`
      );
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    this.logger.log(`Deleted job with id ${id} for ${this.request.user.email}`);
  }
}
