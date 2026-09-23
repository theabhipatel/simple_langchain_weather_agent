import express from 'express'

const app = express()

const PORT = process.env.PORT || 3211

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({success: true, message : "Welcome to the Simple Langchain Agent"})
})

app.get("/api/chat", (req, res) => {
res.status(200).json({success: true, message : "Welcome to chat route"})
})


app.use((req, res) => {
     res.status(404).json({success: false, message : "Route not found. You went into unknown digital realm."})
})

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`)
})