import { NextResponse } from "next/server"
import { db } from "@/lib/database";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM todos");
        return NextResponse.json(rows);
    } catch {
        return NextResponse.json({
            message: "failed to fetch"
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, id, priority, category, completed } = await req.json();
        console.log({ name, id, priority, category, completed });

        if (!name) {
            return NextResponse.json({
                message: "name is required"
            },
                { status: 500 })
        }

        const row = await db.query("INSERT INTO todos (name, priority, category, completed) values (?, '', '', ?)", [
            name, priority, category, false
        ]);

        return NextResponse.json(row, { status: 201 });
    }
    catch (e) {
        console.error({ e });

        return NextResponse.json({ message: "failed in catch block" }, { status: 500 });
    }
}