const { assert } = require("chai");

const Eggnator = artifacts.require("Eggnator");

contract("Eggnator", (accounts) => {

    let [alice, bob] = accounts;
    let eggnatorContract;

    beforeEach(async () => {
        eggnatorContract = await Eggnator.new();
    })

    context("Deployment", async () => {

        it("Check if deployment is sucesfull", async () => {
            const address = eggnatorContract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it("Has a name", async () => {
            const name = await eggnatorContract.name()
            assert.equal(name, "Eggnator")
        })

        it("Has a symbol", async () => {
            const symbol = await eggnatorContract.symbol()
            assert.equal(symbol, "EGG")
        })
    })

    context("Token minting", async () => {

        it("Mints tokens and assets it has the correct parameters", async () => {
            await eggnatorContract.mint(alice, "https://www.token-uri.com/nft", {from: alice})
            result = await eggnatorContract.totalSupply()
            assert.equal(result.toString(), "1", "total supply is correct")

            result = await eggnatorContract.balanceOf(alice)
            assert.equal(result.toString(), "1", "balanceOf is correct")

            result = await eggnatorContract.ownerOf("1")
            assert.equal(result.toString(), alice.toString(), "ownerOf is correct")

            let BalanceOf = await eggnatorContract.balanceOf(alice)
            let tokenIds = []

            for (let i = 0; i < BalanceOf; i++) {
                let id = await eggnatorContract.tokenOfOwnerByIndex(alice, i)
                tokenIds.push(id.toString())
            }

            let expected = ["1"]
            assert.equal(tokenIds.toString(), expected.toString(), "tokenIds are correct")

            let tokenURI = await eggnatorContract.tokenURI("1")
            assert.equal(tokenURI, "https://www.token-uri.com/nft")
        })

        it("Check if bob can mint to alice", async () => {
            await eggnatorContract.mint(alice, "https://www.token-uri.com/nft-1", {from: bob})

            result = await eggnatorContract.balanceOf(alice)
            assert.equal(result.toString(), "1", "balanceOf is correct")
        })

        it("Multiple token mint and asserting correct ownership", async () => {
            await eggnatorContract.mint(alice, "https://www.token-uri.com/nft-1", {from: bob})
            await eggnatorContract.mint(bob, "https://www.token-uri.com/nft-2", {from: bob})
            await eggnatorContract.mint(alice, "https://www.token-uri.com/nft-3", {from: alice})

            let balanceOfAlice = await eggnatorContract.balanceOf(alice)
            let tokenIdsforAlice = []

            let balanceOfBob = await eggnatorContract.balanceOf(bob)
            let tokenIdsforBob = []

            for (let i = 0; i < balanceOfAlice; i++) {
                let id = await eggnatorContract.tokenOfOwnerByIndex(alice, i)
                tokenIdsforAlice.push(id.toString())
            }

            for (let i = 0; i < balanceOfBob; i++) {
                let id = await eggnatorContract.tokenOfOwnerByIndex(bob, i)
                tokenIdsforBob.push(id.toString())
            }

            let expectedForAlice = ["1", "3"]
            let expectedForBob = ["2"]

            assert.equal(tokenIdsforAlice.toString(), expectedForAlice.toString(), "balanceOf is correct for alice")
            assert.equal(tokenIdsforBob.toString(), expectedForBob.toString(), "balanceOf is correct for alice")

        })

    })
})