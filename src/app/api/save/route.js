import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.json();

    const filePath = path.join(
      "C:\Users\manie\Documents\VSCode\React Projects\social",
      "data",
      "data.json",
    );
    console.log(filePath);

    await fs.writeFileSync("filePath", JSON.stringify(data, null, 2), "utf-8");

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error writing file:", error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

const p = path.join(process.cwd(), "data", "data.json");
console.log(p);
