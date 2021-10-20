/* eslint-disable no-await-in-loop */
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { Interface } from '@ethersproject/abi'
import { getWeb3 } from 'utils/web3'
import MultiCallAbi from 'config/abi/Multicall.json'
import ticketAbi from 'config/abi/lotteryNft.json'
import lotteryAbi from 'config/abi/lottery.json'
import { getMulticallAddress } from './addressHelpers'

let referer="0x0000000000000000000000000000000000000000" ;
// console.log(window.localStorage.getItem("referer"))
function checkReferer(){
  if (window.localStorage.getItem("referer"))
  {   
    referer= window.localStorage.getItem("referer");
  }
}

const API_URL = process.env.REACT_APP_API_URL;
export const getBattleBosses = async () => {
  const res = await fetch(`${API_URL}/battle-bosses`, {
      method: "GET",
  });
  const response = await res.json();
  return response
}

export const getMyFightDoges = async (MarketControllerContract, account) => {
  try {    
    const unSaleDoges = await MarketControllerContract.methods.getDogeByOwner().call({
      from: account
    });

    const dogeIds = [];
    for (let i = 0; i < unSaleDoges.length; i ++) {
      dogeIds.push(unSaleDoges[i]._tokenId);
    }
    // console.log('dogeIds', dogeIds)

    const res = await fetch(`${API_URL}/crypto-doges-findDogesByIds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: dogeIds
      })
    });

    const fightDoges = [];
    const dogesExtraInfo = await res.json();
    // console.log('dogesExtraInfo', dogesExtraInfo)
    let doge = {};
    for (let i = 0; i < unSaleDoges.length; i ++) {
      doge = {};
      
      doge._rare = unSaleDoges[i]._rare;
      doge._level = unSaleDoges[i]._level;
      doge._exp = unSaleDoges[i]._exp;
      doge._tribe = unSaleDoges[i]._tribe;
      doge._tokenId = unSaleDoges[i]._tokenId;
      doge._farmTime = unSaleDoges[i]._farmTime;
      doge._availableBattleTime = unSaleDoges[i]._availableBattleTime;
      doge._isEvolved = unSaleDoges[i]._isEvolved;
      doge.fightNumber = 0;
      doge._stoneInfo = unSaleDoges[i]._stoneInfo;
      for (let j = 0; j < dogesExtraInfo.length; j ++){
        if(unSaleDoges[i]._tokenId === dogesExtraInfo[j].Doge_ID){
          doge.fightNumber = dogesExtraInfo[j].fightNumber;
          doge._classInfo = dogesExtraInfo[j].classInfo;
          // console.log(doge.fightNumber);
          // console.log(doge._classInfo);
        }
      }
      // if(unSaleDoges[i]._isEvolved&&doge.fightNumber)
      if(unSaleDoges[i]._isEvolved)
        fightDoges.push(doge);
    }
    return fightDoges;
  } catch (err) {
    return [];
  }
}

export const dbCreateDoge = async (tokenId, account, classInfo, token) => {
  const res = await fetch(`${API_URL}/crypto-doges-create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          tokenId,
          owner: account,
          classInfo,
          fightNumber: 3,
          token
      })
  });
  const response = await res.json();
  return response
}

