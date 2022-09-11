export function luckyDraw(player) {
 return new Promise((resolve, reject) => {
  const win = Boolean(Math.round(Math.random()));

  process.nextTick(() => {
   if (win) {
    resolve(`${player} won a prize in the draw!`);
   } else {
    reject(new Error(`${player} lost the draw.`));
   }
  });
 });
}

luckyDraw("francesco").then((value) => console.log(value)).catch((error) => console.log(error))
luckyDraw("marco").then((value) => console.log(value)).catch((error) => console.log(error))
luckyDraw("luigi").then((value) => console.log(value)).catch((error) => console.log(error))
