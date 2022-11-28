import { expect } from "chai";
import hre from "hardhat";
import { ERC721__factory } from "../typechain-types";

describe("EIP721 Test", () => {
    let MyNFTContractFactory, MyNFTContract: any, owner: any, addr1: any, addr2: any, addr3: any, addrs: any[], addrZero: any
    beforeEach(async() => {
        ;[owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();
        MyNFTContractFactory = await hre.ethers.getContractFactory("MyNFT");
        MyNFTContract = await MyNFTContractFactory.deploy();
        await MyNFTContract.deployed();
        addrZero = hre.ethers.constants.AddressZero
    })

    describe("Mint", () => {
        it ("should mint by owner address", async() => {
            await MyNFTContract.mint(addr1.address, 0);
            expect(await MyNFTContract.ownerOf(0)).to.equal(addr1.address);
        })
        it ("should return right balance",async () => {
            await MyNFTContract.mint(addr1.address, 0);
            const amount = await MyNFTContract.balanceOf(addr1.address);
            expect(amount).to.equal(1);
        })
        it ("shold NOT return an unexisted token",async () => {
            await MyNFTContract.mint(addr1.address, 1);
            await expect(MyNFTContract.ownerOf(0)).to.be.revertedWith("token doesn't exist");
        })
        it ("shold NOT return a wrong owner",async () => {
            await MyNFTContract.mint(addr1.address, 0);
            const tokenOwner = await MyNFTContract.ownerOf(0);
            expect(tokenOwner).to.not.equal(addr2.address);
        })
        it ("shold NOT mint to zero address", async() => {
            await expect(MyNFTContract.mint(addrZero, 0)).to.revertedWith("mint to zero address");
        })
        it ("shold NOT mint a same token",async () => {
            await MyNFTContract.mint(addr1.address, 0);
            await expect(MyNFTContract.mint(addr1.address, 0)).to.revertedWith("already minted");
        })
    })

    describe("Transfer", () => {
        it ("should transfer a nft",async () => {
            await MyNFTContract.mint(owner.address, 0);
            await MyNFTContract.approve(owner.address, 0);
            await MyNFTContract.transferFrom(owner.address, addr1.address, 0);
            expect(await MyNFTContract.ownerOf(0)).to.be.equal(addr1.address);
        })
        it ("should NOT transfer a nft because of not having authorization",async () => {
            await MyNFTContract.mint(addr1.address, 0);
            await expect(MyNFTContract.transferFrom(addr1.address, addr2.address, 0)).to.be.revertedWith('not authorized');
        })
        it ("shold NOT transfer because from doesn't match owner",async () => {
            await MyNFTContract.mint(owner.address, 0);
            await MyNFTContract.approve(owner.address, 0);
            await expect(MyNFTContract.transferFrom(addr1.address, addr2.address, 0)).to.be.revertedWith("from != owner");
        })
        it ("shold NOT transfer to zero addres",async () => {
            await MyNFTContract.mint(owner.address, 0);
            await MyNFTContract.approve(owner.address, 0);
            await expect(MyNFTContract.transferFrom(owner.address, addrZero, 0)).to.be.revertedWith("transfer to zero address");
        })
    })

    describe("Burn", () => {
        it("shold burn an nft",async () => {
            await MyNFTContract.mint(owner.address, 0);
            await MyNFTContract.burn(0);
            await expect(MyNFTContract.ownerOf(0)).to.be.revertedWith("token doesn't exist");
        })
        it("should NOT burn an unexisted nft",async () => {
            await expect(MyNFTContract.burn(0)).to.be.revertedWith("not owner");
        })
    })
})