import * as fs from "node:fs";

fs.readFile("file-0.txt", { encoding: "utf-8" }, (error, data) =>
  error ? console.error(error) : console.log(data)
);
