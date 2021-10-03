import React, { useEffect } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { classes, tribes } from 'hooks/useDogesLand'
import Timestamp from './Timestamp'

interface DogeCardProps {
    classInfo: string
    rare: string
    exp: string
    level: string
    tribe: string
    id: string
    activeDoge: number
    setActiveDoge: any
    farmTime: string
    fightNumber: string
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
    text-transform: capitalize;
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
const DogeCard: React.FC<DogeCardProps> = ({classInfo, rare, level, exp, tribe, id, activeDoge, setActiveDoge, farmTime, fightNumber}) => {

    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])
    const dogeImage = classes[parseInt(rare) - 1][classInfo].asset;
    const dogeName = classes[parseInt(rare) - 1][classInfo].name;
    const tribeName = tribes[tribe].name;

    const { onPresentConnectModal } = useWalletModal(connect, reset)

    return (
        <div>
            <Card>
                <Id>#{id}</Id>
                <CardHeader>
                    <StyledImage imgUrl={`/images/doges/${dogeImage}`}/>
                </CardHeader>
                <CardBody>
                    <StyledHeading size="lg" color="primary">{dogeName}</StyledHeading>
                </CardBody>
                <CardFooter>
                    <DogeInfo>
                        <div>
                            <Text>Rare : </Text>
                            <Text>{rare}</Text>
                        </div>
                        <div>
                            <Text>Level :</Text>
                            <Text>{level} / {exp} exp</Text>
                        </div>
                    </DogeInfo>
                    <DogeInfo>
                        <div>
                            <Text>Tribe :</Text>
                            <Text>{tribeName}</Text>
                        </div>
                    </DogeInfo>
                    <DogeInfo>
                        <div>
                            <Text>Remained Turns Fight :</Text>
                            <Text>{fightNumber}</Text>
                        </div>
                    </DogeInfo>
                    {(parseInt(farmTime)*1000 < Date.now() && parseInt(fightNumber) > 0)?(
                        <DogeCardAction>
                        
                            {account? (<Button fullWidth size="sm" onClick={() => {
                                setActiveDoge(id);
                            }}>Use this Doge</Button>)
                            : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                            
                        </DogeCardAction>
                        ): (
                        <DogeCardAction>
                            <Button disabled fullWidth size="sm" onClick={onPresentConnectModal}>Wait for <Timestamp timeValue={parseInt(farmTime)*1000} /></Button>
                        </DogeCardAction>
                        )
                    }
                </CardFooter>
                
            </Card>
        </div>
    )
}

export default DogeCard;