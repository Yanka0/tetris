import { colors, cols } from "./tetrisGameModel"

 export class Piece {
    shape:number[][];
    ctx:CanvasRenderingContext2D;
    y:number;
    x:number
    constructor(shape:number[][], ctx:CanvasRenderingContext2D) {
        this.shape = shape 
        this.ctx = ctx 
        this.y = 0 
        this.x = Math.floor(cols / 2)
    }

    renderPiece() {
        this.shape.map((row:number[], i:number) => {
            row.map((cell, j) => {
                if (cell > 0) {
                    this.ctx.fillStyle = colors[cell] 
                    this.ctx.fillRect(this.x + j, this.y + i, 1, 1)
                }
            })
        })
    }
}
