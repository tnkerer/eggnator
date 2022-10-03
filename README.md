# EGGnator 

![](https://github.com/menezesphill/eggnator/blob/master/img/file%20(3).png) ![](https://github.com/menezesphill/eggnator/blob/master/img/file%20(4).png) ![](https://github.com/menezesphill/eggnator/blob/master/img/file%20(5).png) ![](https://github.com/menezesphill/eggnator/blob/master/img/file%20(6).png) ![](https://github.com/menezesphill/eggnator/blob/master/img/file%20(7).png) ![](https://github.com/menezesphill/eggnator/blob/master/img/file%20(8).png) ![](https://github.com/menezesphill/eggnator/blob/master/img/file%20(9).png) ![](https://github.com/menezesphill/eggnator/blob/master/img/file%20(10).png)

A huge thanks to [Atelier Pixerelia](https://itch.io/profile/pixerelia) for the amazing assets!

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [🚀 Quick Start](#-quick-start)
- [🧆 Navigating Truffle](#-navigating-truffle)
- [🪅 Publishing data to IPFS using Pinata](#-publishing-data-to-ipfs-using-pinata)
- - [Getting started with Pinata](#-getting-started-with-pinata)
  - [Uploading Files](#-uploading-files)
  - [Uploading Metadata](#-uploading-metadata)
- [🍾 Minting](#-minting)

# 🚀 Quick Start

✅ Clone or fork `eggnator`:

```sh
git clone https://github.com/menezesphill/eggnator.git
```

💿 Install dependencies with yarn:

```sh
cd eggnator
yarn install
```

💿 Install truffle for all users:

```sh
npm install -g truffle
``` 

# 🧆 Navigating Truffle

✅ In case of making any modifications within .sol files, you can run:

```sh
truffle compile
```

To update build artifacts;

✅ Check if the test checklist passes by running:

```sh
truffle test
```

Testing cases are not as extensive as we would like. if you want to contribute creating new test cases, please do so.

✅ Deploying contracts to local testnet:

There is a portion of the community that might be tempted to use [Remix](https://remix.ethereum.org/) but we are not taking shortcuts. We would like to use a more "Orthodox" approach, if you will. For simplicity we will use Ganache GUI, which can be downloaded here: https://trufflesuite.com/ganache/

Upon starting Ganache, go ahead and `QUICKSTART` a new network, you will see a window that looks like this:

![](https://github.com/menezesphill/vestingVault/blob/master/img/ganache.png)

Make sure to change `NETWORK ID` and `RPC SERVER` info in your `truffle-config.js` file:

```jsx
  networks: {
     development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Standard Ethereum port
      network_id: "5777",       // Any network
     },
   }
```

⚠️ ATENTION: If you are using a `WSL instance`, you might need to configure the Ethernet virtual network on Ganache in order to deploy to the testnet.

When you are good to go, you can go ahead and:

```sh
truffle migrate
```

Now you can also run the tests on your local testnet:

```sh
truffle test --network development
```

And interact with your Smart Contracts from the console:

```sh
truffle console
```

# 🪅 Publishing data to IPFS using Pinata

This contract allow you to create new ERC721 compatible tokens that accept and store URI to the NFT original artwork:

```jsx
function mint(address _to, string memory _tokenURI) public returns(uint256)
```

### ✅ Getting started with Pinata

If you want to ensure verifiability and decentralization, the argument `_tokenURI` should be an IPFS stored file. 🪅Pinata provides an API to help you store data to the IPFS. To get started, you need to head to [🪅Pinata Website](https://www.pinata.cloud/) and create a free account. Once your free account is created head to the Menu on the Top-right and go to API Keys:

<p align="center">
  <img src="https://github.com/menezesphill/eggnator/blob/master/img/readme-imgs/ezgif.com-gif-maker.gif?raw=true" alt="Pinata API Key"/>
</p>

And click in `+ New Key`, create a new API Key with access to `pinFileToIPFS` and give it the name you want. Remember to save the info in the pop-up, you will be using it in the next steps:

<p align="center">
  <img src="https://github.com/menezesphill/eggnator/blob/master/img/readme-imgs/api-key.png?raw=true" alt="Pinata secret Key"/>
</p>

With the `Secret Key` and `API Key` in hand, go ahead and create a new `secrets.json` file in your working directory:

```sh
touch secrets.json
```

Add your `Secret Key` and `API Key` to this file:

```jsx
{
    "pinataApiKey": "YOURAPIKEY",
    "pinataSecretApiKey": "YOURSECRETKEY"
 }
```

Make sure to hide your `secrets.json` file in case you plan to publish or share your working directory:

```sh
echo secrets.json >> .gitignore
```

### ✅ Uploading files

If you look at the folder [eggnator/img](https://github.com/menezesphill/eggnator/tree/master/img) you will notice 9 images going from `file (1).png` to `file (9).png`. The script `uploadFiles.js` is configured to upload `file (1).png` using your newly created Keys from Pinata, if you configured everything correctly, you can go ahead and run:

```jsx
node uploadFiles.js
```

If the image is uploaded correctly, you will be able to see a message on the console like this one:

```jsx
{
  IpfsHash: 'QmXSS5ahu9cXTkfTzUin6XrPhxbaFktURaRzX8w86wtEFx',
  PinSize: 391,
  Timestamp: '2022-03-21T03:04:42.066Z',
}
```

And also, a JSON file is created at [eggnator/img](https://github.com/menezesphill/eggnator/tree/master/img) with the same name of its respective image. You can check out the uploaded file at:

```sh
https://gateway.pinata.cloud/ipfs/{IpfsHash}
```

⚠️ ATENTION: `uploadFiles.js` is configured to upload only `file (1).png`. If you want to upload different images or a different number of images, make sure to edit `uploadFiles.js` accordingly.

### ✅ Uploading Metadata

The `METADATA` is what you actually want as an argument for `_tokenURI`. The metadata file contains all information you want to make avaiable along with your newly uploaded file/image. In [eggnator/metadata](https://github.com/menezesphill/eggnator/tree/master/metadata) you can see an example of what a metadata JSON file looks like:

```jsx
{
    "name":"Brown Eggo",
    "hash": "QmXSS5ahu9cXTkfTzUin6XrPhxbaFktURaRzX8w86wtEFx", // IpfsHash from previous step
    "gen": "0",
    "image" : "https://gateway.pinata.cloud/ipfs/QmXSS5ahu9cXTkfTzUin6XrPhxbaFktURaRzX8w86wtEFx" // Ipfs link generated in previous step
  }
```

You can add whatever metadata you'd like, but "name", "hash" and "image" have to be there if you want your ERC721 token to be displayed correctly on [OpenSea](https://opensea.io/) or any other marketplace. 

Upload the metadata by using:

```jsx
node uploadMetadata.js
```

`uploadMetadata.js` and `uploadFiles.js` are the same, they are two separated files for didactic reasons. Like before, if uploaded correctly, the console will show something like:

```jsx
{
  IpfsHash: 'QmZcpMmryMAQ1TyTRSCXkfffx8snA1zQtcemKBqUC8tdK9',
  PinSize: 217,
  Timestamp: '2022-03-21T15:56:16.420Z'
}
```

You can again check the uploaded file at:

```sh
https://gateway.pinata.cloud/ipfs/{IpfsHash}
```

Note it is a different `IpfsHash` from the one in [✅ Uploading files](#-uploading-files) !!!

# 🍾 Minting

Try ou minting your new ERC721 using truffle. On your project folder, run:

```sh
truffle migration --network development
```

And run truffle console:

```sh
truffle console --network development
```

On truffle console, instantiate the Eggnator contract you just created and then use the mint method:

```sh
contract = await Eggnator.deployed()
contract.mint(accounts[0], "https://gateway.pinata.cloud/ipfs/{IpfsHash_from_Metadata_file}")
```

You can check if the tokenURI is correctly set by calling the methods `tokenURI(_tokenID)`

```sh
contract.tokenURI("1")
```

You should see your IPFS CID:


```sh
'https://gateway.pinata.cloud/ipfs/{IpfsHash_from_Metadata_file}'
```

You can also deploy to different testnets. If you deploy to `Rinkeby`, for example, you will be able to see your collection on [OpenSea Testnet](https://testnets.opensea.io/) and [Rarible on Rinkeby](https://rinkeby.rarible.com/):

<p align="center">
  <img src="https://github.com/menezesphill/eggnator/blob/master/img/readme-imgs/open-sea-test.png?raw=true" alt="Eggnator on OpenSea"/>
</p>

For more details on deploying on different testnets using Truffle, [THIS](https://www.geeksforgeeks.org/deploying-smart-contract-on-test-main-network-using-truffle/) article can help you out!

