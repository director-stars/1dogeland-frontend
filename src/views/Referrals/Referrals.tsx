import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { BaseLayout, Heading, useWalletModal, Button, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import useTheme from 'hooks/useTheme'
import FlexLayout from 'components/layout/Flex'
import GetReferralLinkCard from './components/GetReferralLinkCard'

const Newcards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  grid-gap: 24px;
  text-align: center;

  & > div {
    grid-column: span 12;
    width: 100%;
  }
`
const StyledHead = styled.div`
  background: rgba(0,0,0,.5);
  border-radius: 50px;
`

const Hero = styled.div`
  padding: 50px 0px 48px 32px;
  margin: 0 auto;
  // max-width: 1200px;
  border: none;
`

const Banner = styled.div`
  align-items: center;
  background-image: url('${process.env.PUBLIC_URL}/images/pan-bg-mobile.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('${process.env.PUBLIC_URL}/images/pet.gif'), url('${process.env.PUBLIC_URL}/images/enemy.gif');
    background-position: left center, right center;
    height: 202px;
    padding-top: 0;
  }
`

const Title = styled(Heading).attrs({
  as: 'h1',
  scale: 'xl',
})`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  line-height: 1.4;
`

const Description = styled(Heading).attrs({
  as: 'h2',
  scale: 'md',
  color: 'textSubtle',
})`
  font-weight: 300;
  line-height: 1.4;
`
const StyledCard = styled.div`
  // max-width: 500px;
  margin: 50px auto;
`
const StyledBody = styled.div`
  text-align:center;
  margin-top: 30px;
`
const Referrals: React.FC = () => {
  const { account, connect, reset } = useWallet()
  const { theme } = useTheme()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <>
      <Page>
        <StyledHead>
          <Hero>
            <Banner>
              <Heading as="h1" size="xl" mb="24px" color="primary">
                Invite Your Friends. Earn Reward Together.
              </Heading>
              <Text fontSize="26px" color="rgb(255,255,255, 0.6)">Earn 10% reward from your friends first Doge buy</Text>
            </Banner>
          </Hero>
        </StyledHead>
        <StyledBody>
          <Heading size="xl" mb="40px" color="contrast">
            Invite your friends to 1DogeLand
          </Heading>
          {account ? (
            <>
              <StyledCard>
                <GetReferralLinkCard />
              </StyledCard>
            </>
          ) : (
            <FlexLayout>
              <Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>
            </FlexLayout>
          )}
        </StyledBody>
      </Page>
    </>
  )
}

export default Referrals
