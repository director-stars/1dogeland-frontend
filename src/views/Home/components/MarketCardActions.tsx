import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, ToastContainer, useModal, useWalletModal } from '@pancakeswap-libs/uikit'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useBuyCryptoDoge } from 'hooks/useDogesLand'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
`

const MarketCardActions: React.FC = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [toasts, setToasts] = useState([]);
  const allowance = useCryptoDogeControllerAllowance()
  const { onApprove } = useCryptoDogeControllerApprove()
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
  const { onBuyDoge } = useBuyCryptoDoge()

  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      const txHash = await onBuyDoge()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onBuyDoge, setRequestedBuy])

  const handleClick = (description = "") => {
    const now = Date.now();
    const randomToast = {
      id: `id-${now}`,
      title: `New Doge has been borned.`,
      description,
      type: "success",
    };

    setToasts((prevToasts) => [randomToast, ...prevToasts]);
  };

  const handleRemove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
  };

  const renderDogeCardButtons = () => {
    if (!allowance.toNumber()) {
      return (
        <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
          Approve 1Doge
        </Button>
      )
    }
    return (
        <Button fullWidth size="sm"
        disabled={pendingTx}
        onClick={async () => {
            setPendingTx(true)
            await handleBuy()
            setPendingTx(false)
            window.scrollTo(0, 0);
            handleClick()
        }}>{pendingTx ? 'Pending Buy Doge' : 'Buy Doge'}</Button>
    )
  }

  return (
    <CardActions>
      {account? (renderDogeCardButtons())
        : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
    <ToastContainer toasts={toasts} onRemove={handleRemove} />
    </CardActions>
  )
}

export default MarketCardActions