export const dbUpdateOwner = async (_tokenId, account, token) => {
  // console.log(token)
  const res = await fetch(`${API_URL}/crypto-doges-update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          tokenId: _tokenId,
          owner: account,
          token
      })
  });
  // console.log('res', res);
  const response = await res.json();
  return response
}

export const getMonsters = async (cryptoDogeControllerContract) => {
  try {
    const monsters = Array(4);
    monsters[0] = await cryptoDogeControllerContract.methods.monsters(0).call();
    monsters[1] = await cryptoDogeControllerContract.methods.monsters(1).call();
    monsters[2] = await cryptoDogeControllerContract.methods.monsters(2).call();
    monsters[3] = await cryptoDogeControllerContract.methods.monsters(3).call();
    // console.log('monsters', monsters[0]._name);
    // const res = await fetch(`${API_URL}/monsters`, {
    //     method: "GET",
    // });
    // const response = await res.json();
    monsters[0].id = 0;
    // monsters[0].asset = response[0].asset;
    monsters[1].id = 1;
    // monsters[1].asset = response[1].asset;
    monsters[2].id = 2;
    // monsters[2].asset = response[2].asset;
    monsters[3].id = 3;
    // monsters[3].asset = response[3].asset;  
    return monsters
  } catch (err) {
    return [];
  }
}

export const getNextClaimTime = async (cryptoDogeControllerContract, account) => {
  try {
    const nextClaimTime = await cryptoDogeControllerContract.methods.nextClaimTime(account).call();
    return nextClaimTime;
  } catch (err) {
    return 0;
  }
}

export const buyDoge = async (cryptoDogeControllerContract, account) => {
  checkReferer();
  // console.log('referer', referer)
  const tribe = Math.floor(Math.random() * 4);
  try {
    return cryptoDogeControllerContract.methods
      .buyDoge([tribe], referer)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const buyStone = async (magicStoneControllerContract, account, price) => {
  try {
    return magicStoneControllerContract.methods
      .buyStone()
      .send({ from: account, value: Web3.utils.toWei(price)})
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const openChest = async (cryptoDogeControllerContract, account, tokenId) => {
  try {
    return cryptoDogeControllerContract.methods
      .setDNA(tokenId)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
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
    return console.error('err')
  }
}

export const getDogeInfo = async(cryptoDogeNFTContract, tokenId) => {
  try{
    return await cryptoDogeNFTContract.methods.getdoger(tokenId).call();
  } catch (err) {
    return console.error('err')
  }
}

export const fightMonster = async (cryptoDogeControllerContract, account, monsterId, tokenId, token) => {
  const doge = await fetch(`${API_URL}/crypto-doges/${tokenId}`, {
    method: "GET",
  });
  const dogeInfo = await doge.json()
  const activeFightNumber = dogeInfo.fightNumber;
  const finalFight = (activeFightNumber < 2);
  try {
    const result = await cryptoDogeControllerContract.methods.fight(tokenId, account, monsterId, finalFight).send({ 
      from: account,
      gasPrice: 10000000000,
      gas: 300000,
    });
    
    const res = await fetch(`${API_URL}/crypto-doges-decreaseFN/${tokenId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          tokenId,
          owner: account,
          token
      })
  });
    return result;
  } catch (err) {
    return err;
  }
}

export const getRewardTokenInfo = async (cryptoDogeNFTContract, account) => {
  try {
    const result = await cryptoDogeNFTContract.methods.getClaimTokenAmount(account).call();
    return result;
  } catch (err) {
    return 0;
  }
}

