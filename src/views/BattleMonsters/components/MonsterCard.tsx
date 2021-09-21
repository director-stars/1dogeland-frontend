import React, { useEffect, useCallback, useState } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image, ToastContainer } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useFetchPublicData } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFightCryptoMonster } from 'hooks/useDogesLand'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'

interface MonsterCardProps {
    imgUrl: string
    name: string
    health: string
    successRate: string
    tokenReward: string
    expReward: string
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
`
const PriceInfo = styled.div`
    display: flex;
`
const TokenIcon = styled(Image)`
    width: 24px;
`
const OwnerInfo = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const MonsterCard: React.FC<MonsterCardProps> = ({imgUrl, name, health, successRate, tokenReward, expReward, activeDoge}) => {
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    const [pendingTx, setPendingTx] = useState(false)
    const [toasts, setToasts] = useState([]);
    const allowance = useCryptoDogeControllerAllowance()
    const [requestedApproval, setRequestedApproval] = useState(false)

    const { onPresentConnectModal } = useWalletModal(connect, reset)
    const [, setRequestedFight] = useState(false)
    const [battleResult, setBattleResult] = useState(false)
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

    const handleFight = useCallback(async (dogeId, probability) => {
        try {
          setRequestedFight(true)
          const fightResult = await onFightMonster(dogeId, probability)
          console.log('fightResult: ',fightResult);
          // user rejected tx or didn't go thru
          if (fightResult) {
            setRequestedFight(false)
            setBattleResult(true)
          }
        } catch (e) {
          console.error(e)
        }
      }, [onFightMonster, setRequestedFight])

    const handleClick = (description = "") => {
        const now = Date.now();
        const randomToast = {
          id: `id-${now}`,
          title: battleResult?`Win.`:`Loss`,
          description,
          type: battleResult?`success`:`danger`,
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
                await handleFight(activeDoge, successRate)
                setPendingTx(false)
                window.scrollTo(0, 0);
                handleClick()
            }}>{pendingTx ? 'Pending Fight' : 'Fight'}</Button>
        )
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <StyledImage imgUrl={imgUrl}/>
                </CardHeader>
                <CardBody>
                    {account? (renderDogeCardButtons())
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                </CardBody>
                <CardFooter>
                    <StyledHeading size="lg">{name}</StyledHeading>
                    <MonsterInfo>
                        <Block><Label>HP:</Label><Text>{health}HP</Text></Block>
                        <Block><Label>Success Rate:</Label><Text>~{successRate}%</Text></Block>
                        <Block><Label>Token Reward:</Label><PriceInfo><TokenIcon width={24} height={24} src="/images/egg/9.png"/><Text>{tokenReward} 1doge</Text></PriceInfo></Block>
                        <Block><Label>EXP Reward:</Label><Text>{expReward} EXP</Text></Block>
                    </MonsterInfo>
                </CardFooter>
            </Card>
            <ToastContainer toasts={toasts} onRemove={handleRemove} />
        </div>
    )
}

export default MonsterCard;