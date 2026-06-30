"use client";
import { createContext, useState } from "react";
import { Task } from "../tasks";
const TaskListContext = createContext<ReturnType<typeof useState<Task[]>> | null>(null)
export default TaskListContext;