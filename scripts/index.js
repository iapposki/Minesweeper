import {Minesweeper} from "./mnsp.js";


const board_size = 9;
var mines = 10;



const boardElement = document.getElementById("board");
const mineLeftCount = document.querySelector('.data-mine-left');
const messageElement = document.querySelector('.subtext');

// document.body.style.backgroundImage = "url('./assets/mine.png')"

const newBoard = new Minesweeper(board_size,mines)
newBoard.board.forEach(function(row){
    row.forEach(function(tile){
        // console.log(tile[0][0],tile[0][1])
        boardElement.append(tile.element);
        // tile.element.addEventListner("click",function)
        tile.element.addEventListener("click", function(){
            newBoard.revealTile(tile);
            var res = newBoard.checkGameEnd();
            var win = res[0];
            var lose = res[1];
            if (win || lose){
                // newBoard.addEventListener("click",this.stopProp,{capture:true});
                // newBoard.addEventListener("contextmenu",this.stopProp,{capture:true})
            }
            if (win){
                messageElement.innerHTML = "You win!";
            }
            if (lose){
                messageElement.innerHTML = "You Lose!";
            }
        })        
        tile.element.addEventListener("contextmenu", function(e){
            // prevent default right click menu
            e.preventDefault();
            newBoard.markTile(tile);
            if (tile.status == newBoard.tile_status.MARKED){
                mines--;
                // console.log(mines)
                mineLeftCount.innerHTML = mines;
            } else if (tile.status == newBoard.tile_status.HIDDEN) {
                mines++;
                mineLeftCount.innerHTML = mines;
            }
            
            // listMineLeft();
        })
    })
})


boardElement.style.setProperty("--size", board_size);
mineLeftCount.innerHTML = mines;

