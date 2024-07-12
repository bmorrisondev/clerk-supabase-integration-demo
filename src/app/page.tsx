'use client'
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { DeleteIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// 👉 Register the `Clerk` object  the global window fix TypeScript errors
declare global {
  interface Window {
    Clerk: any;
  }
}

// 👉 Add the code for the Supabase client
function createClerkSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        // 👉 Get the Supabase token with a custom fetch method
        fetch: async (url, options = {}) => {
          const clerkToken = await window.Clerk.session?.getToken({
            template: "supabase",
          });

          // 👉 Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);

          // 👉 Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}

// 👉 Create a `client` object for accessing Supabase data using the Clerk token
const client = createClerkSupabaseClient();

export default   function Home() {
  const [tasks, setTasks] = useState<any[]>([])
  const [name, setName] = useState('')
  // 👉 The `useUser` hook will be used to ensure that Clerk has loaded data about the logged in user
  const { user } = useUser()


  // 👉 This `useEffect` will wait for the user object to be loaded before requesting
  // the tasks for the logged in user
  useEffect(() => {
    if(!user) return
    async function loadTasks() {
      const { data, error } = await client.from("tasks").select();
      if (!error) setTasks(data);
    }
    loadTasks()
  }, [user])

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // 👉 Insert task into the "tasks" database
    await client.from("tasks").insert({
      name
    });
    window.location.reload()
  }

  async function onCheckClicked(taskId: number, isDone: boolean) {
    // 👉 Update a task when its completed
    await client.from("tasks").update({
      is_done: isDone
    }).eq("id", taskId)
    window.location.reload()
  }

  async function deleteTask(taskId: number) {
    // 👉 Delete a task from the database
    await client.from("tasks").delete().eq("id", taskId)
    window.location.reload()
  }

  return (
    <div className='flex flex-col'>
      <form onSubmit={createTask} className='flex gap-2'>
        <Input
          autoFocus
          type='text'
          name='name'
          placeholder='What do you need to do?'
          onChange={e => setName(e.target.value)}
          value={name} />
        <Button type='submit' className='disabled:cursor-not-allowed'>Add</Button>
      </form>
      <div className='flex flex-col gap-2 p-2'>
        {tasks.map((task: any) => (
          <div key={task.id} className={`group flex items-center transition-all w-full${task.is_done ? 'text-slate-500' : ''}`}>
            <Button
              variant='link'
              className='text-lg text-inherit disabled:cursor-not-allowed'
              onClick={() => onCheckClicked(task.id, !task.is_done)}>
              { task.is_done ? <FiCheckCircle /> : <FiCircle /> }
            </Button>
            {task.name}
            <Button
              variant='link'
              className='text-lg text-inherit hover:text-red-500'
              onClick={() => deleteTask(task.id)}>
              <DeleteIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
