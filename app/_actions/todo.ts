"use server";

import z from "zod";
import { zfd } from "zod-form-data";
import { categoryList, priorityList } from "../tasks";
import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { revalidatePath } from "next/cache";

const AddSchema = zfd.formData({
    task: z.string(),
    priority: z.enum(priorityList),
    category: z.enum(categoryList)
})
export async function add(fd: FormData) {
    const body = await AddSchema.safeParse(fd);
    if (!body.success)
        return console.log(body.error)//NextResponse.json({message: "Malformed object structure", error: body.error}, {status: 400});
    const {data} = body
    
    // completed default is false so we pay no mind
    const [row] = await db.query("INSERT INTO todos (name, priority, category) values (?, ?, ?)", [
        data.task, data.priority, data.category
    ]);

    revalidatePath("/api/todo");

    return //NextResponse.json(row, { status: 201 });
}