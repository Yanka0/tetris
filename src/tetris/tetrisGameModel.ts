export let cols :number;
let rows:number; 
let width = document.documentElement.clientWidth
if (width > 1300){
  cols = 16
  rows = 23;
  let canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.setAttribute('height','690')
  canvas.setAttribute('width','480')
} else {rows = 15; cols = 10} 

export const colors :string[] = [
    '#000000',
    '#7DFF68',
    '#90FFEB',
    '#FAFE26',
    '#EA97FF',
    '#FEA826',
    '#FFFFFF',
    '#68A4FF'
]

export class GameModel {
    ctx:CanvasRenderingContext2D;
    fallingPiece: any;
    grid:number[][];
    
    constructor(ctx:CanvasRenderingContext2D) {
        this.ctx = ctx 
        this.fallingPiece = null // падающий кусок 
        this.grid = this.makeStartingGrid()
    }

    makeStartingGrid() { // массив нулей
        let grid:number[][] = [] 
        for (let i = 0; i < rows; i++) {
            grid.push([])
            for (let j = 0; j < cols; j++) {
                grid[grid.length - 1].push(0)
            }
        }
        return grid 
    }

    collision(x:number, y:number, candidate :null |any= null) {
        const shape = candidate || this.fallingPiece.shape 
        const n = shape.length 
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (shape[i][j] > 0) {
                    let p = x + j 
                    let q = y + i  
                    if (p >= 0 && p < cols && q < rows) {
                        // в границах
                        if (this.grid[q][p] > 0) {
                            return true
                        }
                    } else {
                        return true
                    }
                }
            }
        }
        return false
    }

    renderGameState() {
        
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                
                let cell = this.grid[i][j] 
                this.ctx.fillStyle = colors[cell] 
                this.ctx.fillRect(j, i, 1, 1)
            }
        }

        if (this.fallingPiece !== null) {
            this.fallingPiece.renderPiece()
        }
    }
    
    moveDown() {
        let over = document.querySelector(".over_pop_up") as HTMLElement;  
        if (this.fallingPiece === null || over.style.display == "") {

            this.renderGameState() 
            return
        } else if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
            const shape = this.fallingPiece.shape 
            const x = this.fallingPiece.x 
            const y = this.fallingPiece.y 
            shape.map((row:number[], i:number) => {
                row.map((cell, j) => {
                    let p = x + j 
                    let q = y + i 
                    if (p >= 0 && p < cols && q < rows && cell > 0) {
                        this.grid[q][p] = shape[i][j]
                    }
                })
            })
            function gameOver() {
                let over = document.querySelector(".over_pop_up") as HTMLElement;
                over.style.cssText = "";
                over.addEventListener("click", () => {over.style.display = "none"});
                
          
              }
            // проверка конца игры
            if (this.fallingPiece.y === 0) {
                gameOver()
                this.grid = this.makeStartingGrid()
            }
            this.fallingPiece = null
        } else {
            this.fallingPiece.y += 1
        }
        this.renderGameState()
    }
    
    move(right:string|boolean) {
        if (this.fallingPiece === null) {
            return
        }

        let x = this.fallingPiece.x 
        let y = this.fallingPiece.y 
        if (right) {
            // право
            if (!this.collision(x + 1, y)) {
                this.fallingPiece.x += 1
            }
        } else {
            // лево
            if (!this.collision(x - 1, y)) {
                this.fallingPiece.x -= 1
            }
        }
        this.renderGameState()
    }
  
    rotate() {
        if (this.fallingPiece !== null) {
            let shape: number[][]= [...this.fallingPiece.shape.map((row:number[]) => [...row])]
            // transpose of matrix 
            for (let y = 0; y < shape.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [shape[x][y], shape[y][x]] = 
                    [shape[y][x], shape[x][y]]
                }
            }
            // reverse order of rows 
            shape.forEach((row => row.reverse()))
            if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, shape)) {
                this.fallingPiece.shape = shape
            }
        }
        this.renderGameState()
    }
}



