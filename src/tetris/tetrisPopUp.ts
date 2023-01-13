import { Data, newGameState } from "./tetris";

let rules = document.querySelector(".rules_pop_up_close") as HTMLDivElement;
let rulesPopUp = document.querySelector(".rules_pop_up") as HTMLDivElement;
let done = document.getElementById("done") as HTMLDivElement;
let infoPopUp = document.querySelector(".info_pop_up") as HTMLDivElement;



rules.addEventListener("click", () => {
  rulesPopUp.style.display = "none";
});
let storage:any = localStorage.getItem('items') 
let itemsArray = localStorage.getItem('items') ? JSON.parse(storage) : []
localStorage.setItem('items', JSON.stringify(itemsArray))
const data :Data[]= JSON.parse(storage)



if ((rulesPopUp.style.display = " ")) {
  infoPopUp.style.display = "";
  done.addEventListener("click", () => {
    let userName = document.getElementById("name") as HTMLInputElement;
    let userNameValue:string = userName.value
    if (userNameValue !== "") {
      itemsArray.push({name: userNameValue})
      localStorage.setItem('items', JSON.stringify(itemsArray))
      let name = document.querySelector('.yourName') as HTMLDivElement;
      name.innerHTML = userNameValue
      infoPopUp.style.display = "none";
      setInterval(() => {
        newGameState();
      }, 1000);
      
    }
  });
  
} 

export const liMaker = (text:string) => {
  const li = document.createElement('li')
  li.textContent = text
  let leaderboardItems = document.querySelector('.leaderboardItems')  as HTMLDivElement
  leaderboardItems.appendChild(li)
}

if(true)data.sort((a, b) => a.score < b.score ? 1 : -1);

data.forEach(item => {
  liMaker(item.name + ' ' + item.score)
})



