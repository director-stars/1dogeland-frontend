import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
export const getCryptoDogeControllerAddress = () => {
  return addresses.cryptoDogeController[chainId]
}

export const getOneDogeAddress = () => {
  return addresses.oneDoge[chainId]
}

export const getCryptoDogeNFTAddress = () => {
  return addresses.cryptoDogeNFT[chainId];
}