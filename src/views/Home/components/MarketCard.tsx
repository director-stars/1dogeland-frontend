import React from 'react'
import { Heading, Text, BaseLayout, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'

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
    return (
        <div>
            <Card>
                <CardHeader>
                    <Image width={210} height={210} src={imgUrl}/>
                </CardHeader>
                <CardBody>
                    <Button fullWidth size="sm" onClick={() => {
                        buyDoge();
                    }}>Buy Doge</Button>
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