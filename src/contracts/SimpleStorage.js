export const SimpleStorageAddress =
  "0xb54243914D3dab21E605B6501b002D0e5D748a4e";

export const SimpleStorageAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "data_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_data",
        type: "string",
      },
    ],
    name: "DataSet",
    type: "event",
  },
  {
    inputs: [],
    name: "getData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "data_",
        type: "string",
      },
    ],
    name: "setData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
