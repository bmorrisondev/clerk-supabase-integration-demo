# Clerk Supabase Integration Demo

This repository demonstrates how the Clerk Supabase integration operates

## How this project works

The Clerk Supabase integration functions by using a custom Supabase Client object in the application that adds a Clerk Access Token to the header of requests to Supabase. Using Row Level Security, Supabase will match the Clerk User ID to values stored in a `user_id` column of a Supabase table.

The [Clerk docs](https://clerk.com/docs/integrations/databases/supabase) contain more information about how to set up this integration with your own project, but you can also review the code at `src/app/pages.tsx`. All relevant code is commented to make it easier to understand and integrate.

## Running the project

If you'd rather test the integration yourself, you may do

1. Create a Supabase Project
2. Create a table in your Supabase project with the following schema:
```sql
create table tasks(
  id serial primary key,
  name text not null,
  is_done boolean not null default false,
  user_id text not null default requesting_user_id()
);
```
3. Run the following in the terminal to clone this repository to your computer:
```bash
git clone https://github.com/clerk/clerk-supabase-integration-demo
```
4.  Follow the directions on the Clerk docs to configure RLS and the necessary functions.
  - When directed, use the table name of `tasks`.
  - Note that the `.env.local` values will be added to that file at the root of the project.
5.  At the root of the project, run the following commands in the terminal to install the dependencies and start the project:
```bash
npm install
npm run dev
```
6. Open the project in your browser at the URL shown in your terminal.
7. Create an account or log in with an existing account.

From here, you may test creating and managing tasks, as well as switching between different accounts.

