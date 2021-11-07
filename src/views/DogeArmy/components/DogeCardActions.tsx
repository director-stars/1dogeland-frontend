import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, useModal, useWalletModal } from '@pancakeswap-libs/uikit'
import { useCryptoDogeNFTAllowance } from 'hooks/useAllowance'
import { useCryptoDogeNFTApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useCancelOrder } from 'hooks/useDogesLand'
import OrderModal from './OrderModal'

interface DogeCardActionsProps {
  dogeId: string
  isSale: boolean
}

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
  margin-top: 20px;
`

const DogeCardActions: React.FC<DogeCardActionsProps> = ({ dogeId, isSale }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = useCryptoDogeNFTAllowance()
  const { onApprove } = useCryptoDogeNFTApprove()
  // const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
      // onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const { account, connect, reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const [pendingTx, setPendingTx] = useState(false)

  const [, setRequestedBuy] = useState(false)
  
  const [onPresentResult] = useModal(<OrderModal title="Sell Doge" id={dogeId} />) 
  const { onCancelOrder } = useCancelOrder()

  const handleCancelOrder = useCallback(async () => {
    try {
        setPendingTx(true)
      const txHash = await onCancelOrder(dogeId)
      // user rejected tx or didn't go thru
      if (!txHash) {
        setPendingTx(false)
      }
      // onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onCancelOrder, dogeId])

  const renderDogeCardButtons = () => {
    if (!allowance.toNumber()) {
      return (
        <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
          Approve
        </Button>
      )
    }
    if(isSale){
      return (
        <Button fullWidth size="sm"
        disabled={pendingTx}
        onClick={handleCancelOrder}>{pendingTx ? 'Pending Cancel Sell' : 'Cancel Sell'}</Button>
      )
    }
    return (
      <Button fullWidth size="sm"
      disabled={pendingTx}
      onClick={async () => {
          setPendingTx(true)
          onPresentResult()
          setPendingTx(false)
      }}>{pendingTx ? 'Pending Sell Doge' : 'Sell Doge'}</Button>
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
