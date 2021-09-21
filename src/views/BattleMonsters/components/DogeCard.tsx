import React, { useEffect } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useFetchPublicData } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface DogeCardProps {
    imgUrl: string
    name: string
    rare: string
    exp: string
    level: string
    tribe: string
    id: string
    activeDoge: number
    setActiveDoge: any
}

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
`
const DogeInfo = styled.div`
    display: flex;
    justify-content: space-between;
    & * {
        display: flex;
        margin-right: 10px;
    }
`
const Id = styled.div`
    position: absolute;
    background: linear-gradient(-45deg,#e8c456,#aa8929,#fdd325);
    animation: dogeid 3s ease infinite;
    padding: 5px 10px;
    font-weight: 400;
    min-width: 80px;
    font-size: 1rem;
    border-radius: 10rem;
    margin: 10px;
`
const DogeCardAction = styled.div`
    margin-top: 10px;
`
const DogeCard: React.FC<DogeCardProps> = ({imgUrl, name, rare, level, exp, tribe, id, activeDoge, setActiveDoge}) => {

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
                <Id>#{id}</Id>
                <CardHeader>
                    <StyledImage imgUrl={imgUrl}/>
                </CardHeader>
                <CardBody>
                    <StyledHeading size="lg" color="primary">{name}</StyledHeading>
                </CardBody>
                <CardFooter>
                    <DogeInfo>
                        <div>
                            <Text>Rare: </Text>
                            <Text>{rare}</Text>
                        </div>
                        <div>
                            <Text>Level:</Text>
                            <Text>{level} / {exp} exp</Text>
                        </div>
                    </DogeInfo>
                    <DogeInfo>
                        <div>
                            <Text>Tribe:</Text>
                            <Text>{tribe}</Text>
                        </div>
                    </DogeInfo>
                    <DogeCardAction>
                    {account? (<Button fullWidth size="sm" onClick={() => {
                        setActiveDoge(id);
                    }}>Use this Doge</Button>)
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                    </DogeCardAction>
                </CardFooter>
                
            </Card>
        </div>
    )
}

export default DogeCard;