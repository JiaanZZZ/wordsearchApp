// import { Grid } from "./grid";
const submitWordBtn = document.querySelector(".submit-word");
const grid = new Grid();
submitWordBtn.addEventListener("click", async ()=>{
    let result = fetchGridInfo([
        "ONE",
        "TWO",
        "THREE"
    ]);
    grid.renderGrid(result);
});
async function fetchGridInfo(wordList) {
    const commaSeperatedWords = wordList.join(",");
    let response = await fetch(`http://localhost:8080/wordgrid?gridSize=10&wordList=${commaSeperatedWords}`);
    let result = await response.text();
    return result.split(" ");
}

//# sourceMappingURL=index.5247994d.js.map
