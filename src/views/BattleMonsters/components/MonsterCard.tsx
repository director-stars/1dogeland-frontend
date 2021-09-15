import React, { useEffect } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useFetchPublicData } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface MonsterCardProps {
    imgUrl: string
    name: string
    health: string
    successRate: string
    tokenReward: string
    expReward: string
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

const StyledHeading = styled(Heading)`
    text-align: center;
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
const MonsterCard: React.FC<MonsterCardProps> = ({imgUrl, name, health, successRate, tokenReward, expReward}) => {
    const fight = () => {
        console.log('fightMonster')
    }

    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    const { onPresentConnectModal } = useWalletModal(connect, reset)
    return (
        <div>
            <Card>
                <CardHeader>
                    <Image width={210} height={210} src={imgUrl}/>
                </CardHeader>
                <CardBody>
                    {account? (<Button fullWidth size="sm" onClick={() => {
                        fight();
                    }}>Fight</Button>)
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                </CardBody>
                <CardFooter>
                    <StyledHeading size="lg">{name}</StyledHeading>
                    <MonsterInfo>
                        <Block><Label>HP:</Label><Text>{health}HP</Text></Block>
                        <Block><Label>Success Rate:</Label><Text>~{successRate}%</Text></Block>
                        <Block><Label>Token Reward:</Label><Text>{tokenReward} 1doge</Text></Block>
                        <Block><Label>EXP Reward:</Label><Text>{expReward} EXP</Text></Block>
                    </MonsterInfo>
                </CardFooter>
            </Card>
        </div>
    )
}

export default MonsterCard;