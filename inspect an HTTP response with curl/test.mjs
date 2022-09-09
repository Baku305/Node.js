import fetch from "node-fetch";

const request = await fetch("https://jsonplaceholder.typicode.com/posts/1/comments")

const json = await request.json()

console.log(json);