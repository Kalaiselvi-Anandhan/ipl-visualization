function matchesPlayedPerYear(matches) {
  const result = {};
  for (let match of matches) {
    const season = match.season;
    if (result[season]) {
      result[season] += 1;
    } else {
      result[season] = 1;
    }
  }
  //console.log(result);
  return result;
}

function teamWonMostMatches(matches) {
  const obj = {};
  for(let match of matches){
    obj[match["season"]]={};
  }
  for (let match of matches) {
    var year=match["season"];
    var winningteam=match["winner"];
    if(!obj[year].hasOwnProperty(winningteam)){
      if(winningteam==""){
        obj[year]["noresult"]=1;
      }
      else{
        obj[year][winningteam]=1;
      }
    }
    else{
      if(winningteam==""){
        obj[year]["noresult"]+=1;
      }else{
        obj[year][winningteam]+=1;
      }
    }
  }
  //console.log(obj);
  return obj;
}

module.exports.matchesPlayedPerYear=matchesPlayedPerYear;
module.exports.teamWonMostMatches=teamWonMostMatches;
