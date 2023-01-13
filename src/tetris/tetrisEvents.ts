import { model } from "./tetris"

const gameBtns = document.querySelector('.gamebtns') as HTMLElement
gameBtns.addEventListener("click", (event) => { 
    let target = event.target as Element
    event.preventDefault() 
    if (target.closest('.change')){
        model.rotate()   
    }
    if (target.closest('.arrowRight')){
        model.move(true)   
    }
    if (target.closest('.arrowDown')){
        model.moveDown()   
    }
    if (target.closest('.arrowLeft')){
        model.move(false)   
    }
})
 
document.addEventListener("keydown", (e) => {
    let input = document.getElementById('name')
    let target = e.target;
    if (target == input) return;
    e.preventDefault() 
    switch(e.key) {
        case "w":
        case "ArrowUp":
            model.rotate() 
            break 
        case "d":
        case "ArrowRight":
            model.move(true) 
            break 
        case "s":
        case "ArrowDown": 
            model.moveDown() 
            break 
        case "a":
        case "ArrowLeft":
            model.move(false) 
            break
        } 
})
