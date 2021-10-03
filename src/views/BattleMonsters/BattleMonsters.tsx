import React, { useContext, useRef, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Carousel from 'components/Carousel'
import { Button, Heading, Text, Image } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import { useMonsters, useMyFightDoges, useRewardTokenInfo, useClaimReward } from 'hooks/useDogesLand'
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
  min-width: 320px;
  max-width: 23.5%;
  padding: 16px;
  margin: auto;
`
const TokenIcon = styled(Image)`
    width: 30px;

`
const RewardInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
const BattleMonsters: React.FC<BattleMonstersProps> = (props) => {
  const { url, title } = props
  const [activeDogeId, setActiveDogeId] = useState();
  const [activeFightNumber, setActiveFightNumber] = useState();
  const rewardTokenAmount = useRewardTokenInfo();
  const chevronWidth = 40;
  const monsters = useMonsters();
  const doges = useMyFightDoges();
  const [pendingTx, setPendingTx] = useState(false)
  const [, setRequestedClaim] = useState(false)
  const { onClaimReward } = useClaimReward()
  // console.log('doges', doges.length)
  // 
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => 
        (
          <DogeItem>
            <DogeCard 
              classInfo={doge._classInfo}
              rare={doge._rare}
              level={doge._level}
              exp={doge._exp}
              tribe={doge._tribe}
              id={doge._tokenId}
              activeDoge={activeDogeId}
              setActiveDoge={setActiveDogeId}
              farmTime={doge._farmTime}
              fightNumber={doge.fightNumber}
            />
          </DogeItem>
        )
      )
    }
    ,
    [activeDogeId],
  )
  const monsterList = useCallback(
    (monstersToDisplay, removed: boolean) => {
      return monstersToDisplay.map((monster) => (
        <div style={{ padding: "16px"}}>
          <MonsterCard 
            id={monster.id}
            health={monster._hp}
            successRate={monster._successRate}
            rewardTokenFrom={monster._rewardTokenFrom}
            rewardTokenTo={monster._rewardTokenTo}
            rewardExpFrom={monster._rewardExpFrom}
            rewardExpTo={monster._rewardExpTo}
            activeDoge={activeDogeId}
          />
        </div>
      ))
    }
    ,
    [activeDogeId],
  )

  const handleClaimReward = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const claimResult = await onClaimReward()
      console.log('claimResult: ',claimResult);
      if(claimResult){
        setRequestedClaim(false);
      }
      // user rejected tx or didn't go thru
    } catch (e) {
      console.error(e)
    }
  }, [onClaimReward, setRequestedClaim])
  useEffect(() => {
    if(!(doges.length === 0) && (!activeDogeId)){
      // console.log(doges.length)
      for(let i = 0; i< doges.length; i++){
        if(parseInt(doges[i].farmTime)*1000 < Date.now()){
          setActiveDogeId(doges[i].Doge_ID)
          break;
        }
        if(i === doges.length -1){
          setActiveDogeId(null)
        }
      }
    }
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
          {(rewardTokenAmount)&&(parseInt(rewardTokenAmount.toString()) > 0)?(
          <div>
            <RewardInfo>
              <Text fontSize="22px">Pending 1Doge: {parseInt(rewardTokenAmount.toString())/10**18}</Text>
              <TokenIcon width={30} height={30} src="/images/egg/9.png"/>
            </RewardInfo>
            <Button size="sm"
            disabled={pendingTx}
            onClick={async () => {
                setPendingTx(true)
                await handleClaimReward()
                setPendingTx(false)
            }}>{pendingTx ? 'Pending Claim Reward' : 'Claim Reward'}</Button>
          </div>
          ):(<div />)}
          
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