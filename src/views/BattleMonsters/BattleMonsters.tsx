import React, { useContext, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import Carousel from 'components/Carousel'
import { Button, Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import { useMonsters, useDoges } from 'hooks/useDogesLand'
import FlexLayout from 'components/layout/Flex'
import DogeCard from './components/DogeCard'
import MonsterCard from './components/MonsterCard'

interface BattleMonstersProps {
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
const Monsters = styled.div`
  text-align: center;
`
const DogeItem = styled.div`
  max-width: 250px;
  margin: auto;
`

const BattleMonsters: React.FC<BattleMonstersProps> = (props) => {
  const { url, title } = props
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const monsters = useMonsters();
  const doges = useDoges();
  console.log('doges', doges)
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
  const monsterList = useCallback(
    (monstersToDisplay, removed: boolean) => {
      return monstersToDisplay.map((monster) => (
        <div style={{ padding: "32px", width: "500px" }}>
          <MonsterCard 
            imgUrl={process.env.REACT_APP_API_URL+monster.asset.url}
            name={monster.name}
            health={monster.HP}
            successRate={monster.Success_Rate}
            tokenReward={monster.Token_Reward}
            expReward={monster.Exp_Reward}
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
            Battle
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            Monsters
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
      <Monsters>
        <Text fontSize="24px" color="contrast">
          Choose A Monster
        </Text>
        <FlexLayout>
          {monsterList(monsters, true)}
        </FlexLayout>
      </Monsters>
    </Page>
  )
}

export default BattleMonsters