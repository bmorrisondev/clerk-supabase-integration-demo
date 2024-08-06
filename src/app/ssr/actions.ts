'use server'

import { createClerkSupabaseClientSsr } from "./client"

const client = createClerkSupabaseClientSsr()

export async function deleteTask(taskId: number) {
  await client.from("tasks").delete().eq("id", taskId)
}

export async function setTaskState(taskId: number, isDone: boolean) {
  await client.from("tasks").update({
    is_done: isDone
  }).eq("id", taskId)
}