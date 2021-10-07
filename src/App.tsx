import React, { useEffect, Suspense, lazy } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useDogeBalance } from 'hooks/useDogesLand'
import styled from 'styled-components'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const BattleMonsters = lazy(() => import('./views/BattleMonsters'))
const BattleBosses = lazy(() => import('./views/BattleBosses'))
const DogeArmy = lazy(() => import('./views/DogeArmy'))
const MergeStone = lazy(() => import('./views/MergeStone'))
const MarketPlace = lazy(() => import('./views/MarketPlace'))
const Referrals = lazy(() => import('./views/Referrals'))
const NotFound = lazy(() => import('./views/NotFound'))

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
  useDogeBalance();

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
            <Route path="/marketplace">
              <MarketPlace />
            </Route>
            <Route path="/my-doge">
              <DogeArmy />
            </Route>
            <Route path="/merge-stone">
              <MergeStone />
            </Route>
            <Route path="/battle-monsters">
             <BattleMonsters />
            </Route>
            {/* <Route path="/battle-bosses">
             <BattleBosses />
            </Route> */}
            <Route path="/referrals">
             <Referrals />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      {/* <NftGlobalNotification /> */}
    </Router>
  )
}

export default React.memo(App)
