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
import MarketCard from './components/MarketCard'

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

const Home: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  // const farmsLP = useFarms()
  // const cakePrice = usePriceCakeBusd()
  // const bnbPrice = usePriceBnbBusd()
  // const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  // const {tokenMode} = farmsProps;

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  // useEffect(() => {
  //   if (account) {
  //     dispatch(fetchFarmUserDataAsync(account))
  //   }
  // }, [account, dispatch, fastRefresh])

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
        <FlexLayout>
          <div style={{ width: "500px" }}>
            <MarketCard 
              imgUrl="/images/egg/egg.png"
              name="Random Doge"
              price="9999"
            />
          </div>
        </FlexLayout>
      </div>
    </Page>
  )
}

export default Home
