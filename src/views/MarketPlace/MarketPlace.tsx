import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
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

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
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
