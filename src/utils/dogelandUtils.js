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

export const getDoges = async (cryptoDogeNFTContract, account) => {
  // try {
    const res = await fetch(`${API_URL}/crypto-doges_by_owner/${account}`, {
        method: "GET",
    });
    const doges = await res.json();
    for (let i = 0; i < doges.length; i ++) {
      const result = await cryptoDogeNFTContract.methods.getdoger(doges[i].Doge_ID).call();
      // console.log('Doge_ID', doges[i].Doge_ID)
      // console.log('result', result);
      let rare = 0;
      const rareParser = result.dna / 10**26;
      if (rareParser < 5225) {
          rare = 1;
      } else if (rareParser < 7837) {
          rare = 2;
      } else if (rareParser < 8707) {
          rare = 3;
      } else if (rareParser < 9360) {
          rare = 4;
      } else if (rareParser < 9708) {
          rare = 5; 
      } else {
          rare = 6;
      }
      let level = 1;
      const exp = result.exp;
      if (exp < 100) {
        level = 1;
      } else if (exp < 350) {
        level = 2;
      } else if (exp < 1000) {
        level = 3;
      } else if (exp < 2000) {
        level = 4;
      } else if (exp < 4000) {
        level = 5;
      } else {
        level = 6;
      }
      let tribe = '';
      switch(result.tribe){
        case '0':
          tribe = 'Fire';
          break;
        case '1':
          tribe = 'Electric';
          break;
        case '2':
          tribe = 'Sky';
          break;
        case '3':
          tribe = 'Grass';
          break;
        default:
          tribe = 'Fire';
          break;
      }
      doges[i].level = level;
      doges[i].rare = rare;
      doges[i].tribe = tribe;
      doges[i].exp = exp;
      doges[i].farmTime = result.farmTime;
      // console.log(doges[i]);
    }
    // doges.forEach(async (doge) => {
    //   const result = await cryptoDogeNFTContract.methods.getdoger(doge.Doge_ID);
    //   console.log(result);
    // })
    return doges;
    // await cryptoDogeNFTContract.methods.
    // return cryptoDogeNFTContract.methods
    //   .buyEgg([tribe])
    //   .send({ from: account })
    //   .on('transactionHash', (tx) => {
    //     return tx.transactionHash
    //   })
    // return;
  // } catch (err) {
  //   return console.error(err)
  // }
  // const res = await fetch(`${API_URL}/crypto-doges`, {
  //     method: "GET",
  // });
  // const response = await res.json();
  // return response
}

export const createDoge = async (dogeInfo, tokenId, account) => {
  const tribe =parseInt(dogeInfo.tribe);
  let dogeAsset = "";
  let dogeName = "";
  switch(tribe){
    case 0:
      dogeName = "Fire Doge";
      dogeAsset = `https://firebasestorage.googleapis.com/v0/b/dogeland-6f88a.appspot.com/o/warm_2.dbc1c4ea.gif?alt=media&token=18438e29-9d12-45f1-bd6a-9689c20659e5`
      break;
    case 1:
      dogeName = "Electric Doge";
      dogeAsset = `https://firebasestorage.googleapis.com/v0/b/dogeland-6f88a.appspot.com/o/electric_2.8d8b89c5.gif?alt=media&token=4670376a-5ce2-4a91-bc62-e6b4c1c9d501`
      break;
    case 2:
      dogeName = "Sky Doge";
      dogeAsset = `https://firebasestorage.googleapis.com/v0/b/dogeland-6f88a.appspot.com/o/sky_2.4074f5d7.gif?alt=media&token=ffa4a64b-68a0-4d57-bb58-3619551ba9b3`
      break;
    case 3:
      dogeName = "Grass Doge";
      // dogeAsset = `${API_URL}/uploads/grass_1.gif`
      dogeAsset = `https://firebasestorage.googleapis.com/v0/b/dogeland-6f88a.appspot.com/o/nature_2.e6c17cc5.gif?alt=media&token=b03f36d4-d122-483e-beeb-3804d3e50b24`
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
          Doge_ID: tokenId,
          owner: account,
          fightNumber: 10
      })
  });
  // console.log('res', res);
  const response = await res.json();
  return response
}

export const getMonsters = async (cryptoDogeControllerContract) => {
  const monsters = Array(4);
  monsters[0] = await cryptoDogeControllerContract.methods.monsters(0).call();
  monsters[1] = await cryptoDogeControllerContract.methods.monsters(1).call();
  monsters[2] = await cryptoDogeControllerContract.methods.monsters(2).call();
  monsters[3] = await cryptoDogeControllerContract.methods.monsters(3).call();
  // console.log('monsters', monsters[0]._name);
  const res = await fetch(`${API_URL}/monsters`, {
      method: "GET",
  });
  const response = await res.json();
  monsters[0].id = 0;
  monsters[0].asset = response[0].asset;
  monsters[1].id = 1;
  monsters[1].asset = response[1].asset;
  monsters[2].id = 2;
  monsters[2].asset = response[2].asset;
  monsters[3].id = 3;
  monsters[3].asset = response[3].asset;  

  return monsters
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

export const fightMonster = async (cryptoDogeControllerContract, account, monsterId, tokenId) => {
  const doge = await fetch(`${API_URL}/crypto-doges/${tokenId}`, {
    method: "GET",
  });
  const dogeInfo = await doge.json()
  const activeFightNumber = dogeInfo.fightNumber;
  // console.log('activeFightNumber', activeFightNumber)
  const finalFight = (activeFightNumber < 2);
  // console.log('finalFight', finalFight);
  try {
    const result = await cryptoDogeControllerContract.methods.fight(tokenId, account, monsterId, finalFight).send({ from: account });
    const res = await fetch(`${API_URL}/crypto-doges-decreaseFN/${tokenId}`, {
      method: "POST",
    });
    return result.events.Fight;
  } catch (err) {
    return err
  }
}

export const getRewardTokenInfo = async (cryptoDogeControllerContract, account) => {
  try {
    const result = await cryptoDogeControllerContract.methods.claimTokenAmount(account).call();
    return result;
  } catch (err) {
    return console.error(err)
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
    return console.error(err)
  }
}

export const orderDoge = async (cryptoDogeNFTContract, account, tokenId) => {
  // try {
  //   return cryptoDogeNFTContract.methods
  //     .claimToken()
  //     .send({ from: account })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // } catch (err) {
    return console.error('err')
  // }
}