import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { sha256 } from 'js-sha256'
import { useCryptoDogeController, useCryptoDogeNFT, useMarketController, useOneDoge, useMagicStoneController, useAirDropContract } from 'hooks/useContract'
import useRefresh from './useRefresh'
import { 
  getMyFightDoges, 
  getMonsters, 
  buyDoge, 
  getLastTokenId, 
  dbCreateDoge, 
  dbUpdateOwner,
  fightMonster, 
  getRewardTokenInfo, 
  claimReward, 
  orderDoge,
  getDogeOfSaleByOwner,
  getDogeOfSale,
  getDogeByOwner,
  openChest,
  cancelOrder,
  fillOrder,
  getBalance,
  buyStone,
  unsetAutoFight,
  setAutoFight,
  getResultOfAutoFight,
  getStoneByOwner,
  getNextClaimTime,
  getAirDropInfo,
  claimAirDrop
} from '../utils/dogelandUtils'

// export const useBattleBosses = () => {
//   const [bosses, setBosses] = useState([])
//   const { fastRefresh } = useRefresh()

//   useEffect(() => {
//     const fetchBalance = async () => {
//       const res = await getBattleBosses()
//       setBosses(res)
//     }
//     fetchBalance()
//   }, [fastRefresh])

//   return bosses
// }

export const useMyFightDoges = () => {
  const { account } = useWallet()
  const marketController = useMarketController();
  // console.log(account);
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getMyFightDoges(marketController, account);
      // console.log('doges:', res)
      setDoges(res)
    }
    fetchBalance()
  }, [account, fastRefresh, marketController])

  return doges
}

export const useMonsters = () => {
  const [monsters, setMonsters] = useState([])
  const { fastRefresh } = useRefresh()
  const cryptoDogeControllerContract = useCryptoDogeController()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getMonsters(cryptoDogeControllerContract);
      setMonsters(res)
    }
    fetchBalance()
  }, [fastRefresh, cryptoDogeControllerContract])

  return monsters
}

export const useNextClaimTime = () => {
  const [nextClaimTime, setNextClaimTime] = useState()
  const { fastRefresh } = useRefresh()
  const cryptoDogeControllerContract = useCryptoDogeController();
  const { account } = useWallet()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getNextClaimTime(cryptoDogeControllerContract, account);
      setNextClaimTime(res)
    }
    fetchBalance()
  }, [fastRefresh, cryptoDogeControllerContract, account])

  return nextClaimTime;
}

export const useBuyCryptoDoge = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const cryptoDogeNFTContract = useCryptoDogeNFT();
  const oneDogeContract = useOneDoge();
  const handleBuy = useCallback(
    async () => {
      try {
        const txHash = await buyDoge(cryptoDogeControllerContract, account)
        const lastTokenId = await getLastTokenId(cryptoDogeNFTContract, account);
        const temp = "-STARS-";
        const _classInfo = "0";
        const token = sha256(lastTokenId+temp+account+temp+_classInfo);
        await dbCreateDoge(lastTokenId, account, 0, token);
        await getBalance(cryptoDogeNFTContract, oneDogeContract, account, );
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract, cryptoDogeNFTContract, oneDogeContract],
  )

  return { onBuyDoge: handleBuy }
}

export const useBuyMagicStone = () => {
  const { account } = useWallet()
  const magicStoneControllerContract = useMagicStoneController()
  // const cryptoDogeNFTContract = useCryptoDogeNFT();

  const handleBuy = useCallback(
    async (price) => {
      try {
        const txHash = await buyStone(magicStoneControllerContract, account, price)
        // const lastTokenId = await getLastTokenId(cryptoDogeNFTContract, account);
        // const dogeInfo = await getDogeInfo(cryptoDogeNFTContract, lastTokenId);
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, magicStoneControllerContract],
  )

  return { onBuyStone: handleBuy }
}

export const useFightCryptoMonster = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleFight = useCallback(
    async (monsterId, dogeId) => {
      try {
        const temp = "_STARS_";
        const token = sha256(dogeId+temp+account);
        const fightResult = await fightMonster(cryptoDogeControllerContract, account, monsterId, dogeId, token)
        return fightResult
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )

  return { onFightMonster: handleFight }
}

export const useRewardTokenInfo = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const [rewardAmount, setRewardAmount] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getRewardTokenInfo(cryptoDogeNFTContract, account);
      setRewardAmount(res)
    }
    fetchBalance()
  }, [account, fastRefresh, cryptoDogeNFTContract])

  return rewardAmount
}

