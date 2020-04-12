const express=require("express");

const app=express();

var port=process.env.PORT||3000

app.use(express.static("public"));


var obj=require("./economyrate.json");

app.get("/economy",function(request,response){
    const year=request.query.year;
    const economy=obj.eRate[year];
    response.send(economy);
});
    
app.listen(port,function(){
  console.log("Node is Running...");
});