import { NextResponse } from "next/server"
import { db } from "@/lib/database";
import z from "zod";
import { categoryList, priorityList } from "@/app/tasks";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM todos");
        return NextResponse.json(rows);
    } catch(e) {
        console.error(e)
        return NextResponse.json({
            message: "failed to fetch"
        }, { status: 500 });
    }
}

// previous uses of arrays as enums should be converted to zod enums
const AddItemRequestBodyStructure = z.object({
    name: z.string(),
    priority: z.enum(priorityList),
    category: z.enum(categoryList)
})

const UpdateItemRequestBodyStructure = z.object({
    id: z.int().gt(0),/*
    name: z.string().min(1).optional(),
    priority: z.enum(priorityList).optional(),
    category: z.enum(categoryList).optional(),
    completed: z.boolean().optional(),*/
    completed: z.boolean()
})


export async function POST(req: Request) {
    try {
        const body = await AddItemRequestBodyStructure.safeParse(await req.json());
        if (!body.success)
            return NextResponse.json({message: "Malformed object structure", error: body.error}, {status: 400});

        const {data} = body
        
        // completed default is false so we pay no mind
        const [row] = await db.query("INSERT INTO todos (name, priority, category) values (?, ?, ?)", [
            data.name, data.priority, data.category
        ]);

        return NextResponse.json(row, { status: 201 });
    }
    catch (e) {
        console.error({ e });
        return NextResponse.json({ message: "failed in catch block" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await UpdateItemRequestBodyStructure.safeParse(await req.json());
        if (!body.success)
            return NextResponse.json({message: "Malformed object structure", error: body.error}, {status: 400});

        const {data} = body
        
        // only completed implemented for now because i'm lazy
        const [row] = await db.query("UPDATE todos SET completed = ? WHERE id = ?", [
            data.completed, data.id
        ]);

        return NextResponse.json(row, { status: 200 });
    }
    catch (e) {
        console.error({ e });
        return NextResponse.json({ message: "failed in catch block" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    let id: number
    try {
        id = parseInt(new URL(req.url).searchParams.get("id")!, 10)
    } catch {
        return NextResponse.json({ message: "bad id" }, { status: 400 });
    }

    try {
        const [rows] = await db.query("DELETE todos WHERE id = ?", [id]);
        return NextResponse.json(rows, { status: 200 })
    } catch (e) {
        return NextResponse.json({ message: "bad id" }, { status: 500 });
    }
}