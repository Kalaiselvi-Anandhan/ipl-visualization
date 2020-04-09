function extraRuns(deliveries,matches) {
    const obj = {};
    var arr=[];
    for(let e of matches){
        if(e["season"]==2016){
            arr.push(e["id"]);//here i'm fetching the ids of 2016
        }
    }
    for(let delivery of deliveries){
        var teamname=delivery["bowling_team"];
        if(arr.includes(delivery["match_id"])){
            var sum=Number(delivery["extra_runs"]);
            if(obj[teamname]==undefined){
                obj[teamname]=sum;
            }
            else{
                obj[teamname]+=sum;
            }
        }
    }
    //console.log(obj);
    return obj;
  }

module.exports = extraRuns;
