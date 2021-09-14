import React, { useEffect } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useFetchPublicData } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface MartketCardProps {
    imgUrl: string
    name: string
    price: string
    owner: string
}

const StyledHeading = styled(Heading)`
    text-align: center;
`
const DogeInfo = styled.div`
    display: flex;
    justify-content: space-between;
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
const MarketCard: React.FC<MartketCardProps> = ({imgUrl, name, price, owner}) => {
    const owner1 = '0x67926b0C4753c42b31289C035F8A656D800cD9e7';
    const ownerAddress = `${owner1.substring(0, 4)}...${owner1.substring(owner1.length - 4)}`;
    const buyDoge = () => {
        console.log('buyDoge')
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
                        buyDoge();
                    }}>Buy Doge</Button>)
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                </CardBody>
                <CardFooter>
                    <StyledHeading size="lg">{name}</StyledHeading>
                    <DogeInfo>
                        <Text>Price</Text>
                        <PriceInfo>
                            <TokenIcon width={24} height={24} src=""/>
                            <Text>{price}</Text>
                        </PriceInfo>
                    </DogeInfo>
                    <OwnerInfo>
                        <Text>Owner</Text>
                        <Text>{ownerAddress}</Text>
                    </OwnerInfo>
                </CardFooter>
            </Card>
        </div>
    )
}

export default MarketCard;