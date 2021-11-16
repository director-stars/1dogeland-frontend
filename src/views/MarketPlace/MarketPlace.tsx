import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import { useSaleDoges } from 'hooks/useDogesLand'
import MarketCard from './components/MarketCard'

const Hero = styled.div`
  align-items: center;
  // background-image: url('/images/egg/3.png');
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
    // background-image: url('/images/egg/3.png'), url('/images/egg/3b.png');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const StyledHead = styled.div`
  display:flex;
  column-gap: 20px;
`

const MarketItem = styled.div`
  max-width: 23.5%;
  padding: 16px;
  margin: auto;
`

const MarketPlace: React.FC = () => {
  const doges = useSaleDoges()
  // console.log(doges)
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => (
        <MarketItem>
          <MarketCard
            id={doge._tokenId}
            classInfo={doge._classInfo}
            price={doge._salePrice}
            owner={doge._owner}
            level={doge._level}
            rare={doge._rare}
            exp={doge._exp}
            tribe={doge._tribe}
          />
        </MarketItem>
      ))
    }
    ,
    [],
  )

  return (
    <Page>
      <Hero>
        <StyledHead>
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            Market
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            Place
          </Heading>
        </StyledHead>
        <Text>Choose your young doge here, then train and build your 1doge army!</Text>
      </Hero>
      <div>
        <FlexLayout>
          {(typeof doges === typeof [])?dogeList(doges, true):(<div />)}
        </FlexLayout>
      </div>
    </Page>
  )
}

export default MarketPlace
