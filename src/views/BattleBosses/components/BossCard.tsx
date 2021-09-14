import React, { useEffect } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useFetchPublicData } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface BossCardProps {
    imgUrl: string
    id: string
    name: string
    reward: string
    status: string
    health: string
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
const BossInfo = styled.div`
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
const BossCard: React.FC<BossCardProps> = ({imgUrl, id, name, reward, status, health }) => {
    const fight = () => {
        console.log('fightBoss')
    }
    let displayStatus = "Alive";
    if(!status){
      displayStatus = "Ended";
    }

    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])
    
    useFetchPublicData()

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
                    <BossInfo>
                        <Block><Label>ID:</Label><Text>{id}</Text></Block>
                        <Block><Label>Reward:</Label><Text>{reward}BNB</Text></Block>
                        <Block><Label>Status:</Label><Text>{displayStatus}</Text></Block>
                        <Block><Label>Health:</Label><Text>{health}HP</Text></Block>
                    </BossInfo>
                </CardFooter>
            </Card>
        </div>
    )
}

export default BossCard;