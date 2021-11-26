const http = require("http");

const options = {
  hostname: "codequiz.azurewebsites.net",
  method: "GET",
};
const req = http.request(options, (res) => {
  res.setEncoding("utf8");
  res.on("data", (chunk) => {
    const regex1 = RegExp(
      /\<tr\>\s*\<td\>([^\<]+)\<\/td\>\s*\<td\>([^\<]+)\<\/td\>/,
      "g"
    );
    const funds = {};
    while ((array1 = regex1.exec(chunk)) !== null) {
      funds[array1[1].trim()] = array1[2];
    }

    const selectedFundName = process.argv[2];

    if (selectedFundName) {
      console.log(funds[selectedFundName] ?? "not found");
    } else {
      console.log("please select fund.");
      console.log(JSON.stringify(funds));
    }
  });
  res.on("end", () => {
    // console.log("No more data in response.");
  });
});

req.setHeader("Cookie", ["hasCookie=true"]);

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
