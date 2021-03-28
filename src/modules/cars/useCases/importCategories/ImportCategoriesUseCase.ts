import csvParse from "csv-parser";
import fs from "fs";

class ImportCategoriesUseCase {
  execute(file: Express.Multer.File): void {
    console.log(file);

    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse({
      headers: ["name", "description"],
    });

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoriesUseCase };
