# Job application tracker [WIP]

#### Hello 👋. If you’re reading this I’m guessing you’re thinking of hiring me.

You've probably noticed that my public GitHub is a bit sparse. Almost every line of code I’ve ever written lives within private organisation repos. The aim of this project is to give you an idea of how I might structure a full stack application.

##### What to build?

I’m currently looking for a job, so I figure a job application tracking board makes sense. At least this is something I can use!

##### Let’s start with my user stories:

- As a job seeker, I need somewhere to record jobs I am interested in.
- I want to set a status for each job (applied / to apply / declined / 1st round scheduled / etc).
- I want to record the hyperlink to the job posting.
- I want to be able to record custom data for job that is important to me.

(Of course this does sound an awful lot like what a spreadsheet does, but that’s not the point of this project 😆)

##### Now let’s break these down into some high-level functional requirements:

- We need a front end that shows an editable table representation of the user's jobs.
- We need a database to save jobs in.
- We need a user authentication system to keep our users' data secure.
- We need an API to relay data between our front end and our back end.

#### Here's how I have built this project

- The project lives within a Nx monorepo. This makes it easy for me to seperate concerns while seamlessly sharing types and other common libs between projects. Build and test commands will stay consistent too, which means a simpler CI/CD setup.
- I have used Vercel to deploy the front end as a static Next.js site. Previously I would have used CRA for something this simple, but the new React docs recommend Next.js.
- I also used Vercel to deploy the NestJS API. It's free and this is a simple project, so why not. NestJS lends itself to code that is easy to test, so this will fit nicely into the monorepo.
- I used Supabase for user authentication and for a PostgreSQL database. The only reason was that it's a free way to get a relational database and I don't want to pay for one for a demo project like this.

#### Running locally

##### Getting a dev environment running

- Clone this library, then from within the root of the project run `yarn`.
- Edit the contents of `.env.example` to contain valid Supabase data (only required if you want to create an account and add jobs).
- Rename `.env.example` to `.env`.
- Run `yarn dev`

##### Running tests

- Run `yarn test`
