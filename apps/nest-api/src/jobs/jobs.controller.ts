import { CreateJobPayload, UpdateJobPayload } from '@job-application-tracker/types';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getAllJobsForUser() {
    return this.jobsService.getAllJobsForUser();
  }

  @Post('create')
  createJob(@Body() job: CreateJobPayload) {
    console.log(job);
    return this.jobsService.createJob(job);
  }

  @Patch('update')
  updateJob(@Body() job: UpdateJobPayload) {
    console.log(job);
    return this.jobsService.updateJob(job);
  }

  @Delete(':id')
  deleteJob(@Param('id') id: string) {
    console.log(id);
    return this.jobsService.deleteJobById(id);
  }
}
