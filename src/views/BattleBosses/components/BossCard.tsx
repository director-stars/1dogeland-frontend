import React from 'react'
import { Heading, Text, BaseLayout, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'

interface BossCardProps {
    imgUrl: string
    name: string
    price: string
    owner: string
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
const BossCard: React.FC<BossCardProps> = ({imgUrl, name, price, owner}) => {
    const owner1 = '0x67926b0C4753c42b31289C035F8A656D800cD9e7';
    const ownerAddress = `${owner1.substring(0, 4)}...${owner1.substring(owner1.length - 4)}`;
    const fight = () => {
        console.log('fightBoss')
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <Image width={210} height={210} src={imgUrl}/>
                </CardHeader>
                <CardBody>
                    <Button fullWidth size="sm" onClick={() => {
                        fight();
                    }}>Fight</Button>
                </CardBody>
                <CardFooter>
                    <StyledHeading size="lg">{name}</StyledHeading>
                    <BossInfo>
                        <Block><Label>HP:</Label><Text>200HP</Text></Block>
                        <Block><Label>Success Rate:</Label><Text>~90%</Text></Block>
                        <Block><Label>Token Reward:</Label><Text>100 1doge</Text></Block>
                        <Block><Label>EXP Reward:</Label><Text>20 EXP</Text></Block>
                    </BossInfo>
                </CardFooter>
            </Card>
        </div>
    )
}

export default BossCard;