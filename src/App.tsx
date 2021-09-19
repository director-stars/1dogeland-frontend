import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import styled from 'styled-components'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const BattleMonsters = lazy(() => import('./views/BattleMonsters'))
const BattleBosses = lazy(() => import('./views/BattleBosses'))
const DogeArmy = lazy(() => import('./views/DogeArmy'))
const MarketPlace = lazy(() => import('./views/MarketPlace'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Pools = lazy(() => import('./views/Pools'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  // useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            {/* <Route path="/marketplace">
              <MarketPlace />
            </Route> */}
            <Route path="/my-doge">
              <DogeArmy />
            </Route>
            <Route path="/battle-monsters">
             <BattleMonsters />
            </Route>
            {/* <Route path="/battle-bosses">
             <BattleBosses />
            </Route> */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      {/* <NftGlobalNotification /> */}
    </Router>
  )
}

export default React.memo(App)
