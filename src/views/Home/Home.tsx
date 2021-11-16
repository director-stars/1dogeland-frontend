import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import ChestCard from './components/ChestCard'
import MagicStoneCard from './components/MagicStoneCard'

const Hero = styled.div`
  align-items: center;
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
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`
const StyledFlexLayout = styled(FlexLayout)`
  column-gap: 100px;
`

const StyledHead = styled.div`
  display:flex;
  column-gap: 20px;
`

const Home: React.FC = () => {
  function validateInputAddresses(address) {
    return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
  }
  const windowUrl = window.location.href;
  // const params = new URLSearchParams(windowUrl);
  if (windowUrl.indexOf("ref=")>=-1)
  {
    const paras=windowUrl.split('=');
    const ref=paras[1];
    if (ref && validateInputAddresses(ref))
    {
      window.localStorage.setItem("referer",ref);
      // console.log( window.localStorage.getItem("referer"));
    }
  }

  // const { onGetDogeBalance } = useDogeBalance()

  return (
    <Page>
      <Hero>
        <StyledHead>
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            Starter
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            Doges
          </Heading>
        </StyledHead>
        <Text>Choose your young doge here, then train and build your 1doge army!</Text>
      </Hero>
      <div>
        <StyledFlexLayout>
            <MagicStoneCard 
              imgUrl="/images/egg/bnb.png"
              name="Magic Stone"
              price="0.2"
            />
            <ChestCard 
              imgUrl="/images/egg/9.png"
              name="Random Doge"
              // price="50000"
              price="0"
            />
        </StyledFlexLayout>
      </div>
    </Page>
  )
}

export default Home
