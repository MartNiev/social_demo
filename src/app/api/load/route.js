import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { cwd } from "process";

export async function GET(req) {
  try {
    const request = await req;

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    // Just a quick setup. Not in real world app using PII

    const filename = `${name}.json`;
    // Get the username from req as it being pass as part of the request header

    const filepath = path.join(process.cwd(), "users", filename);

    const file = fs.readFileSync(filepath, "utf-8");
    const object = JSON.parse(file);

    return NextResponse.json(object);
  } catch (error) {
    console.log("Error loading file: " + error);
    return Response.json({ success: false });
  }
}
