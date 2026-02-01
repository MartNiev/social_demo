import fs from "fs";
import path from "path";
import { cwd } from "node:process";

export async function POST(req) {
  try {
    const object = await req.json();
    console.log(object);
    const filename = `${object.username}.json`;

    const filePath = path.join(process.cwd(), "users", filename);

    fs.writeFileSync(filePath, JSON.stringify(object, null, 2), "utf-8");

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error writing file:", error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
