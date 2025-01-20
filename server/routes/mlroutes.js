const express = require("express");
const authenticate = require('./../middlewares/authenticate')
const mlController = require("../controllers/mlController")
const mlrouter = express.Router()
// mlrouter.get('/analytics',mlController.Analytics)
mlrouter.post('/summary',authenticate.protectedRoute,mlController.Summary)
mlrouter.post("/createPdf/:id",authenticate.protectedRoute,mlController.CreatePdf)
mlrouter.get("/:id",authenticate.protectedRoute,mlController.thumbnail)
mlrouter.post("/makePdf",authenticate.protectedRoute,mlController.Pdf)
mlrouter.delete("/delete",authenticate.protectedRoute,mlController.removeDoc)
module.exports=mlrouter
