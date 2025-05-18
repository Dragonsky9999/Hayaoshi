const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const questions = require("./questions")

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let currentQuestionIndex = 0;

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    io.emit("start", questions[currentQuestionIndex])

    socket.on("answer", (answer) => {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (answer === correctAnswer){
            io.emit("correctAnswer", "正解者が出ました");

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length){
                io.emit("question", questions[currentQuestionIndex]);
            }else {
                io.emit("end", "クイズ終了")
            }
        }else {
            io.emit("notCorrectAnswer", "不正解！")
        }
    })
    
    socket.on("reset", () => {
        currentQuestionIndex = 0;
        io.emit("start", questions[currentQuestionIndex])
    })


    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })

})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})