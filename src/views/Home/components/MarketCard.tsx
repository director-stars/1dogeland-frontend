import React, { useEffect, useCallback, useState } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
// import { useFetchPublicData } from 'state/hooks'
// import { useWallet } from '@binance-chain/bsc-use-wallet'
// import { useBuyCryptoDoge } from 'hooks/useDogesLand'
import MarketCardActions from './MarketCardActions'

interface MartketCardProps {
    imgUrl: string
    name: string
    price: string
}

const StyledHeading = styled(Heading)`
    text-align: center;
    margin-bottom: 20px;
`
const DogeInfo = styled.div`
    display: flex;
    justify-content: space-between;
`
const PriceInfo = styled.div`
    display: flex;
    justify-content: space-between;
`
const TokenIcon = styled(Image)`
    width: 24px;

`
const OwnerInfo = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledImage =  styled(Image)`
    margin: auto;
`
const MarketCard: React.FC<MartketCardProps> = ({imgUrl, name, price}) => {
    // const owner1 = '0x67926b0C4753c42b31289C035F8A656D800cD9e7';
    // const ownerAddress = `${owner1.substring(0, 4)}...${owner1.substring(owner1.length - 4)}`;

    // const { account, connect, reset } = useWallet()
    // useEffect(() => {
    //     if (!account && window.localStorage.getItem('accountStatus')) {
    //     connect('injected')
    //     }
    // }, [account, connect])
    
    // useFetchPublicData()

    // const { onPresentConnectModal } = useWalletModal(connect, reset)
    // const [pendingTx, setPendingTx] = useState(false)
    // const [, setRequestedBuy] = useState(false)
    // const { onBuyDoge } = useBuyCryptoDoge()
    // const handleBuy = useCallback(async () => {
    //     try {
    //       setRequestedBuy(true)
    //       // @ts-ignore
    //       // eslint-disable-next-line prefer-spread
    //     //   const numbers = Array.apply(null, { length }).map(() => [
    //     //     Math.floor(Math.random() * maxNumber) + 1,
    //     //     Math.floor(Math.random() * maxNumber) + 1,
    //     //     Math.floor(Math.random() * maxNumber) + 1,
    //     //     Math.floor(Math.random() * maxNumber) + 1,
    //     //   ])
    //       const txHash = await onBuyDoge()
    //       // user rejected tx or didn't go thru
    //       if (txHash) {
    //         setRequestedBuy(false)
    //       }
    //     } catch (e) {
    //       console.error(e)
    //     }
    // }, [onBuyDoge, setRequestedBuy])

    return (
        <div>
            <Card>
                <CardHeader>
                    <StyledImage width={210} height={210} src={imgUrl}/>
                </CardHeader>
                <CardBody>
                    <StyledHeading size="lg">{name}</StyledHeading>
                    <DogeInfo>
                        <Text>Price</Text>
                        <PriceInfo>
                            <TokenIcon width={24} height={24} src="/images/egg/9.png"/>
                            <Text>{price}</Text>
                        </PriceInfo>
                    </DogeInfo>
                    <OwnerInfo>
                        <Text>Payment</Text>
                        <Text>1Doge</Text>
                    </OwnerInfo>
                </CardBody>
                <CardFooter>
                    <MarketCardActions />
                </CardFooter>
            </Card>
        </div>
    )
}

export default MarketCard;