import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClerkSupabaseClientSsr } from "./client";
import TaskRow from "./TaskRow";

// 👉 Register the `Clerk` object  the global window fix TypeScript errors
declare global {
  interface Window {
    Clerk: any;
  }
}

const client = createClerkSupabaseClientSsr();

export default async function Home() {
  // 👉 Query the "tasks" table to render the page
  const { data, error } = await client.from("tasks").select()
  if(error) {
    throw error
  }
  const tasks = data

  async function onSubmit(formData: FormData) {
    'use server'
    const name = formData.get('name') as string;
    await client.from("tasks").insert({
      name
    });
  }

  return (
    <div className='flex flex-col'>
      <form action={onSubmit} className='flex gap-2'>
        <Input
          autoFocus
          type='text'
          name='name'
          placeholder='What do you need to do?' />
        <Button type='submit' className='disabled:cursor-not-allowed'>Add</Button>
      </form>
      <div className='flex flex-col gap-2 p-2'>
        {tasks?.map((task: any) =>
          <TaskRow key={task.id} id={task.id} name={task.name} is_done={task.is_done} />
        )}
      </div>
    </div>
  );
}
