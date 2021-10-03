import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Text, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import CopyToClipboard from './CopyToClipboard'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('${process.env.PUBLIC_URL}/images/cake-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  margin: 50px;
`

const StyledDiv = styled.div`
  text-align: center;
`
const StyledText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: solid 1px;
  color: rgb(255, 255, 255, 0.6);
`

const Block = styled.div`
  background: #27262c;
  padding: 10px 20px;
  display: flex;
  border-radius: 20px;
  column-gap: 10px;
  max-width: 500px;
  margin: auto;
`

interface LinkCardProps {
  header: string
}

const GetReferralLinkCard: React.FC<LinkCardProps> = ({ header}) => {
  const { account, connect, reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])

  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <StyledDiv>
        <Heading size="xl" mb="40px" color="contrast">
          {header}
        </Heading>
        <Block>
          <StyledText>
            {`${window.location.protocol}//${window.location.host}/#?ref=${account}`}
          </StyledText>
          <CopyToClipboard toCopy={`${window.location.protocol}//${window.location.host}/#?ref=${account}`}>
            Copy
          </CopyToClipboard>
        </Block>
    </StyledDiv>
  )
}

export default GetReferralLinkCard
