import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, useModal, useWalletModal } from '@pancakeswap-libs/uikit'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useGetResultOfAutoFight } from 'hooks/useDogesLand'
import ResultModal from './ResultModal'

interface DogeCardActionsProps {
  dogeId: string
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

const DogeCardActions: React.FC<DogeCardActionsProps> = ({ dogeId }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = useCryptoDogeControllerAllowance()
  const { onApprove } = useCryptoDogeControllerApprove()
  // const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const oneDogeAmount = window.localStorage.getItem("oneDogeBalance");
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

  // const [, setRequestedBuy] = useState(false)
  
  // const [onPresentResult] = useModal(<OrderModal title="Sell Doge" id={dogeId} />) 
  const { onGetResultOfAutoFight } = useGetResultOfAutoFight();
  const [rewardExp, setRewardExp] = useState("")
  const [rewardToken, setRewardToken] = useState("")
  const [fightNumber, setFightNumber] = useState("")
  const [winNumber, setWinNumber] = useState("")
  const [tx, setTx] = useState('')
  const [error, setError] = useState('')

  const handleGetResultOfAutoFight = useCallback(async () => {
      const fightResult = await onGetResultOfAutoFight(dogeId)
      // console.log('fightResult', fightResult);
      setTx(fightResult.events?fightResult.events.Fight.transactionHash:'')
      setRewardExp(fightResult.events?fightResult.events.Fight.returnValues._totalRewardExp.toString():'');
      setRewardToken(fightResult.events?fightResult.events.Fight.returnValues._totalRewardAmount.toString():'');
      setFightNumber(fightResult.events?fightResult.events.Fight.returnValues._fightNumber.toString():'');
      setWinNumber(fightResult.events?fightResult.events.Fight.returnValues._winNumber.toString():'');
      setError(fightResult.message);
  }, [onGetResultOfAutoFight, dogeId])

  const [onPresentResult] = useModal(<ResultModal title="Auto Battle Result" rewardExp={rewardExp} tx={tx} rewardToken={rewardToken} error={error} winNumber={winNumber} fightNumber={fightNumber}/>) 

  useEffect(() => {
    if ((fightNumber !== '' && winNumber !== '' && rewardExp !== '' && rewardToken !== '' && tx !== '') || (error !== '' && error !== undefined)) {
      onPresentResult()
      setTx('');
      setRewardExp('');
      setRewardToken('');
      setFightNumber('');
      setWinNumber('');
      setError('');
    }
  }, [ fightNumber, winNumber, rewardExp, rewardToken, tx, error, onPresentResult ])

  const renderDogeCardButtons = () => {
    if (!allowance.toNumber()) {
      return (
        <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
          Approve
        </Button>
      )
    }
    if(parseInt(oneDogeAmount) < 100000){
      return (
        <Button fullWidth size="sm" disabled>Not Enough 1Doge</Button>
      )
    }
    return (
      <Button fullWidth size="sm"
      disabled={pendingTx}
      onClick={async () => {
          setPendingTx(true)
          await handleGetResultOfAutoFight()
          setPendingTx(false)
      }}>{pendingTx ? 'Pending get result' : 'Get result of auto fighting'}</Button>
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
