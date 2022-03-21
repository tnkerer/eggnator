const { pinataApiKey, pinataSecretApiKey } = require('./secrets.json');
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const pinFileToIPFS = async (fileNumber) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  
  data.append("file", fs.createReadStream(`./metadata/file00${fileNumber}.json`));

  const res = await axios.post(url, data, {
    maxContentLength: "Infinity", 
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey, 
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  console.log(res.data);
};

for (let i = 1; i <= 1; i++) {
  let fileNumber = i;
pinFileToIPFS(fileNumber);
}

