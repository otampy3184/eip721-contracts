# EIP721 Non-Fungible Token

## 概要

EIP721スタンダードのうち、"Must implement"となっている項目を実装

### フォルダ構成

```;
eip721-contracts
├── README.md
├── contracts
│   └── EIP721Contract.sol　//　EIP721準拠のコントラクト
├── hardhat.config.ts // Hardhatのコンフィグ情報
├── package-lock.json
├── package.json
├── scripts
│   └── deploy.ts // テストネットデプロイ用
├── test
│   └── EIP721Contracts.ts // 単体テスト
└── tsconfig.json
```

### 実行環境

```;
macOS monterey 12.2.1
Node.js v16.14.2
npm v8.5.0
Hardhat v2.12.2
Solidity v0.8.9
```

### テスト結果

```;
% npx hardhat test

  EIP721 Test
    Mint
      ✔ should mint by owner address
      ✔ Should return right balance
      ✔ Shold NOT return an unexisted token
      ✔ Shold NOT return a wrong owner
      ✔ shold NOT mint to zero address
      ✔ shold NOT mint a same token
    Transfer
      ✔ should transfer a nft
      ✔ should NOT transfer a nft because of not having authorization
      ✔ shold NOT transfer because from doesn't match owner
      ✔ shold NOT transfer to zero addres
    Burn
      ✔ shold burn an nft
      ✔ should NOT burn an unexisted nft


  12 passing (970ms)
```

## デプロイ結果

```;
% npx hardhat run scripts/deploy.ts
Compiled 1 Solidity file successfully
Deploying contracts with account:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
MyNFT Contract Address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
```
