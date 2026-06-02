require("dotenv").config()

const app = require("./src/app")
const connectToDB = require("./src/config/database")
const { generateInterviewReport } = require("./src/services/ai.service")
const { resume, selfDescription, jobDescription } = require("./src/services/temp")

// 1. Establish the Database Connection
connectToDB()

// 2. Test execution of the Gemini Pipeline with explicit promise resolution handling
console.log("Testing Gemini API connection on boot...")
generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
})
.then((reportData) => {
    console.log("--- TEST REPORT GENERATION SUCCESSFUL ---")
    console.log(reportData) // This will display your questions, match score, and arrays!
})
.catch((err) => {
    console.error("Boot execution test failed:", err)
})

// 3. Start listening for incoming HTTP requests from your frontend
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})