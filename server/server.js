const {app} = require('./app')
const mongoose = require("mongoose");
const PORT = process.env.PORT
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)
mongoose
  .connect(DB)
  .then(() => {
    console.log("MONGODB connected successfully!👋");
  })
  .catch((error) => console.log(error));

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT} ..`)
})











