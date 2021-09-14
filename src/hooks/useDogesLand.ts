import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { useCryptoDogeController, useCryptoDogeNFT } from 'hooks/useContract'
import useRefresh from './useRefresh'
import { getBattleBosses, getDoges, getMonsters, buyDoge, getLastTokenId } from '../utils/dogelandUtils'

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
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getDoges()
      console.log('doges:', res)
      setDoges(res)
    }
    fetchBalance()
  }, [fastRefresh])

  return doges
}

export const useMonsters = () => {
  const [monsters, setMonsters] = useState([])
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getMonsters()
      console.log('monsters:', res)
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
        console.log('lastTokenId', lastTokenId);
        return 'txHash'
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract, cryptoDogeNFTContract],
  )

  return { onBuyDoge: handleBuy }
}