import fs from "fs";
import path from "path";
import { cwd } from "node:process";

export async function POST(req) {
  try {
    const data = await req.json();

    const filePath = path.join(process.cwd(), "data", "data.json");

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error writing file:", error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
