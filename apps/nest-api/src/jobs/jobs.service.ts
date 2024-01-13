import {
  CreateJobPayload,
  Job,
  RequestWithUser,
  UpdateJobPayload,
} from '@job-application-tracker/types';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { SupabaseService } from '../supabase/supabase.service';

/**
 * Service for managing jobs.
 */
@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @Inject(REQUEST) private readonly request: RequestWithUser,
    private readonly supabase: SupabaseService
  ) {}

  /**
   * Retrieves all jobs associated with the current user.
   * @returns A Promise of an array of Jobs.
   */
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

  /**
   * Creates a new job for the current user.
   * @param job - The payload containing information about the new job.
   * @returns A Promise that resolves to the created Job object.
   * @throws HttpException with status BAD_REQUEST if there's an error creating the job.
   */
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

  /**
   * Updates an existing job for the current user.
   * @param jobUpdate - The payload containing updated information about the job.
   * @returns A Promise that resolves to the updated Job object.
   * @throws HttpException with status BAD_REQUEST if there's an error updating the job.
   */
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

  /**
   * Deletes a job by its ID.
   * @param id - The ID of the job to be deleted.
   * @returns A Promise that resolves when the job is successfully deleted.
   * @throws HttpException with status BAD_REQUEST if there's an error deleting the job.
   */
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
