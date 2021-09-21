import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { useCryptoDogeController, useCryptoDogeNFT } from 'hooks/useContract'
import useRefresh from './useRefresh'
import { getBattleBosses, getDoges, getMonsters, buyDoge, getLastTokenId, getDogeInfo, createDoge, fightMonster } from '../utils/dogelandUtils'

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

export const useDoges = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT();
  // console.log(account);
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getDoges(cryptoDogeNFTContract, account);
      // console.log('doges:', res)
      setDoges(res)
    }
    fetchBalance()
  }, [account, fastRefresh, cryptoDogeNFTContract])

  return doges
}

export const useMonsters = () => {
  const [monsters, setMonsters] = useState([])
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getMonsters()
      setMonsters(res)
    }
    fetchBalance()
  }, [fastRefresh])

  return monsters
}

export const useBuyCryptoDoge = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const cryptoDogeNFTContract = useCryptoDogeNFT();

  const handleBuy = useCallback(
    async () => {
      try {
        const txHash = await buyDoge(cryptoDogeControllerContract, account)
        const lastTokenId = await getLastTokenId(cryptoDogeNFTContract, account);
        const dogeInfo = await getDogeInfo(cryptoDogeNFTContract, lastTokenId);
        await createDoge(dogeInfo, lastTokenId, account);
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract, cryptoDogeNFTContract],
  )

  return { onBuyDoge: handleBuy }
}

export const useFightCryptoMonster = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleFight = useCallback(
    async (dogeId, probability) => {
      try {
        const fightResult = await fightMonster(cryptoDogeControllerContract, dogeId, account, probability)
        return fightResult
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )

  return { onFightMonster: handleFight }
}