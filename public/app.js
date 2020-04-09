var year=document.querySelector("input").value

function refresh(event){
  event.preventDefault();
  location.reload();
}

document.querySelector("form").addEventListener("submit",getValue());

function getValue(){
  console.log(year);
  if(year>=2008&&year<=2019){
    fetch(`/economy?year=${year}`)
    .then(response=>response.json())
    .then(res=>{
      renderEcoYear(res)
    });
  }
  else{
    document.querySelector("#economyrate-per-year").innerHTML="";
  }
  document.querySelector("input").value="";
}
function renderEcoYear(val){
  var seriesData=[];
  if(Array.isArray(val)){
    for(let e of val){
      seriesData.push([e.bowler,e.economy]);
    }

  Highcharts.chart("economyrate-per-year", {
    chart: {
        type: 'column'
    },
    title: {
        text: `4. Top 10 economical bowlers in ${year}`
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Economy Rates'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Economy Rate: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'economyRate',
        data: seriesData,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#DC143C',
            align: 'right',
            format: '{point.y:.2f}', // one decimal
            y: 5, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}
}
setInterval(renderEcoYear,1000);

function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}
fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeteamWonMatchesoverallyears(data.teamWonMostMatches);
  visualizeextraRunsConceded(data.extraRuns);
  visualizeeconomicalBowlers(data.economyRate);
  visualizeManOfTheMatch(data.mostManOfTheMatch);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "1.Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

function visualizeteamWonMatchesoverallyears(teamWonMostMatches) {
  var seriesData = [];
  var keys=[];
  var data=[];
  seriesData=Object.keys(teamWonMostMatches);
  for(let val of seriesData){
    var arr=Object.keys(teamWonMostMatches[val]);
    for(let i of arr){
      if(!keys.includes(i)){
        keys.push(i);
      }
    }
  }
  //console.log(seriesData,keys);
  var len=keys.length;
  for(let i=0;i<len;i++){
    var values=[];
    for(let e of seriesData){
      var tname=keys[i];
      if(teamWonMostMatches[e].hasOwnProperty(tname)){
        values.push(teamWonMostMatches[e][tname]);
      }
      else{
        values.push(0);
      }
    }
    data.push(values);
  }
Highcharts.chart('team-won-most-matches', {
  chart: {
      type: 'column'
  },
  title: {
      text: '2.Matches Won by each Team over all the Years'
  },
  subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
  },
  xAxis: {
      categories: seriesData,
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Matches Won'
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.01,
          borderWidth: 0
      }
  },
  series: [{
      name: keys[0],
      data: data[0]

  }, {
      name: keys[1],
      data: data[1]

  }, {
      name: keys[2],
      data: data[2]

  }, {
      name: keys[3],
      data: data[3]
  },{
    name: keys[4],
    data: data[4]
},{
  name: keys[5],
  data: data[5]
},{
  name: keys[6],
  data: data[6]
},{
  name: keys[7],
  data: data[7]
},{
  name: keys[8],
  data: data[8]
},{
  name: keys[9],
  data: data[9]
},{
  name: keys[10],
  data: data[10]
},{
  name: keys[11],
  data: data[11]
},{
  name: keys[12],
  data: data[12]
},{
  name: keys[13],
  data: data[13]
},{
  name: keys[14],
  data: data[15]
},{
  name: keys[15],
  data: data[15]
},]
});
}

function visualizeextraRunsConceded(extraRuns) {
var name=Object.keys(extraRuns);
var data=Object.values(extraRuns);
var ans=[];
for(let i=0;i<name.length;i++){
  ans.push([name[i],data[i]]);
}

  Highcharts.chart('extra-runs', {
    chart: {
        type: 'column'
    },
    title: {
        text: '3.Extra Runs Conceded By Each Team in 2016'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Extra Runs'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Extra Runs: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: "ExtraRuns",
        data: ans,               
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y:5, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }
  ]
});
}


function visualizeeconomicalBowlers(economyRate){
  var seriesData=[];
  for(let e in economyRate){
    var a=economyRate[e]["bowler"];
    var b=economyRate[e]["economy"];
    seriesData.push([a,b]);
  }
  
  Highcharts.chart("economy-rates", {
    chart: {
        type: 'column'
    },
    title: {
        text: '4. Top 10 economical bowlers in 2015'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Economy Rates'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Economy Rate: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'economyRate',
        data: seriesData,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.2f}', // one decimal
            y: 5, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}

function visualizeManOfTheMatch(mostManOfTheMatch){
  var name=[];
  var awards=[];
  var total=[];
  var winningmatch=[];
  for(let e in mostManOfTheMatch){
    name.push(mostManOfTheMatch[e]["name"]);
    awards.push(mostManOfTheMatch[e]["awards"]);
    total.push(mostManOfTheMatch[e]["matches_played"]);
    winningmatch.push(mostManOfTheMatch[e]["Winning_Matches"]);
  }
Highcharts.chart('man-of-the-match', {
  chart: {
      type: 'column'
  },

  title: {
      text: '5. Story - Total Number of Matches Played VS Man Of The Match for Top 10 Players'
  },

  xAxis: {
      categories: name
  },

  yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
          text: 'Number of Matches'
      }
  },

  tooltip: {
      formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
              this.series.name + ': ' + this.y + '<br/>' ;
      }
  },

  plotOptions: {
      row: {
          stacking: 'normal'
      }
  },

  series: [{
      name: 'Total Matches',
      data: total
  },
  {
    name: 'Awards',
    data: awards 
},
{
  name: 'Total Winning Matches',
  data:  winningmatch
}
]
});
}