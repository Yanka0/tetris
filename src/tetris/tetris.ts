import { GameModel } from "./tetrisGameModel"
import { Piece } from "./tetrisPiece"


export let canvas:any =document.getElementById("canvas") 
export let ctx : CanvasRenderingContext2D = canvas.getContext("2d")
export interface Data {
    name: string,
    score:number,
    [key:string]:any
}
 
const scoreWorth  = 100 
export let blockSideLength:number = 30 //размер одного квадрата
ctx.scale(blockSideLength, blockSideLength) //масштабирование 
const shapes: number[][][] = [
    [],
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ], 

    [
        [2,0,0],
        [2,2,2],
        [0,0,0],
    ],

    [
        [0,0,3],
        [3,3,3],
        [0,0,0],
    ],

    [
        [4,4],
        [4,4],
    ],

    [
        [0,5,5],
        [5,5,0],
        [0,0,0],
    ],

    [
        [0,6,0],
        [6,6,6],
        [0,0,0],
    ],

    [
        [7,7,0],
        [0,7,7],
        [0,0,0],
    ],

]
export let model = new GameModel(ctx)

let score: number = 0 

export let newGameState = () =>  {
    fullSend() 
    if (model.fallingPiece === null) {
        const rand = Math.round(Math.random() * 6) + 1
        const newPiece = new Piece(shapes[rand], ctx) 
        model.fallingPiece = newPiece 
        model.moveDown()
    } else {
        model.moveDown()
    }
}

let arr :number[] = [];
const fullSend = () => {
    const allFilled = (row:number[]) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            score += scoreWorth ;
            
            model.grid.splice(i, 1) 
            model.grid.unshift([0,0,0,0,0,0,0,0,0,0])
        }
    } let over = document.querySelector(".over_pop_up") as HTMLElement;
    if (over.style.display == "") {score = 0}
    let scoreNum = document.querySelector('.scoreNum')as HTMLElement;
    scoreNum.innerHTML = String(score)
    interface MyObj {
        key:string

    }
   
   
   
   let storage = localStorage.getItem('items');
   if (typeof storage === 'string') {
   let data: Data[] = JSON.parse(storage);  
    arr.push(score)
            let set = new Set(arr);
            let sorted = Array.from(set).sort((a, b) => b - a);
            data[data.length-1].score = sorted[0];
            localStorage.setItem('items', JSON.stringify(data))
            let yourBest = document.querySelector('.yourBestNum') as HTMLElement;
            let str = String(data[data.length - 1].score)
            yourBest.innerHTML = str
            
}        
}       