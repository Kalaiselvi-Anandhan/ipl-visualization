const fs = require("fs");
const csv = require("csvtojson");
const match = require("./ipl/matchesPlayedPerYear");
const extraRuns=require("./ipl/extraRuns");
const allEconomyRates=require("./ipl/economyRates");
const mostManOfTheMatch=require("./ipl/mostManOfTheMatch");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const ECONOMY_JSON_FILE_PATH="./economyrate.json";

function main() {
    csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries=>{
          var result3=extraRuns(deliveries,matches);
        let result = match.matchesPlayedPerYear(matches);
        let result2=match.teamWonMostMatches(matches);
        let result6=allEconomyRates.eRate(matches,deliveries);
        let result4=allEconomyRates.economyRates(matches,deliveries,"2015");
        let result5=mostManOfTheMatch(matches);
        saveAllYearEconomyRate(result6);
        saveresults(result,result2,result3,result4,result5);
      });
      });
}

    function saveAllYearEconomyRate(result6){
      const economyData={
        eRate:result6
      }
      const economyDataString=JSON.stringify(economyData);
      fs.writeFile(ECONOMY_JSON_FILE_PATH,economyDataString,"utf8", err=>{
        if(err){
          console.log(err);
        }
      });
    }
    
    function saveresults(result,result2,result3,result4,result5) {
      const jsonData = {
        matchesPlayedPerYear: result,
        teamWonMostMatches: result2,
        extraRuns: result3,
        economyRate: result4,
        mostManOfTheMatch:result5,
      };
      const jsonString = JSON.stringify(jsonData);
      fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
          console.error(err);
        }
      });
    }
    
    main();