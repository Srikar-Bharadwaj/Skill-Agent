import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const data = await req.json();
    const dbPath = path.join(process.cwd(), 'db.json');
    
    // Read existing
    let fileData = [];
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, 'utf-8');
      if (fileContent) {
        fileData = JSON.parse(fileContent);
      }
    }
    
    // Prepend new data (so latest is first)
    fileData.unshift({
      ...data,
      timestamp: new Date().toISOString()
    });
    
    // Save back
    fs.writeFileSync(dbPath, JSON.stringify(fileData, null, 2));
    
    return Response.json({ status: 'saved' });
  } catch (error) {
    console.error("DB Save Error:", error);
    return Response.json({ error: "Failed to save to DB" }, { status: 500 });
  }
}
