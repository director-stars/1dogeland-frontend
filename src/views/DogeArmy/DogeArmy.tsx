import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Text, ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import { useMySaleDoges, useMyUnSaleDoges } from 'hooks/useDogesLand'
import FlexLayout from 'components/layout/Flex'
import DogeCard from './components/DogeCard'
import ChestCard from './components/ChestCard'

interface DogeArmyProps {
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
`
const Monsters = styled.div`
  text-align: center;
`
const DogeItem = styled.div`
  max-width: 23.5%;
  padding: 16px;
  margin: auto;
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

const DogeArmy: React.FC<DogeArmyProps> = (props) => {
  const { url, title } = props
  const [isSaleDoges, setIsSaleDoges] = useState(true);
  const [isUnSaleDoges, setIsUnSaleDoges] = useState(true);
  const chevronWidth = 40;
  let saleDoges = useMySaleDoges();
  // console.log('saleDoges', saleDoges)
  if(saleDoges === undefined) saleDoges = [];
  // console.log('saleDoges',saleDoges)
  let unSaleDoges = useMyUnSaleDoges();
  if(unSaleDoges === undefined) unSaleDoges = [];
  // console.log('unSaleDoges', unSaleDoges)
  // console.log('doges', doges)
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => (
        <DogeItem>
          {(doge._rare !== "0")?(
          <DogeCard
            id={doge._tokenId}
            classInfo={doge._classInfo}
            price={doge._salePrice}
            owner={doge._owner}
            level={doge._level}
            rare={doge._rare}
            exp={doge._exp}
            tribe={doge._tribe}
          />
          ):(
          <ChestCard 
            id={doge._tokenId}
            tribe={doge._tribe}
          />
          )}
        </DogeItem>
      ))
    },
    [],
  )
  const [index, setIndex] = useState(0);
  const handleClick = (newIndex) => {
    setIndex(newIndex)
    switch(newIndex){
      case 0:
        setIsSaleDoges(true);
        setIsUnSaleDoges(true);
        break;
      case 1:
        setIsSaleDoges(false);
        setIsUnSaleDoges(true);
        break;
      case 2:
        setIsSaleDoges(true);
        setIsUnSaleDoges(false);
        break;
      default:
        setIsSaleDoges(true);
        setIsUnSaleDoges(true);
        break;
    }
  };
  return (
    <Page>
      <Hero>
        <StyledHead>
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            You have
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            {saleDoges.length + unSaleDoges.length}
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            doge(s) in your 1doge army!
          </Heading>
        </StyledHead>
        <Text>To start building your 1doge army, buy a doge from the starter doges or from the marketplace.</Text>
      </Hero>
      
      <MyDoges>
        <Row>
          <ButtonMenu size="sm" activeIndex={index} onClick={handleClick}>
            <ButtonMenuItem>ALL</ButtonMenuItem>
            <ButtonMenuItem>Available</ButtonMenuItem>
            <ButtonMenuItem>In Order</ButtonMenuItem>
          </ButtonMenu>
        </Row>
        <FlexLayout>
        {((typeof saleDoges === typeof []) && isSaleDoges)?dogeList(saleDoges, true):(<></>)}
        {((typeof unSaleDoges === typeof []) && isUnSaleDoges)?dogeList(unSaleDoges, true):(<></>)}
        </FlexLayout>
      </MyDoges>
    </Page>
  )
}

export default DogeArmy