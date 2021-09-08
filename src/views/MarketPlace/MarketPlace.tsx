import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Heading, Text, BaseLayout} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
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
`

const MarketPlace: React.FC = () => {
  const farmsLP = useFarms()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  // const {tokenMode} = farmsProps;

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      return farmsToDisplay.map((farm) => (
        <div style={{ padding: "32px", width: "500px" }}>
          <MarketCard 
            imgUrl="header"
            name="name"
            price="price"
            owner="owner"
          />
        </div>
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
          {farmsList(farmsLP, true)}
        </FlexLayout>
      </div>
    </Page>
  )
}

export default MarketPlace
