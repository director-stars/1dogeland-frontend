import React, { useEffect } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { monsters } from 'hooks/useDogeInfo'

interface MonsterCardProps {
    id: string
    health: string
    successRate: string
    rewardTokenFrom: string
    rewardTokenTo: string
    rewardExpFrom: string
    rewardExpTo: string
    activeMonster: string
    setActiveMonster: any
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
    width:60px;
    height: 60px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    background-position: center;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const MonsterInfo = styled.div`
    display: grid;
    line-height: 24px;
    margin-bottom: 20px;
`
const PriceInfo = styled.div`
    display: flex;
`
const TokenIcon = styled(Image)`
    width: 24px;
`
const StyledDiv = styled.div`
    display: flex;
    column-gap: 20px;
`
const MonsterCard: React.FC<MonsterCardProps> = ({id, health, successRate, rewardTokenFrom, rewardTokenTo, rewardExpFrom, rewardExpTo, activeMonster, setActiveMonster}) => {
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    const monsterImage = monsters[id].asset;
    const monsterName = monsters[id].name;

    const { onPresentConnectModal } = useWalletModal(connect, reset)
    const renderDogeCardButtons = () => {
        return (
            <Button fullWidth size="sm"
            variant={activeMonster===id ? "secondary" : "primary"}
            onClick={() => {
                setActiveMonster(id);
            }}>{activeMonster===id ? 'Selected' : 'Select'}</Button>
        )
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <StyledDiv>
                      <StyledImage imgUrl={`/images/monsters/${monsterImage}`}/>
                      <StyledHeading size="md">{monsterName}</StyledHeading>
                    </StyledDiv>
                    <MonsterInfo>
                        <Block><Label>Success Rate:</Label><Text>~{successRate}%</Text></Block>
                        <Block><Label>Token Reward:</Label><PriceInfo>{rewardTokenFrom} ~ {rewardTokenTo}<TokenIcon width={24} height={24} src="/images/egg/9.png"/><Text> 1doge</Text></PriceInfo></Block>
                        <Block><Label>EXP Reward:</Label><Text>{rewardExpFrom} EXP</Text></Block>
                    </MonsterInfo>
                    {account? (renderDogeCardButtons())
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                </CardBody>
            </Card>
        </div>
    )
}

export default MonsterCard;