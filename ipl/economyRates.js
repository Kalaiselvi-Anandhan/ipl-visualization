function economyRates(matches,deliveries){
    var obj={};//for store the bowlers per economical rates
    var result={};//final result
    var over={};//for find the total balls throwed by each bowlers
    var bowlersrun={};//for find the total runs given by each bowlers
    var arr=[];

    var economical_rate=[];
    for(let e of matches){
        if(e["season"]==2015){
            arr.push(e["id"]);
        }
    }

    for(let e of deliveries){
        if(arr.includes(e["match_id"])){
            if(e["wide_runs"]==0 && e["noball_runs"]==0){
                over[e["bowler"]]=(over[e["bowler"]]==undefined)?1:over[e["bowler"]]+1;
            }
            var e_runs=Number(e["wide_runs"])+Number(e["noball_runs"]);
            var t_runs=Number(e["batsman_runs"])+ e_runs;
            if(bowlersrun[e["bowler"]]==undefined){
                bowlersrun[e["bowler"]]=t_runs;
            }
            else{
                bowlersrun[e["bowler"]]+=t_runs;   //store total runs
            }
        }
    }

    for(let e in over){ 
        var res=bowlersrun[e]/(over[e]/6);//calculate economical rate
        economical_rate.push(res);
        obj[e]=res;
    }

    var names=Object.keys(obj);//fetching the bowlers name
    var duplicate=economical_rate;

    for(let i=0;i<10;i++){ //for finding the top 10 bowlers
        var min=Math.min(...economical_rate);
        var index=duplicate.indexOf(min);
        result[i]={"bowler":names[index],"economy":Number(min.toFixed(2))};
        economical_rate[index]=Number.MAX_VALUE;
    }
    return result;
}

module.exports = economyRates;