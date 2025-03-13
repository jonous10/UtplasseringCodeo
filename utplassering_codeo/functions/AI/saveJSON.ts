export function saveJSON(inputJSON: JSON){
    localStorage.setItem("aiMemory", JSON.stringify(inputJSON));
    console.log("saveMemory() called!");
}