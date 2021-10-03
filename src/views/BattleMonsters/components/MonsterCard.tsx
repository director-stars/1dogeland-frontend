import React, { useEffect, useCallback, useState } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image, useModal } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFightCryptoMonster, monsters } from 'hooks/useDogesLand'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'
import ResultModal from './ResultModal'

interface MonsterCardProps {
    id: number
    health: string
    successRate: string
    rewardTokenFrom: string
    rewardTokenTo: string
    rewardExpFrom: string
    rewardExpTo: string
    activeDoge: string
}

const Block = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const StyledImage = styled.div<{
    imgUrl?: string
}>`
    width:100%;
    min-height: 260px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    background-position: center;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    margin-bottom: 10px;
`
const MonsterInfo = styled.div`
    display: grid;
    line-height: 24px;
`
const PriceInfo = styled.div`
    display: flex;
`
const TokenIcon = styled(Image)`
    width: 24px;
`
const MonsterCard: React.FC<MonsterCardProps> = ({id, health, successRate, rewardTokenFrom, rewardTokenTo, rewardExpFrom, rewardExpTo, activeDoge}) => {
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    const monsterImage = monsters[id].asset;
    const monsterName = monsters[id].name;

    const [pendingTx, setPendingTx] = useState(false)
    const allowance = useCryptoDogeControllerAllowance()
    const [requestedApproval, setRequestedApproval] = useState(false)

    const { onPresentConnectModal } = useWalletModal(connect, reset)
    const [rewardExp, setRewardExp] = useState("0")
    const [battleResult, setBattleResult] = useState('false')
    const [tx, setTx] = useState('')
    const [error, setError] = useState(false);
    const { onFightMonster } = useFightCryptoMonster()
    const { onApprove } = useCryptoDogeControllerApprove()

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

    const handleFight = useCallback(async (monsterId, dogeId) => {
          const fightResult = await onFightMonster(monsterId, dogeId)
          // console.log('fightResult',fightResult)
          const temp = Date.now();
          setTx(fightResult.transactionHash?fightResult.transactionHash:'')
          setRewardExp(fightResult.returnValues?fightResult.returnValues._rewardExp.toString():'');
          setError(fightResult.code);
          setBattleResult(temp.toString());
          setBattleResult(fightResult.code?fightResult.message:fightResult.returnValues._win);
            
      }, [onFightMonster])

    const [onPresentResult] = useModal(<ResultModal title="Battle Result" result={battleResult} rewardExp={rewardExp} tx={tx} error={error}/>) 


    useEffect(() => {
      if ((battleResult !== 'false') && (battleResult !== 'true')) {
        onPresentResult()
      }
      setBattleResult('true')
    }, [ battleResult, setBattleResult, onPresentResult ])
      
    const renderDogeCardButtons = () => {
        if (!allowance.toNumber()) {
          return (
            <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
              Approve 1Doge
            </Button>
          )
        }
        if(!activeDoge){
          return (
            <Button fullWidth size="sm">Select your doge</Button>
          )  
        }
        return (
            <Button fullWidth size="sm"
            disabled={pendingTx}
            onClick={async () => {
                setPendingTx(true)
                await handleFight(id, activeDoge)
                setPendingTx(false)
            }}>{pendingTx ? 'Pending Fight' : 'Fight'}</Button>
        )
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <StyledImage imgUrl={`/images/monsters/${monsterImage}`}/>
                </CardHeader>
                <CardBody>
                    {account? (renderDogeCardButtons())
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                </CardBody>
                <CardFooter>
                    <StyledHeading size="lg">{monsterName}</StyledHeading>
                    <MonsterInfo>
                        <Block><Label>HP:</Label><Text>{health}HP</Text></Block>
                        <Block><Label>Success Rate:</Label><Text>~{successRate}%</Text></Block>
                        <Block><Label>Token Reward:</Label><PriceInfo>{rewardTokenFrom} ~ {rewardTokenTo}<TokenIcon width={24} height={24} src="/images/egg/9.png"/><Text> 1doge</Text></PriceInfo></Block>
                        <Block><Label>EXP Reward:</Label><Text>{rewardExpFrom} EXP</Text></Block>
                    </MonsterInfo>
                </CardFooter>
            </Card>
        </div>
    )
}

export default MonsterCard;