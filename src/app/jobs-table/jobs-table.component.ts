import { Component } from '@angular/core';
import { JobsTableService } from './jobs-table.service';
import { Job } from './job';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.css'
})

export class JobsTableComponent {
    jobs: Job[];

    constructor(){
      // Create instance of Job Table Service and Get Jobs Data.
      const service = new JobsTableService();
      this.jobs = service.getJobs();
    }
}
