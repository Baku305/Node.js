import * as fs from "node:fs";

// fs.readFile("file-0.txt", { encoding: "utf-8" }, (error, data) =>
//   error ? console.error(error) : console.log(data)
// );

const data = "In this file was written somethings"

fs.writeFile("someText.txt", data, (err) => {

 if (err) {
  console.log(err);
 } else {
  console.log("file written successfully");
  console.log(fs.readFileSync("someText.txt", "utf8"));
 }

})
