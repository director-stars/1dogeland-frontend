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

export const createDoge = async (dogeInfo, tokenId) => {
  const tribe =parseInt(dogeInfo.tribe);
  let dogeAsset = "";
  let dogeName = "";
  switch(tribe){
    case 0:
      dogeName = "Fire Doge";
      dogeAsset = `${API_URL}/uploads/fire_1.gif`
      break;
    case 1:
      dogeName = "Electric Doge";
      dogeAsset = `${API_URL}/uploads/electric_1.gif`
      break;
    case 2:
      dogeName = "Sky Doge";
      dogeAsset = `${API_URL}/uploads/sky_1.gif`
      break;
    case 3:
      dogeName = "Grass Doge";
      dogeAsset = `${API_URL}/uploads/grass_1.gif`
      break;
    default:
      break;
  }
  const res = await fetch(`${API_URL}/crypto-doges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name: dogeName,
          asset: dogeAsset,
          Doge_ID: tokenId
      })
  });
  console.log('res', res);
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
  try {
    const nftNumbers = await cryptoDogeNFTContract.methods
    .balanceOf(account).call();
    // console.log('nftNumbers', parseInt(nftNumbers.toString())-1)
    return await cryptoDogeNFTContract.methods
    .tokenOfOwnerByIndex(account, parseInt(nftNumbers.toString())-1).call()
  } catch (err) {
    return console.error(err)
  }
}

export const getDogeInfo = async(cryptoDogeNFTContract, tokenId) => {
  try{
    return await cryptoDogeNFTContract.methods.getdoger(tokenId).call();
  } catch (err) {
    return console.error(err)
  }
}