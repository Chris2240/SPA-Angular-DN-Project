import { Job } from "./job";

export class JobsTableService{
    //Returns example Jobs Data Array.
    getJobs(): Job[]{
        return [
            {
                id: 1,
                title: "Job 1",
                description: "Description of Job 1"
            },
            {
                id: 2,
                title: "Job 2",
                description: "Description of Job 2"
            },
            {
                id: 3,
                title: "Job 3",
                description: "Description of Job 3"
            },
            {
                id: 4,
                title: "Job 4",
                description: "Description of Job 4"
            },
            {
                id: 5,
                title: "Job 5",
                description: "Description of Job 5"
            },
            {
                id: 6,
                title: "Job 6",
                description: "Description of Job 6"
            },
            {
                id: 7,
                title: "Job 7",
                description: "Description of Job 7"
            },
            {
                id: 8,
                title: "Job 8",
                description: "Description of Job 8"
            }
        ];
    }
}