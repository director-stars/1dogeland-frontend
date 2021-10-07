import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, ToastContainer, useModal, useWalletModal } from '@pancakeswap-libs/uikit'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useBuyCryptoDoge, useDogeBalance } from 'hooks/useDogesLand'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
  margin-top: 20px;
`

const ChestCardActions: React.FC = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [toasts, setToasts] = useState([]);
  const allowance = useCryptoDogeControllerAllowance()
  const { onApprove } = useCryptoDogeControllerApprove()
  const [oneDogeBalance, setOneDogeBalance] = useState(parseInt(window.localStorage.getItem("oneDogeBalance")) / 10**18);
  const [dogeNFTBalance, setDogeNFTBalance] = useState(parseInt(window.localStorage.getItem("dogeNFTBalance")));

  // console.log('oneDogeBalance', oneDogeBalance)
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
  
  const { onGetDogeBalance } = useDogeBalance()
  const handleGetDogeBalance = useCallback(async () => {
    try {
      await onGetDogeBalance()
      setOneDogeBalance(parseInt(window.localStorage.getItem("oneDogeBalance")) / 10**18);
      setDogeNFTBalance(parseInt(window.localStorage.getItem("dogeNFTBalance")));
    } catch (e) {
      console.error(e)
    }
  }, [onGetDogeBalance])

  const handleClick = (description = "") => {
    const now = Date.now();
    const randomToast = {
      id: `id-${now}`,
      title: `Please check your doge army.`,
      description,
      type: "success",
    };

    setToasts((prevToasts) => [randomToast, ...prevToasts]);
  };

  const handleRemove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
  };

  const renderDogeCardButtons = () => {
    if(oneDogeBalance < 9999){
      return (
          <Button fullWidth disabled size="sm">
            Not enough 1doge
          </Button>
      ) 
    }
    if (!allowance.toNumber()) {
      return (
        <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
          Approve
        </Button>
      )
    }
    if(dogeNFTBalance > 4){
        return (
            <Button fullWidth disabled size="sm">
              You have enough doge army
            </Button>
        ) 
    }
    return (
        <Button fullWidth size="sm"
        disabled={pendingTx}
        onClick={async () => {
            setPendingTx(true)
            await handleBuy()
            await handleGetDogeBalance()
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

export default ChestCardActions
