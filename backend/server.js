//importing app
const app = require("./app")

const dotenv = require("dotenv")
const connectDatabase = require("./configuration/database")

// Handling Uncaught Exception 

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting Down the Server due to Uncaught Exception")
    process.exit(1)
})

//configuration
dotenv.config({ path: "backend/configuration/config.env" }) //connected with the port 


//connecting databse
connectDatabase()

//creating a server for app
const server = app.listen(process.env.PORT,() => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// console.log(YOUTUBE)

//Unhandled Promise Rejection 
process.on("Unhandled Rejection", (err) =>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting Down the Server due to Unhandled Promise Rejetion")

    server.close(()=>{
        process.exit(1)
    })
})
