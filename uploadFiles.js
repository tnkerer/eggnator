const { pinataApiKey, pinataSecretApiKey } = require('./secrets.json');
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const fileToUpload = "file (1)";

const pinFileToIPFS = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  
  data.append("file", fs.createReadStream(`./img/${fileToUpload}.png`));

  const res = await axios.post(url, data, {
    maxContentLength: "Infinity", 
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey, 
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  console.log(res.data);

  const finished = (error) => {
    if(error){
      console.error(error)
      return;
    }
  }

  const jsonData = JSON.stringify(res.data)
  fs.writeFile(`./img/${fileToUpload}.json`, jsonData, finished)
};

pinFileToIPFS();


