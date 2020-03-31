const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const teamWonMostMatches=require("./ipl/teamWonMostMatches");
const extraRuns=require("./ipl/extraRuns");
const economyRates=require("./ipl/economyRates");
const mostManOfTheMatch=require("./ipl/mostManOfTheMatch");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries=>{
        var result3=extraRuns(deliveries,matches);
      let result = matchesPlayedPerYear(matches);
      let result2=teamWonMostMatches(matches);
      let result4=economyRates(matches,deliveries);
      let result5=mostManOfTheMatch(matches);
      saveresults(result,result2,result3,result4,result5);
    });
    });
}

function saveresults(result,result2,result3,result4,result5) {
  const jsonData = {
    matchesPlayedPerYear: result,
    teamWonMostMatches: result2,
    extraRuns: result3,
    economyRate: result4,
    mostManOfTheMatch:result5
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}


main();
