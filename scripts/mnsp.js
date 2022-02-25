// export const tile_status = {
//     HIDDEN : "hidden",
//     MINE : "mine",
//     NUMBER : "number",
//     MARKED : "marked"
// }

// export function createBorad(board_size, mines_count){
//     const board = [];
//     const mine_positions = getMinePositions(board_size,mines_count);
//     for(let x = 0; x < board_size; x++){
//         const row = [];
//         for(let y = 0; y < board_size; y++){
//             const element = document.createElement("div");
//             element.dataset.status = tile_status.HIDDEN;
//             // if you want to add a class to a specific element
//             // element.classList = element.classList + "cell"
//             element.dataset.status = tile_status.HIDDEN;
//             const tile = {
//                 x,
//                 y,
//                 element, // html element
//                 // mine: mine_positions.some(positionMatch.bind(null, {x,y})),
//                 // get dataset value
//                 get status(){
//                     return element.dataset.status;
//                 },
//                 set status(value) {
//                     this.element.dataset.status = value
//                 }    
//             }

//             row.push(tile); 
//         }    
//         board.push(row)
//     }    
//     // console.log(board[0][0])
//     for (var i in mine_positions){
//         // console.log(mine_positions[i],board[mine_positions[i][0]][mine_positions[i][1]][0].HIDDEN)
//         board[mine_positions[i][0]][mine_positions[i][1]].element.dataset.status = tile_status.MINE;
//         // board[mine_positions[i][0]][mine_positions[i][1]].element.style.backgroundColor = "red"
//     }
//     return {board, mine_positions}
// }    

// export function getMinePositions(board_size, mines_count){
//     const positions = [];
//     while (positions.length < mines_count){
//         var x = randomNumber(board_size);
//         var y = randomNumber(board_size);
//         const position = [x,y]
//         var cond = false;
//         for (var i in positions){
//             if (arrayEquality(positions[i],position)){
//                 cond = true;
//             }
//         }
//         if (!cond){
//             positions.push(position);
//         }

//     }
//     return positions;
// }

// export function arrayEquality(a,b){
//     for (var i in a){
//         if (a[i] != b[i]){
//             return false;
//         }
//     }
//     return true;
// }


// export function randomNumber(size){
//     return Math.floor(Math.random()*size);
// }

// export function markTile(tile){
//     if (tile.status != tile_status.HIDDEN && tile.status != tile_status.MARKED){
//         return;
//     }
//     if (tile.status == tile_status.MARKED){
//         tile.status = tile_status.HIDDEN;
//         return;
//     } else{
//         tile.status = tile_status.MARKED;
//     }
//     // if (tile.status === tile_status.MARKED){
//     //     tile.element.style.backgroundColor = "Red";
//     // }

// }


export class Minesweeper{

    constructor(board_size, mines_count){
        this.board_size = board_size;
        this.mines_count = mines_count;
        this.tile_status = {
            HIDDEN: "hidden",
            MINE: "mine",
            NUMBER: "number",
            MARKED: "marked",
        }
        
        this.board = [];
        this.mine_positions = [];

        // self starting functions
        this.getMinePositions();
        this.createBorad();
    }

    getMinePositions(){
        while (this.mine_positions.length < this.mines_count){
            var x = this.randomNumber();
            var y = this.randomNumber();
            const position = [x,y]
            var cond = false;
            for (var i in this.mine_positions){
                if (this.arrayEquality(this.mine_positions[i],position)){
                    cond = true;
                }
            }
            if (!cond){
                this.mine_positions.push(position);
            }
    
        }
    }

    createBorad(){
        for(let x = 0; x < this.board_size; x++){
            const row = [];
            var adj = 0;
            for(let y = 0; y < this.board_size; y++){
                const element = document.createElement("div");
                element.dataset.status = this.tile_status.HIDDEN;
                const tile = {
                    x,
                    y,
                    element, // html element
                    mine: false,
                    // get dataset value
                    get status(){
                        return element.dataset.status;
                    },
                    set status(value) {
                        this.element.dataset.status = value
                    },
                    adj,
                }
                row.push(tile); 
            }    
            this.board.push(row)
        }    
        for (var i in this.mine_positions){
            this.board[this.mine_positions[i][0]][this.mine_positions[i][1]].mine = true;
            
            // board[mine_positions[i][0]][mine_positions[i][1]].element.style.backgroundColor = "red"
        }
    }

