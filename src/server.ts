import App from './App'


const Port = 8000;

const server = new App().app

server.on("start",()=>{
    server.listen(Port,()=>{
        console.log(`server is listening on Port ${Port}`)
    })
})
