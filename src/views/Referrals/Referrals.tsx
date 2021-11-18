import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Heading, useWalletModal, Button, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useReferralHistory } from 'hooks/useDogesLand'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import GetReferralLinkCard from './components/GetReferralLinkCard'

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
  background-image: url('${process.env.PUBLIC_URL}/images/pet.gif');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 200px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('${process.env.PUBLIC_URL}/images/pet.gif'), url('${process.env.PUBLIC_URL}/images/enemy.gif');
    background-position: left center, right center;
    height: 202px;
    padding-top: 0;
  }
`

const StyledCard = styled.div`
  // max-width: 500px;
  margin: 50px auto;
`
const StyledBody = styled.div`
  text-align:center;
  margin-top: 30px;
`
const ReferralList = styled.div`
  display:grid;
  background-color: #aa8929;
  margin: auto;
  border-radius: 20px;
  max-width: 800px;
  padding: 10px;
  width: 100%;
`
const ReferralHeader = styled.div`
  display: flex;
  margin: auto;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #E9EAEB;
`
const ReferralInfo = styled.div`
  display: flex;
  margin: auto;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
`
const ReferralAddress = styled.div`
  
`
const ReferralCount = styled.div`
  
`
const Referrals: React.FC = () => {
  const { account, connect, reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const referralHistory = useReferralHistory();
  // console.log(referralHistory.length)
  // referralHistory.forEach((referral) => {
  //   console.log(referral)
  // })
  // const list = Object.keys(referralHistory);
  const referralList = useCallback(
    () => {
      // return <StyledDiv>key</StyledDiv>
      // if(Object.keys(history).length)
      
      const tempList = Object.keys(referralHistory);
      for(let i = 0; i < tempList.length; i ++){
        for(let j = 0; j < tempList.length; j ++){
          if(referralHistory[tempList[i]].length > referralHistory[tempList[j]].length){
            const temp = tempList[i];
            tempList[i] = tempList[j];
            tempList[j] = temp;
          }
        }
      }
      if(tempList.length === 0)
        return <ReferralInfo>There is no referral</ReferralInfo>
      return tempList.map(address => (
        <ReferralInfo>
          <ReferralAddress>{address}</ReferralAddress>
          <ReferralCount>{referralHistory[address].length}</ReferralCount>
        </ReferralInfo>
      ))
    },[referralHistory])
  
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
          <Heading size="xl" mb="40px" color="contrast">
            Referral History this week.
          </Heading>
          <ReferralList>
            <ReferralHeader>
              <ReferralAddress>Referral Address</ReferralAddress>
              <ReferralCount>Invited Friends</ReferralCount>
            </ReferralHeader>
            {referralList()}
          </ReferralList>
        </StyledBody>
      </Page>
    </>
  )
}

export default Referrals
