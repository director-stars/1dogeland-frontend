import React, { useEffect, useCallback, useState } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, CardRibbon, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
// import { useCreateCryptoDogeAllowance } from 'hooks/useAllowance'
// import { useCreateCryptoDogeApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface StoneCardProps {
    magicStoneNFTBalance: number
}

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
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledCardBody = styled(CardBody)`
    display: flex;
    column-gap: 20px;
`

const StyledCard = styled(Card)`
    min-width: 400px;
`
const StoneCard: React.FC<StoneCardProps> = ({magicStoneNFTBalance}) => {
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    return (
        <StyledCard ribbon={<CardRibbon text="Magic Stone" />}>
            <StyledCardBody>
                <StyledImage imgUrl="/images/stones/water.gif"/>
                <StyledHeading size="lg" color="primary">{magicStoneNFTBalance} available stone(s)</StyledHeading>
            </StyledCardBody>
        </StyledCard>
    )
}

export default StoneCard;