    markTile(tile){
        if (tile.status !== this.tile_status.HIDDEN && tile.status !== this.tile_status.MARKED) return;
        if (tile.status === this.tile_status.MARKED){
            tile.status = this.tile_status.HIDDEN;
            tile.element.style.backgroundColor = "#666";
            tile.element.style.backgroundImage = "none"
            return;
        } else{
            tile.status = this.tile_status.MARKED;
            // tile.element.style.backgroundColor = "yellow";
            // object.style.backgroundSize = "auto|length|cover|contain|intial|inherit"
            tile.element.style.backgroundImage = "url('./assets/flag.png')"
            tile.element.style.backgroundSize = "1.77em";
        }
        // if (tile.status === tile_status.MARKED){
        //     tile.element.style.backgroundColor = "Red";
        // }
    
    }

    revealTile(tile){
        if (tile.status !== this.tile_status.HIDDEN) return;
        if (tile.mine){
            tile.status = this.tile_status.MINE;
            tile.element.style.backgroundColor = "Red";
            return;
        } else {
            this.revealSurroundingTiles(tile);
        }
    }

    revealSurroundingTiles(tile){
        if (tile.status != this.tile_status.NUMBER && tile.status != this.tile_status.MARKED){
            var mines_arr = [];
            for (let xoffset = -1; xoffset < 2; xoffset++){
                for (let yoffset = -1; yoffset < 2; yoffset++){
                    var x_ = tile.x + xoffset;
                    var y_ = tile.y + yoffset;
                    if (x_ < this.board_size && x_ > -1 && y_ < this.board_size && y_ > -1){
                        if (this.board[x_][y_].mine){
                            mines_arr.push(this.board[x_][y_])
                        }
                    }
                }
            }
            
            if (mines_arr.length != 0){
                tile.element.innerHTML = mines_arr.length;
                // tile.element.style.fontSize = "4";
                if (mines_arr.length == 1){
                    tile.element.style.color = "#0001fb";
                }
                if (mines_arr.length == 2){
                    tile.element.style.color = "#028001";
                }
                if (mines_arr.length == 3){
                    tile.element.style.color = "#fc0200";
                }
                if (mines_arr.length == 4){
                    tile.element.style.color = "#010180";
                }
                if (mines_arr.length == 5){
                    tile.element.style.color = "#810103";
                }
                if (mines_arr.length == 6){
                    tile.element.style.color = "#017e7d";
                }
                if (mines_arr.length == 7){
                    tile.element.style.color = "#000000";
                }
                if (mines_arr.length == 8){
                    tile.element.style.color = "#808080";
                }
            }
            tile.status = this.tile_status.NUMBER
            tile.element.style.backgroundColor = "#b9b9b9";
            if (mines_arr.length == 0){
                // console.log("this tile has no adj mines")
                for (let xoffset = -1; xoffset < 2; xoffset++){
                    for (let yoffset = -1; yoffset < 2; yoffset++){
                        var x_ = tile.x + xoffset;
                        var y_ = tile.y + yoffset;
                        if (x_ < this.board_size && x_ > -1 && y_ < this.board_size && y_ > -1){
                            this.revealSurroundingTiles(this.board[x_][y_])
                        }
                    }
                }
            }
        }

    }

    checkGameEnd(){
        console.log(this.tile_status.NUMBER);
        var win = this.checkWin(this.tile_status);
        var lose = this.checkLose(this.tile_status);
        console.log(win,lose)
        return [win,lose];
    }

    checkWin(tile_status){
        var cond = true;
        this.board.forEach(function(row){
            row.forEach(function(tile){
                if (!tile.mine && (tile.status != tile_status.NUMBER)){
                    cond = false;
                } else if (tile.mine && tile.status == tile_status.MINE){
                    cond = false;
                }
            })
        })
        return cond;
    }

    checkLose(tile_status){
        var cond = false;
        this.board.forEach(function(row){
            row.forEach(function(tile){
                if (tile.status == tile_status.MINE){
                    cond = true;
                }
            })
        })
        return cond;
    }

    randomNumber(){
    return Math.floor(Math.random()*this.board_size);
    }

    arrayEquality(a,b){
        for (var i in a){
            if (a[i] != b[i]){
                return false;
            }
        }
        return true;
    }

    
}