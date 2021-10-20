import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import { useMonsters, useMyFightDoges, useMyStone, useClaimReward } from 'hooks/useDogesLand'
import FlexLayout from 'components/layout/Flex'
import DogeCard from './components/DogeCard'
import StoneCard from './components/StoneCard'
import MonsterCard from './components/MonsterCard'

interface AutoPlayProps {
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
  // margin-bottom: 32px;
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
`
const Monsters = styled.div`
  text-align: center;
`
const StyledFlexLayout = styled(FlexLayout)`
  & > * {
    min-width: 280px;
    max-width: 20%;
    margin: 0 2%;
    margin-bottom: 20px;
  }
`
const StyledDiv = styled.div`
  column-gap: 20px;
  display: inline-flex;
  margin-bottom: 20px;
`

const Row = styled.div`
  margin-bottom: 32px;

  & > button + button {
    margin-left: 16px;
  }
`;

const StyledHeading = styled(Heading)`
  letter-spacing: 2px;
  text-align: center;
  font-weight: 400px;
`

const AutoPlay: React.FC<AutoPlayProps> = (props) => {
  const { url, title } = props
  const chevronWidth = 40;
  const stones = useMyStone();
  const stoneSize = stones.length;
  const monsters = useMonsters();
  const [activeMonsterId, setActiveMonsterId] = useState('');
  const [magicStoneNFTBalance, setMagicStoneNFTBalance] = useState(parseInt(window.localStorage.getItem("magicStoneNFTBalance")));
  const [activeStoneId, setActiveStoneId] = useState(0);
  let availableStone = 0;
  let availableStoneId = 0;
  // console.log(stones)
  for(let i = 0; i < stoneSize; i ++){
    // setActiveStoneId(0);
    if(stones[i]._dogeId === "0") {
      availableStone ++;
      availableStoneId = stones[i]._tokenId;
      // setActiveStoneId(stones[i]._tokenId);
    }
  }
  if(availableStone !== 0 && availableStoneId !== activeStoneId)
    setActiveStoneId(availableStoneId);
  useEffect(() => {
    if(stoneSize !== 0){
      setMagicStoneNFTBalance(availableStone);
      window.localStorage.setItem("magicStoneNFTBalance", availableStone.toString())
    }
  }, [ availableStone, stoneSize ])



  let doges = useMyFightDoges();
  if(doges === undefined) doges = [];
  const monsterList = useCallback(
    (monstersToDisplay, removed: boolean) => {
      return monstersToDisplay.map((monster) => (
        <MonsterCard 
            id={monster.id}
            health={monster._hp}
            successRate={monster._successRate}
            rewardTokenFrom={monster._rewardTokenFrom}
            rewardTokenTo={monster._rewardTokenTo}
            rewardExpFrom={monster._rewardExpFrom}
            rewardExpTo={monster._rewardExpTo}
            activeMonster={activeMonsterId}
            setActiveMonster={setActiveMonsterId}
          />
      ))
    },
    [activeMonsterId]
  )
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => (
        <DogeCard
          id={doge._tokenId}
          classInfo={doge._classInfo}
          price={doge._salePrice}
          owner={doge._owner}
          level={doge._level}
          rare={doge._rare}
          exp={doge._exp}
          tribe={doge._tribe}
          stoneInfo={doge._stoneInfo}
          activeMonster={activeMonsterId}
          setActiveMonster={setActiveMonsterId}
          magicStoneNFTBalance={magicStoneNFTBalance}
          setMagicStoneNFTBalance={setMagicStoneNFTBalance}
          activeStoneId={activeStoneId}
        />
      ))
    },
    [activeMonsterId, magicStoneNFTBalance, activeStoneId, setMagicStoneNFTBalance],
  )
  return (
    <Page>
      {/* <Hero>
        <StyledHead>
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            Auto
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            Play
          </Heading>
        </StyledHead>
      </Hero>
      <FlexLayout>
        <StoneCard magicStoneNFTBalance={magicStoneNFTBalance}/>
      </FlexLayout>
      <Monsters>
        <StyledFlexLayout>
          {(typeof monsters === typeof [])?monsterList(monsters, true):(<></>)}
        </StyledFlexLayout>
      </Monsters>
      <MyDoges>
        {(typeof doges === typeof [])?dogeList(doges, true):(<></>)}
      </MyDoges> */}
      <Hero>
        <StyledHead>
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            Coming
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            Soon
          </Heading>
        </StyledHead>
      </Hero>
      <StyledHeading as="h3" size="xl" mb="24px" color="contrast">
        With Autoplay mode , your Doges can Battle Monsters while you’re away or asleep. All you need to get started is a magic stone
      </StyledHeading>
    </Page>
  )
}

export default AutoPlay