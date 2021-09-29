import React, { useContext, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import Carousel from 'components/Carousel'
import { Button, Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import { useBattleBosses, useMyFightDoges } from 'hooks/useDogesLand'
import FlexLayout from 'components/layout/Flex'
import BossCard from './components/BossCard'
import DogeCard from './components/DogeCard'

interface BattleBossesProps {
  url?: string
  title?: string
}

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
`
const MyDoges = styled.div`
  text-align: center;
  overflow: hidden;
  align-content: center;
`
const Bosses = styled.div`
  text-align: center;
`
const DogeItem = styled.div`
  max-width: 250px;
  margin: auto;
`
const BossCardDetail = styled.div`

`

const BattleBosses: React.FC<BattleBossesProps> = (props) => {
  const { url, title } = props
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const doges = useMyFightDoges();
  const battleBosses = useBattleBosses();
  console.log('dog_views',doges);
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => (
        <DogeItem>
          <DogeCard 
            imgUrl={process.env.REACT_APP_API_URL+doge.asset.url}
            name="name"
            price="price"
            owner="owner"
          />
        </DogeItem>
      ))
    }
    ,
    [],
  )
  const bossList = useCallback(
    (bossesToDisplay, removed: boolean) => {
      return bossesToDisplay.map((boss) => (
        <div style={{ padding: "32px", width: "500px" }}>
          <BossCard 
            imgUrl={process.env.REACT_APP_API_URL+boss.asset.url}
            id={boss.BossID}
            name={boss.name}
            reward={boss.reward}
            status={boss.status}
            health={boss.health}
          />
          <BossCardDetail>
            <div><span>Start At</span>{boss.starts_at}</div>
            <div><span>Ends At</span>{boss.ends_at}</div>
            <div><span>Boss Health</span>{boss.starts_at}</div>
            <div><span>Boss Battle Fees</span>{boss.battle_fee}</div>
            <div><span>Boss Level</span>{boss.level}</div>
            <div><span>Boss Tier</span>Legendary</div>
          </BossCardDetail>
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
            Battle
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            Bosses
          </Heading>
        </StyledHead>
        <Text>Choose your young doge here, then train and build your 1doge army!</Text>
      </Hero>
      <MyDoges>
        <Text fontSize="24px" color="contrast">
            Choose A Doge
        </Text>
        <Carousel>
          {dogeList(doges, true)}
        </Carousel>
      </MyDoges>
      <Bosses>
        <Text fontSize="24px" color="contrast">
          Choose A Boss
        </Text>
        <FlexLayout>
          {bossList(battleBosses, true)}
        </FlexLayout>
      </Bosses>
    </Page>
  )
}

export default BattleBosses