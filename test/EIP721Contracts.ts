import { expect } from "chai";
import hre from "hardhat";
import { ERC721__factory } from "../typechain-types";

describe("EIP721 Test", () => {
    let MyNFTContractFactory, MyNFTContract: any, owner: any, addr1: any, addr2: any, addr3: any, addrs: any[]
    beforeEach(async() => {
        ;[owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();
        MyNFTContractFactory = await hre.ethers.getContractFactory("MyNFT");
        MyNFTContract = await MyNFTContractFactory.deploy();
        await MyNFTContract.deployed();
    })

    describe("Mint", () => {
        it ("should mint by owner address", async() => {
            await MyNFTContract.mint(addr1.address, 0);
            expect(await MyNFTContract.ownerOf(0)).to.equal(addr1.address);
        })
        it ("Shold not return an unexisted token",async () => {
            await MyNFTContract.mint(addr1.address, 1);
            await expect(MyNFTContract.ownerOf(0)).to.be.revertedWith("token doesn't exist");
        })
        it ("Shold not return a wrong owner",async () => {
            await MyNFTContract.mint(addr1.address, 0);
            const tokenOwner = await MyNFTContract.ownerOf(0);
            expect(tokenOwner).to.not.equal(addr2.address);
        })
        it ("Should return right balance",async () => {
            await MyNFTContract.mint(addr1.address, 0);
            const amount = await MyNFTContract.balanceOf(addr1.address);
            expect(amount).to.equal(1);
        })
    })

    describe("Transfer", () => {
        it ("should transfer a nft",async () => {
            await MyNFTContract.mint(owner.address, 0);
            await MyNFTContract.approve(owner.address, 0);
            await MyNFTContract.transferFrom(owner.address, addr1.address, 0);
            expect(await MyNFTContract.ownerOf(0)).to.be.equal(addr1.address);
        })
        it ("should not transfer a nft because of not having authorization",async () => {
            await MyNFTContract.mint(addr1.address, 0);
            await expect(MyNFTContract.transferFrom(addr1.address, addr2.address, 0)).to.be.revertedWith('not authorized');
        })
    })

    describe("Burn", () => {
        it("should not burn an unexisted nft",async () => {
            await expect(MyNFTContract.burn(0)).to.be.revertedWith("not owner");
        })
        it("shold burn an nft",async () => {
            await MyNFTContract.mint(owner.address, 0);
            await MyNFTContract.burn(0);
            await expect(MyNFTContract.ownerOf(0)).to.be.revertedWith("token doesn't exist");
        })
    })
})