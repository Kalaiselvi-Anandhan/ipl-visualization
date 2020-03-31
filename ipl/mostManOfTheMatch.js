function mostManOfTheMatch(matches) {
    //top5 Man_oF_the_match 
    const result = {};
    const winnerteam={}
    var obj={};
    var team={};
    for (let match of matches) {
      const award = match.player_of_match;
      team[award]=match.winner;
      if (result[award]) {
        result[award] += 1;
      } else {
        result[award] = 1;
      }
      const winningteam=match.winner;
      if(winnerteam[winningteam]){
        winnerteam[winningteam]+=1;
      }
      else{
        winnerteam[winningteam]=1;
      }
    }
    var players=Object.keys(result);
    var values=Object.values(result);
    var copy=values;
    for(let i=0;i<10;i++){
        var max=Math.max(...copy);
        var index=values.indexOf(max);
        var count=0;
        for(let e of matches){
            if(e.team1==team[players[index]]||e.team2==team[players[index]]){
                count++;
            }
        }
        var x=players[index];
        obj[i]={"name":players[index],"awards":max,"matches_played":count,"Winning_Matches":winnerteam[team[x]]};
        copy[index]=0;

    }
    console.log(winnerteam);
    //console.log(team);
    return obj;
  }
  
  module.exports = mostManOfTheMatch;
  