export const claimReward = async (cryptoDogeControllerContract, account) => {
  try {
    return cryptoDogeControllerContract.methods
      .claimToken()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const orderDoge = async (cryptoDogeNFTContract, account, tokenId, price) => {

  try {
    return cryptoDogeNFTContract.methods
      .placeOrder(tokenId, Web3.utils.toWei(price))
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const cancelOrder = async (cryptoDogeNFTContract, account, tokenId) => {
  try {
    return cryptoDogeNFTContract.methods
      .cancelOrder(tokenId)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const fillOrder = async (cryptoDogeNFTContract, account, tokenId) => {
  checkReferer();
  // console.log('referer', referer);
  try {
    return cryptoDogeNFTContract.methods
      .fillOrder(tokenId, referer)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const getDogeOfSaleByOwner = async(MarketControllerContract, account) => {
  try {
    // const res = await fetch(`${API_URL}/crypto-doges`, {
    //   method: "GET",
    // });

    const unSaleDoges = await MarketControllerContract.methods.getDogeOfSaleByOwner().call({
      from: account
    });

    const dogeIds = [];
    for (let i = 0; i < unSaleDoges.length; i ++) {
      dogeIds.push(unSaleDoges[i]._tokenId);
    }
    // console.log('dogeIds', dogeIds)

    const res = await fetch(`${API_URL}/crypto-doges-findDogesByIds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: dogeIds
      })
    });    

    const fightDoges = [];
    const dogesExtraInfo = await res.json();
    // console.log('dogesExtraInfo', dogesExtraInfo)
    let doge = {};
    for (let i = 0; i < unSaleDoges.length; i ++) {
      doge = {};
      
      doge._rare = unSaleDoges[i]._rare;
      doge._level = unSaleDoges[i]._level;
      doge._exp = unSaleDoges[i]._exp;
      doge._tribe = unSaleDoges[i]._tribe;
      doge._tokenId = unSaleDoges[i]._tokenId;
      doge._salePrice = unSaleDoges[i]._salePrice;
      // doge._farmTime = unSaleDoges[i]._farmTime;
      // doge._availableBattleTime = unSaleDoges[i]._availableBattleTime;
      doge._isEvolved = unSaleDoges[i]._isEvolved;
      // doge.fightNumber = 0;
      doge._stoneInfo = unSaleDoges[i]._stoneInfo;
      for (let j = 0; j < dogesExtraInfo.length; j ++){
        if(unSaleDoges[i]._tokenId === dogesExtraInfo[j].Doge_ID){
          // doge.fightNumber = dogesExtraInfo[j].fightNumber;
          doge._classInfo = dogesExtraInfo[j].classInfo;
          // console.log(doge.fightNumber);
        }
      }
      // if(unSaleDoges[i]._isEvolved&&doge.fightNumber)
      if(unSaleDoges[i]._isEvolved)
        fightDoges.push(doge);
    }
    // console.log('doge', doge)
    return fightDoges;
  } catch (err) {
    return []
  }
}

export const getDogeOfSale = async(MarketControllerContract) => {
  try {
  //   const result = await MarketControllerContract.methods.getDogeOfSale().call();
  //   return result;
    
    const res = await fetch(`${API_URL}/crypto-doges`, {
      method: "GET",
    });

    const unSaleDoges = await MarketControllerContract.methods.getDogeOfSale().call();

    const fightDoges = [];
    const dogesExtraInfo = await res.json();
    // console.log(dogesExtraInfo)
    let doge = {};
    for (let i = 0; i < unSaleDoges.length; i ++) {
      doge = {};
      
      doge._rare = unSaleDoges[i]._rare;
      doge._level = unSaleDoges[i]._level;
      doge._exp = unSaleDoges[i]._exp;
      doge._tribe = unSaleDoges[i]._tribe;
      doge._tokenId = unSaleDoges[i]._tokenId;
      // doge._farmTime = unSaleDoges[i]._farmTime;
      // doge._availableBattleTime = unSaleDoges[i]._availableBattleTime;
      doge._isEvolved = unSaleDoges[i]._isEvolved;
      doge._owner = unSaleDoges[i]._owner;
      doge._salePrice = unSaleDoges[i]._salePrice;
      // doge.fightNumber = 0;
      doge._stoneInfo = unSaleDoges[i]._stoneInfo;
      for (let j = 0; j < dogesExtraInfo.length; j ++){
        if(unSaleDoges[i]._tokenId === dogesExtraInfo[j].Doge_ID){
          // doge.fightNumber = dogesExtraInfo[j].fightNumber;
          doge._classInfo = dogesExtraInfo[j].classInfo;
          // console.log(dogesExtraInfo[j].classInfo)
          // console.log('doge')
        }
      }
      // if(unSaleDoges[i]._isEvolved&&doge.fightNumber)
      if(unSaleDoges[i]._isEvolved)
        fightDoges.push(doge);
      // console.log('---------------doge----------------')
    }
    return fightDoges;
  } catch (err) {
    return []
  }
}

export const getDogeByOwner = async(MarketControllerContract, account) => {
  // console.log(MarketControllerContract);
  // console.log(account)
  try {
    const unSaleDoges = await MarketControllerContract.methods.getDogeByOwner().call({
      from: account
    });
    const dogeIds = [];
    for (let i = 0; i < unSaleDoges.length; i ++) {
      dogeIds.push(unSaleDoges[i]._tokenId);
    }
    // console.log('dogeIds', dogeIds)

    const res = await fetch(`${API_URL}/crypto-doges-findDogesByIds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: dogeIds
      })
    });

    const fightDoges = [];
    const dogesExtraInfo = await res.json();
    // console.log('dogesExtraInfo', dogesExtraInfo)
    let doge = {};
    for (let i = 0; i < unSaleDoges.length; i ++) {
      doge = {};
      
      doge._rare = unSaleDoges[i]._rare;
      doge._level = unSaleDoges[i]._level;
      doge._exp = unSaleDoges[i]._exp;
      doge._tribe = unSaleDoges[i]._tribe;
      doge._tokenId = unSaleDoges[i]._tokenId;
      doge._farmTime = unSaleDoges[i]._farmTime;
      doge._availableBattleTime = unSaleDoges[i]._availableBattleTime;
      doge._isEvolved = unSaleDoges[i]._isEvolved;
      doge.fightNumber = 0;
      doge._stoneInfo = unSaleDoges[i]._stoneInfo;
      doge._salePrice = unSaleDoges[i]._salePrice;
      for (let j = 0; j < dogesExtraInfo.length; j ++){
        if(unSaleDoges[i]._tokenId === dogesExtraInfo[j].Doge_ID){
          doge.fightNumber = dogesExtraInfo[j].fightNumber;
          doge._classInfo = dogesExtraInfo[j].classInfo;
          // console.log(doge.fightNumber);
          // console.log(doge._classInfo);
        }
      }
      // if(unSaleDoges[i]._isEvolved&&doge.fightNumber)
      // if(unSaleDoges[i]._isEvolved)
      fightDoges.push(doge);
    }
    return fightDoges;
    // return result;
  } catch (err) {
    // return console.error('err')
    return []
  }
}

export const getBalance = async(cryptoDogeNFTContract, oneDogeContract, account) => {
  try {
    const balance = await cryptoDogeNFTContract.methods.balanceOf(account).call();
    const order = await cryptoDogeNFTContract.methods.orders(account).call();
    const result = parseInt(balance) + parseInt(order);
    window.localStorage.setItem("dogeNFTBalance",result);
    // console.log("dogeNFTBalance",result);
    const oneDoge = await oneDogeContract.methods.balanceOf(account).call();
    window.localStorage.setItem("oneDogeBalance",parseInt(oneDoge) / 10**18);
    // console.log("oneDogeBalance",oneDoge);
    // const magicStone = await magicStoneNFTContract.methods.balanceOf(account).call();
    // window.localStorage.setItem("magicStoneNFTBalance",magicStone);
    // console.log("magicStoneNFTBalance",magicStone);
    return result;
  } catch (err) {
    return 0
  }
}

export const getStoneByOwner = async(MarketControllerContract, account) => {
  try {
    const result = await MarketControllerContract.methods.getStoneByOwner().call({
      from: account
    });
    return result;
  } catch (err) {
    return []
  }
}

export const unsetAutoFight = async(magicStoneControllerContract, account, tokenId) => {
  try {
    return magicStoneControllerContract.methods
    .unsetAutoFight(tokenId)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
  } catch (err) {
    return console.error('err')
  }
}

export const setAutoFight = async(magicStoneControllerContract, account, tokenId, _stoneId, monsterId) => {
  try {
    return magicStoneControllerContract.methods
    .setAutoFight(tokenId, _stoneId, monsterId)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
  } catch (err) {
    return console.error('err')
  }
}

export const getResultOfAutoFight = async(magicStoneControllerContract, account, tokenId) => {
  try {
    const result = await magicStoneControllerContract.methods.getAutoFightResults(tokenId).send({ from: account });
    return result;
  } catch (err) {
    return err;
  }
}
