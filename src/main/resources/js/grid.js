export class Grid {
  constructor() {
    this.wordSelectMode = false;
    this.selectedItems = [];
    this.firstSelectedItem;
    this.gridArea = null;
    this.words=[];
    this.foundWords=[];
  }

  getCellsInRange(firstLetter, currentLetter) {
    let cellsInRange = [];
    if (firstLetter.x > currentLetter.x|| firstLetter.y>currentLetter.y) {
        [currentLetter, firstLetter] = [firstLetter, currentLetter];
      }

    if (firstLetter.y === currentLetter.y) {
      for (let i = firstLetter.x; i <= currentLetter.x; i++) {
        cellsInRange.push(
          this.gridArea.querySelector(
            `td[data-x="${i}"][data-y="${currentLetter.y}"]`
          )
        );
      }
    } else if (firstLetter.x === currentLetter.x) {
        for (let i = firstLetter.y; i <= currentLetter.y; i++) {
          cellsInRange.push(
            this.gridArea.querySelector(
              `td[data-x="${currentLetter.x}"][data-y="${i}"]`
            )
          );
        }
    }else if (currentLetter.y - firstLetter.y ===currentLetter.x-firstLetter.x){
        let delta = currentLetter.y - firstLetter.y;
        for (let i=0;i<=delta;i++){
            cellsInRange.push(this.gridArea.querySelector(`td[data-x="${currentLetter.x+i}"][data-y="${firstLetter.y+i}"]`));
        }

    }

    return cellsInRange;

  }

  renderGrid(gridSize, wordGrid) {
    var gridArea = document.getElementsByClassName("grid-area")[0];
    if (gridArea.lastChild) {
      gridArea.removeChild(gridArea.lastChild);
    }
    this.gridArea = gridArea;
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    let index = 0;
    // creating all cells
    for (let i = 0; i < gridSize; i++) {
      // creates a table row
      var row = document.createElement("tr");

      for (let j = 0; j < gridSize; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        let letter = wordGrid[index++];
        var cellText = document.createTextNode(letter);
        cell.appendChild(cellText);
        cell.setAttribute("data-x", i);
        cell.setAttribute("data-y", j);
        cell.setAttribute("data-letter", letter);
        row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    gridArea.appendChild(tbl);

    tbl.addEventListener("mousedown", (event) => {
      this.wordSelectMode = true;
      const cell = event.target;
      let x = cell.getAttribute("data-x");
      let y = cell.getAttribute("data-y");
      let letter = cell.getAttribute("data-letter");
      this.firstSelectedItem = {
        x,
        y
      };
    });

    tbl.addEventListener("mousemove", (event) => {
      if (this.wordSelectMode) {
        const cell = event.target;
        let x = +cell.getAttribute("data-x");
        let y = +cell.getAttribute("data-y");
        let letter = cell.getAttribute("data-letter");

        this.selectedItems.forEach(cell=>cell.classList.remove("selected"));
        this.selectedItems = this.getCellsInRange(this.firstSelectedItem, {x,y});
        this.selectedItems.forEach(cell => cell.classList.add("selected"));
      }
    });

    tbl.addEventListener("mouseup", (event) => {
      this.wordSelectMode = false;
      const selectedWord = this.selectedItems.reduce((word,cell)=>word+=cell.getAttribute("data-letter"),'');
      const reversedSelectedWord = selectedWord.split("").reverse().join();
      if(this.words.indexOf(selectedWord)!==-1 ){
        this.foundWords.push(selectedWord);
      }else if(this.words.indexOf(reversedSelectedWord.r)!==-1){
        this.foundWords.push(reversedSelectedWord);
      } else {
        this.selectedItems.forEach(item => item.classList.remove("selected"));
      }
      this.selectedItems=[];

    })
  }
}
