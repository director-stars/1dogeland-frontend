/* eslint-disable no-await-in-loop */
import BigNumber from 'bignumber.js'
import { Interface } from '@ethersproject/abi'
import { getWeb3 } from 'utils/web3'
import MultiCallAbi from 'config/abi/Multicall.json'
import ticketAbi from 'config/abi/lotteryNft.json'
import lotteryAbi from 'config/abi/lottery.json'
import { getMulticallAddress } from './addressHelpers'

const API_URL = process.env.REACT_APP_API_URL;
export const getBattleBosses = async () => {
  const res = await fetch(`${API_URL}/battle-bosses`, {
      method: "GET",
  });
  const response = await res.json();
  return response
}

export const getDoges = async () => {
  const res = await fetch(`${API_URL}/crypto-doges`, {
      method: "GET",
  });
  const response = await res.json();
  return response
}

export const getMonsters = async () => {
  const res = await fetch(`${API_URL}/monsters`, {
      method: "GET",
  });
  const response = await res.json();
  return response
}

export const buyDoge = async (cryptoDogeControllerContract, account) => {
  const tribe = Math.floor(Math.random() * 4);
  try {
    return cryptoDogeControllerContract.methods
      .buyEgg([tribe])
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const getLastTokenId = async (cryptoDogeNFTContract, account) => {
  console.log('account', account)
  try {
    const nftNumbers = await cryptoDogeNFTContract.methods
    .balanceOf(account).call();
    console.log('nftNumbers', parseInt(nftNumbers.toString())-1)
    return await cryptoDogeNFTContract.methods
    .tokenOfOwnerByIndex(account, parseInt(nftNumbers.toString())-1).call()
  } catch (err) {
    return console.error(err)
  }
}