export const useClaimReward = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleClaimReward = useCallback(
    async () => {
      try {
        const claimResult = await claimReward(cryptoDogeControllerContract, account)
        return claimResult
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )

  return { onClaimReward: handleClaimReward }
}

export const useOrderCryptoDoge = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const handleOrderDoge = useCallback(
    async (_tokenId, _price) => {
      try {
        const result = await orderDoge(cryptoDogeNFTContract, account, _tokenId, _price)
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract],
  )
  return { onOrderDoge: handleOrderDoge }
}

export const useCancelOrder = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const handleCancelOrder = useCallback(
    async (_tokenId) => {
      try {
        const result = await cancelOrder(cryptoDogeNFTContract, account, _tokenId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract],
  )
  return { onCancelOrder: handleCancelOrder }
}

export const useFillOrder = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const oneDogeContract = useOneDoge();
  const temp = "*STARS*";
  const handleFillOrder = useCallback(
    async (_tokenId) => {
      try {
        const result = await fillOrder(cryptoDogeNFTContract, account, _tokenId)
        const token = sha256(_tokenId+temp+account);
        await dbUpdateOwner(_tokenId, account, token);
        await getBalance(cryptoDogeNFTContract, oneDogeContract, account, );
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract, oneDogeContract],
  )
  return { onFillOrder: handleFillOrder }
}

export const useOpenChest = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleOpenChest = useCallback(
    async (_tokenId) => {
      try {
        const result = await openChest(cryptoDogeControllerContract, account, _tokenId)
        const _classInfo = result.events.DNASet.returnValues._classInfo;
        const temp = "-STARS-";
        const token = sha256(_tokenId+temp+account+temp+_classInfo);
        // console.log('result', _classInfo);
        await dbCreateDoge(_tokenId, account, _classInfo, token);
        return 'result'
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )

  return { onOpenChest: handleOpenChest }
}

export const useMySaleDoges = () => {
  const { account } = useWallet()
  const marketController = useMarketController();
  // console.log(account);
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const saleDoges = await getDogeOfSaleByOwner(marketController, account);
      setDoges(saleDoges)
    }
    fetchBalance()
  }, [account, fastRefresh, marketController])

  return doges
}

export const useMyUnSaleDoges = () => {
  const { account } = useWallet()
  const marketController = useMarketController();
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const unsaleDoges = await getDogeByOwner(marketController, account)
      setDoges(unsaleDoges)
    }
    fetchBalance()
  }, [account, fastRefresh, marketController])

  return doges
}

export const useSaleDoges = () => {
  // const { account } = useWallet()
  // console.log(account);
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  const marketController = useMarketController();
  
  useEffect(() => {
    const fetchSaleDoges = async () => {
      const saleDoges = await getDogeOfSale(marketController);
      // console.log('saleDoges:', saleDoges)
      setDoges(saleDoges)
    }
    fetchSaleDoges()
  }, [fastRefresh, marketController])

  return doges
}

export const useDogeBalance = () => {
  const { account } = useWallet()
  // const { fastRefresh } = useRefresh()
  const cryptoDogeNFTContract = useCryptoDogeNFT();
  const oneDogeContract = useOneDoge();
  const handleGetDogeBalance = useCallback(
    async () => {
      try {
        await getBalance(cryptoDogeNFTContract, oneDogeContract, account, );
        return true;
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract, oneDogeContract],
  )
  return { onGetDogeBalance: handleGetDogeBalance }
}

export const useMyStone = () => {
  const { account } = useWallet()
  const marketController = useMarketController();
  const [stones, setStones] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const myStones = await getStoneByOwner(marketController, account)
      // console.log('useDogesLand', myStones)
      setStones(myStones)
    }
    fetchBalance()
  }, [account, fastRefresh, marketController])

  return stones
}

