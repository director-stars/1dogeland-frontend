import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, ToastContainer, useModal, useWalletModal } from '@pancakeswap-libs/uikit'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useUnsetAutoFight, useSetAutoFight, useDogeBalance } from 'hooks/useDogesLand'
// import OrderModal from './OrderModal'

interface DogeCardActionsProps {
  dogeId: string
  stoneInfo: string
  activeMonster: string
  setActiveMonster: any
  magicStoneNFTBalance: number
  setMagicStoneNFTBalance: any
  activeStoneId: number
}

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
  // margin-top: 20px;
`

const DogeCardActions: React.FC<DogeCardActionsProps> = ({ dogeId, stoneInfo, activeMonster, setActiveMonster, magicStoneNFTBalance, setMagicStoneNFTBalance, activeStoneId }) => {
  
  const [requestedApproval, setRequestedApproval] = useState(false)
  // const allowance = useCryptoDogeControllerAllowance()
  // const { onApprove } = useCryptoDogeControllerApprove()
  // const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  // const handleApprove = useCallback(async () => {
  //   try {
  //     setRequestedApproval(true)
  //     const txHash = await onApprove()
  //     // user rejected tx or didn't go thru
  //     if (!txHash) {
  //       setRequestedApproval(false)
  //     }
  //     // onPresentApprove()
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [onApprove])

  const { account, connect, reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const [pendingTx, setPendingTx] = useState(false)

  const [, setRequestedBuy] = useState(false)
  
  // const [onPresentResult] = useModal(<OrderModal title="Sell Doge" id={dogeId} />) 
  const { onUnsetAutoFight } = useUnsetAutoFight()
  const { onSetAutoFight } = useSetAutoFight();

  const handleUnsetAutoFight = useCallback(async () => {
    try {
        setPendingTx(true)
      const txHash = await onUnsetAutoFight(dogeId)
      // user rejected tx or didn't go thru
      if (!txHash) {
        setPendingTx(false)
      }
      // onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onUnsetAutoFight, dogeId])

  const handleSetAutoFight = useCallback(async () => {
    try {
        setPendingTx(true)
      const txHash = await onSetAutoFight(dogeId, activeStoneId, activeMonster)
      // user rejected tx or didn't go thru
      if (!txHash) {
        setPendingTx(false)
      }
      // onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onSetAutoFight, dogeId, activeStoneId, activeMonster])

  const { onGetDogeBalance } = useDogeBalance()
  const handleGetDogeBalance = useCallback(async () => {
    try {
      await onGetDogeBalance()
      setMagicStoneNFTBalance(parseInt(window.localStorage.getItem("magicStoneNFTBalance")));
    } catch (e) {
      console.error(e)
    }
  }, [onGetDogeBalance, setMagicStoneNFTBalance])

  const renderDogeCardButtons = () => {
    // if (!allowance.toNumber()) {
    //   return (
    //     <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
    //       Approve
    //     </Button>
    //   )
    // }
    if(stoneInfo !== "0"){
      return (
        <Button fullWidth size="sm"
        disabled={pendingTx} variant="subtle"
        onClick={async () => {
          setPendingTx(true)
          await handleUnsetAutoFight()
          setPendingTx(false)
        }}>{pendingTx ? 'Pending Unset Auto Fight' : 'Unset Auto Fight'}</Button>
      )
    }
    if(magicStoneNFTBalance === 0){
      return (
        <Button fullWidth disabled size="sm">Not Enough Stone</Button>
      )
    }
    if(activeMonster === ''){
      return (
        <Button fullWidth size="sm" >Select Monster</Button>
      )
    }
    return (
      <Button fullWidth size="sm"
      disabled={pendingTx}
      onClick={async () => {
          setPendingTx(true)
          await handleSetAutoFight()
          await handleGetDogeBalance()
          setActiveMonster('');
          setPendingTx(false)
      }}>{pendingTx ? 'Pending Set Auto Fight' : 'Set Auto Fight'}</Button>
    )
  }

  return (
    <CardActions>
      {account? (renderDogeCardButtons())
        : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
    {/* <ToastContainer toasts={toasts} onRemove={handleRemove} /> */}
    </CardActions>
  )
}

export default DogeCardActions
