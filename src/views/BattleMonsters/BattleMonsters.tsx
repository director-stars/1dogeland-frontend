import React, { useContext, useRef, useEffect, useState, useCallback } from 'react'
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
  column-gap: 20px;
`
const MyDoges = styled.div`
  text-align: center;
  overflow: hidden;
  align-content: center;
  margin-bottom: 20px;
`
const Monsters = styled.div`
  text-align: center;
`
const DogeItem = styled.div`
  max-width: 23.5%;
  padding: 16px;
  margin: auto;
`

const BattleMonsters: React.FC<BattleMonstersProps> = (props) => {
  const { url, title } = props
  const [activeDogeId, setActiveDogeId] = useState();
  const chevronWidth = 40;
  const monsters = useMonsters();
  const doges = useDoges();
  // console.log('doges', doges)
  // 
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => (
        <DogeItem>
          <DogeCard 
            // imgUrl={process.env.REACT_APP_API_URL+doge.asset.url}
            imgUrl={doge.asset}
            name={doge.name}
            rare={doge.rare}
            level={doge.level}
            exp={doge.exp}
            tribe={doge.tribe}
            id={doge.id}
            activeDoge={activeDogeId}
            setActiveDoge={setActiveDogeId}
          />
        </DogeItem>
      ))
    }
    ,
    [activeDogeId],
  )
  const monsterList = useCallback(
    (monstersToDisplay, removed: boolean) => {
      return monstersToDisplay.map((monster) => (
        <div style={{ padding: "16px"}}>
          <MonsterCard 
            // imgUrl={process.env.REACT_APP_API_URL+monster.asset.url}
            imgUrl={monster.asset}
            name={monster.name}
            health={monster.HP}
            successRate={monster.Success_Rate}
            tokenReward={monster.Token_Reward}
            expReward={monster.Exp_Reward}
            activeDoge={activeDogeId}
          />
        </div>
      ))
    }
    ,
    [activeDogeId],
  )
  useEffect(() => {
    if(!(doges.length === 0) && (!activeDogeId))
      setActiveDogeId(doges[0].id)
  }, [activeDogeId, doges])
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
      {(doges.length)?(
        <MyDoges>
        <Heading as="h3" size="xl" mb="24px" color="contrast">
            Choose A Doge
        </Heading>
        <Carousel>
          {dogeList(doges, true)}
        </Carousel>
        <Button size="sm" variant="success">
          Selected DogeID: #{activeDogeId}
        </Button>
        </MyDoges>
      ):(<div />)}
      <Monsters>
        <Heading as="h3" size="xl" mb="24px" color="contrast">
          Choose A Monster
        </Heading>
        <FlexLayout>
          {monsterList(monsters, true)}
        </FlexLayout>
      </Monsters>
    </Page>
  )
}

export default BattleMonsters