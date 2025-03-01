require("dotenv").config()
const express = require("express")
const connectDB = require("./database/db");
const authRoute = require("./routes/auth.route");
const path = require("path");
const errorMiddleware = require("./middlewares/error.middleware");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


// ? routes
app.get("/", (req, res) => {
  res.render("index");
});


app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);




// ! error handling part

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});


app.use(errorMiddleware);

const PORT = process.env.PORT
// ! server calling
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is lietning at http://localhost:3000/`)
  })
})
