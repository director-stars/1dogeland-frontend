import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { useCryptoDogeController, useCryptoDogeNFT, useMagicStoneNFT, useMarketController, useOneDoge } from 'hooks/useContract'
import useRefresh from './useRefresh'
import { 
  getBattleBosses, 
  getMyFightDoges, 
  getMonsters, 
  buyDoge, 
  getLastTokenId, 
  getDogeInfo, 
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
  getResultOfAutoFight
} from '../utils/dogelandUtils'

export const useBattleBosses = () => {
  const [bosses, setBosses] = useState([])
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getBattleBosses()
      setBosses(res)
    }
    fetchBalance()
  }, [fastRefresh])

  return bosses
}

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

export const useBuyCryptoDoge = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  // const cryptoDogeNFTContract = useCryptoDogeNFT();

  const handleBuy = useCallback(
    async () => {
      try {
        const txHash = await buyDoge(cryptoDogeControllerContract, account)
        // const lastTokenId = await getLastTokenId(cryptoDogeNFTContract, account);
        // const dogeInfo = await getDogeInfo(cryptoDogeNFTContract, lastTokenId);
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )

  return { onBuyDoge: handleBuy }
}

export const useBuyMagicStone = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  // const cryptoDogeNFTContract = useCryptoDogeNFT();

  const handleBuy = useCallback(
    async () => {
      try {
        const txHash = await buyStone(cryptoDogeControllerContract, account)
        // const lastTokenId = await getLastTokenId(cryptoDogeNFTContract, account);
        // const dogeInfo = await getDogeInfo(cryptoDogeNFTContract, lastTokenId);
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )

  return { onBuyStone: handleBuy }
}

export const useFightCryptoMonster = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleFight = useCallback(
    async (monsterId, dogeId) => {
      try {
        const fightResult = await fightMonster(cryptoDogeControllerContract, account, monsterId, dogeId)
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
  const cryptoDogeControllerContract = useCryptoDogeController()
  const [rewardAmount, setRewardAmount] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getRewardTokenInfo(cryptoDogeControllerContract, account);
      setRewardAmount(res)
    }
    fetchBalance()
  }, [account, fastRefresh, cryptoDogeControllerContract])

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
  const handleFillOrder = useCallback(
    async (_tokenId) => {
      try {
        const result = await fillOrder(cryptoDogeNFTContract, account, _tokenId)
        console.log('result', result.events.FillOrder);
        await dbUpdateOwner(_tokenId, account);
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract],
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
        // console.log('result', result.events.DNASet);
        await dbCreateDoge(_tokenId, account);
        return result
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
  const [dogeBalance, setDogeBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  const cryptoDogeNFTContract = useCryptoDogeNFT();
  const magicStoneNFTContract = useMagicStoneNFT();
  const oneDogeContract = useOneDoge();
  const handleGetDogeBalance = useCallback(
    async () => {
      try {
        const doges = await getBalance(cryptoDogeNFTContract, magicStoneNFTContract, oneDogeContract, account, );
        setDogeBalance(doges);
        return true;
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract, magicStoneNFTContract, oneDogeContract],
  )
  return { onGetDogeBalance: handleGetDogeBalance }
  // useEffect(() => {
  //   const fetchDogeBalance = async () => {
  //     const doges = await getBalance(cryptoDogeNFTContract, magicStoneNFTContract, oneDogeContract, account, );
  //     setDogeBalance(doges);
  //   }
  //   fetchDogeBalance()
  // }, [fastRefresh, cryptoDogeNFTContract, magicStoneNFTContract, account, oneDogeContract])
}

export const useUnsetAutoFight = () => {
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleUnsetAutoFight = useCallback(
    async (_tokenId) => {
      try {
        const result = await unsetAutoFight(cryptoDogeControllerContract, account, _tokenId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )
  return { onUnsetAutoFight: handleUnsetAutoFight }
}

export const useSetAutoFight = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleSetAutoFight = useCallback(
    async (_tokenId, _monsterId) => {
      try {
        const result = await setAutoFight(cryptoDogeControllerContract, account, _tokenId, _monsterId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )
  return { onSetAutoFight: handleSetAutoFight }
}

export const useGetResultOfAutoFight = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleGetResultOfAutoFight = useCallback(
    async (_tokenId) => {
      try {
        const result = await getResultOfAutoFight(cryptoDogeControllerContract, account, _tokenId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )
  return { onGetResultOfAutoFight: handleGetResultOfAutoFight }
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
    {asset: "snowball.gif", name: "snowball"}
  ],
  [
    {asset: "fish.gif", name: "fish"},
    {asset: "rock.gif", name: "rock"},
    {asset: "sword.gif", name: "sword"},
    {asset: "merc.gif", name: "merc"},
    {asset: "rain.gif", name: "rain"},
    {asset: "elder.gif", name: "elder"},
    {asset: "hydro.gif", name: "hydro"},
  ],
  [
    {asset: "negative.gif", name: "negative"},
    {asset: "leaf.gif", name: "leaf"},
    {asset: "vamp.gif", name: "vamp"},
  ],
  [
    {asset: "wind.gif", name: "wind"},
    {asset: "blades.gif", name: "blades"},
    {asset: "mystic.gif", name: "mystic"},
  ],
  [
    {asset: "ninja.gif", name: "ninja"},
    {asset: "olaf.gif", name: "olaf"},
  ],
  [
    {asset: "druid.gif", name: "druid"},
    {asset: "fur.gif", name: "fur"},
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