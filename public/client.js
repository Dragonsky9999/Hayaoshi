const socket = io();

const questionE1 = document.getElementById("question");
const select1 = document.getElementById("selection1");
const select2 = document.getElementById("selection2");
const select3 = document.getElementById("selection3");
const select4 = document.getElementById("selection4");
const resultE1 = document.getElementById("result");
const reset = document.getElementById("reset");

selections = [select1, select2, select3, select4]
selections.forEach(select => {
    select.addEventListener("click", () => {
        const answer = select.textContent;
        socket.emit("answer", answer);
    })    
});

reset.addEventListener("click", () => {
    socket.emit("reset");
    socket.emit("question");
})

socket.on("start", (data) => {
    questionE1.textContent = data.question + "   " + data.id;
    select1.textContent = data.answer;
    select2.textContent = data.fake1;
    select3.textContent = data.fake2;
    select4.textContent = data.fake3;
})

socket.on("question", (data) => {
    questionE1.textContent = data.question + "   " + data.id;
    select1.textContent = data.fake1;
    select2.textContent = data.fake2;    
    select3.textContent = data.fake3;
    select4.textContent = data.answer;    
    resultE1.textContent = "";
})

socket.on("correctAnswer", (message) => {
    resultE1.textContent = message;
})

socket.on("notCorrectAnswer", (message) => {
    resultE1.textContent += message
})

// socket.on("end", (message) => {
  
// })