export const useUnsetAutoFight = () => {
  const { account } = useWallet()
  // const { fastRefresh } = useRefresh()
  const magicStoneControllerContract = useMagicStoneController()
  const handleUnsetAutoFight = useCallback(
    async (_tokenId) => {
      try {
        const result = await unsetAutoFight(magicStoneControllerContract, account, _tokenId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, magicStoneControllerContract],
  )
  return { onUnsetAutoFight: handleUnsetAutoFight }
}

export const useSetAutoFight = () => {
  const { account } = useWallet()
  const magicStoneControllerContract = useMagicStoneController()
  const handleSetAutoFight = useCallback(
    async (_tokenId, _stoneId, _monsterId) => {
      try {
        const result = await setAutoFight(magicStoneControllerContract, account, _tokenId, _stoneId, _monsterId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, magicStoneControllerContract],
  )
  return { onSetAutoFight: handleSetAutoFight }
}

export const useGetResultOfAutoFight = () => {
  const { account } = useWallet()
  const magicStoneControllerContract = useMagicStoneController()
  const handleGetResultOfAutoFight = useCallback(
    async (_tokenId) => {
      try {
        const result = await getResultOfAutoFight(magicStoneControllerContract, account, _tokenId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, magicStoneControllerContract],
  )
  return { onGetResultOfAutoFight: handleGetResultOfAutoFight }
}

export const useAirDropInfo = () => {
  const { account } = useWallet()
  const [airDropInfo, setAirDropInfo] = useState(false)
  const airDropContract = useAirDropContract();
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const info = await getAirDropInfo(airDropContract, account)
      // console.log('useDogesLand', myStones)
      setAirDropInfo(info)
    }
    fetchBalance()
  }, [account, fastRefresh, airDropContract])

  return airDropInfo
}

export const useClaimAirDrop = () => {
  const { account } = useWallet()
  const airDropContract = useAirDropContract();
  const handleClaimAirDrop = useCallback(
    async () => {
      try {
        const result = await claimAirDrop(airDropContract, account)
        return result
      } catch (e) {
        return false
      }
    },
    [account, airDropContract],
  )
  return { onClaimAirDrop: handleClaimAirDrop }
}

export const classes = [
  [
    {asset: "warm.gif", name: "warm"},
    {asset: "electric.gif", name: "electric"},
    {asset: "sky.gif", name: "sky"},
    {asset: "grass.gif", name: "grass"},
    {asset: "dragon.gif", name: "dragon"},
    {asset: "gold.gif", name: "gold"},
    {asset: "tiger.gif", name: "tiger"},
    {asset: "chaos.gif", name: "chaos"},
    {asset: "silver.gif", name: "silver"},
    {asset: "sun.gif", name: "sun"},
    {asset: "bronze.gif", name: "bronze"},
    {asset: "moon.gif", name: "moon"},
    {asset: "ronin.gif", name: "ronin"},
    {asset: "kraken.gif", name: "kraken"},
    {asset: "shield.gif", name: "shield"},
    {asset: "snowball.gif", name: "snowball"},
    {asset: "essence.gif", name: "essence"},
    {asset: "paladin.gif", name: "paladin"},
    {asset: "sinner.gif", name: "sinner"},
    {asset: "berserker.gif", name: "berserker"},
    {asset: "bard.gif", name: "bard"}
  ],
  [
    {asset: "fish.gif", name: "fish"},
    {asset: "rock.gif", name: "rock"},
    {asset: "sword.gif", name: "sword"},
    {asset: "merc.gif", name: "merc"},
    {asset: "rain.gif", name: "rain"},
    {asset: "elder.gif", name: "elder"},
    {asset: "hydro.gif", name: "hydro"},
    {asset: "lancer.gif", name: "lancer"},
  ],
  [
    {asset: "negative.gif", name: "negative"},
    {asset: "leaf.gif", name: "leaf"},
    {asset: "vamp.gif", name: "vamp"},
    {asset: "pirate.gif", name: "pirate"},
  ],
  [
    {asset: "wind.gif", name: "wind"},
    {asset: "blades.gif", name: "blades"},
    {asset: "mystic.gif", name: "mystic"},
    {asset: "rogue.gif", name: "rogue"},
  ],
  [
    {asset: "ninja.gif", name: "ninja"},
    {asset: "olaf.gif", name: "olaf"},
    {asset: "plague.gif", name: "plague"},
  ],
  [
    {asset: "druid.gif", name: "druid"},
    {asset: "fur.gif", name: "fur"},
    {asset: "spot.gif", name: "spot"},
  ]
]

export const tribes = [
  {asset: "fire.gif", name:"Fire"},
  {asset: "sky.gif", name:"Sky"},
  {asset: "electric.gif", name:"Electric"},
  {asset: "grass.gif", name:"Grass"},
  {asset: "wind.gif", name:"Wind"},
  {asset: "water.gif", name:"Water"},
]

export const monsters = [
  {asset: "Enemy_Skeleton.gif", name:"Calaca Skeleton"},
  {asset: "Enemy_Zombie.gif", name:"Plague Zombie"},
  {asset: "Enemy_Drowner.gif", name:"Mudkin Drowner"},
  {asset: "Enemy_Draugr.gif", name:"Deathlord Draugr"},
]