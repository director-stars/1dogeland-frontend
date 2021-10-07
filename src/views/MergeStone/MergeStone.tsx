import React, { useContext, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import { useMonsters, useMyFightDoges, useRewardTokenInfo, useClaimReward } from 'hooks/useDogesLand'
import FlexLayout from 'components/layout/Flex'
import DogeCard from './components/DogeCard'
import StoneCard from './components/StoneCard'
import MonsterCard from './components/MonsterCard'

interface MergeStoneProps {
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

const MergeStone: React.FC<MergeStoneProps> = (props) => {
  const { url, title } = props
  // const [isSaleDoges, setIsSaleDoges] = useState(true);
  // const [isUnSaleDoges, setIsUnSaleDoges] = useState(true);
  const chevronWidth = 40;
  // let saleDoges = useMySaleDoges();
  // if(saleDoges === undefined) saleDoges = [];
  // console.log('saleDoges',saleDoges)
  const monsters = useMonsters();
  const [activeMonsterId, setActiveMonsterId] = useState('');
  const [magicStoneNFTBalance, setMagicStoneNFTBalance] = useState(parseInt(window.localStorage.getItem("magicStoneNFTBalance")));
  let doges = useMyFightDoges();
  if(doges === undefined) doges = [];
  // console.log('unSaleDoges', unSaleDoges)
  // console.log('doges', doges)
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
        />
      ))
    },
    [activeMonsterId, magicStoneNFTBalance, setMagicStoneNFTBalance],
  )
  return (
    <Page>
      <Hero>
        <StyledHead>
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            Merge
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            Stone
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
        {/* <FlexLayout> */}
        {(typeof doges === typeof [])?dogeList(doges, true):(<></>)}
        {/* </FlexLayout> */}
      </MyDoges>
    </Page>
  )
}

export default MergeStone