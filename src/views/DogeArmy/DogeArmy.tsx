import React, { useContext, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import { useDoges } from 'hooks/useDogesLand'
import FlexLayout from 'components/layout/Flex'
import DogeCard from './components/DogeCard'

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

const DogeArmy: React.FC<DogeArmyProps> = (props) => {
  const { url, title } = props
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const doges = useDoges();
  console.log('doges', doges)
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
            id={doge.Doge_ID}
          />
        </DogeItem>
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
            You have
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            {doges.length}
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            doge(s) in your 1doge army!
          </Heading>
        </StyledHead>
        <Text>To start building your 1doge army, buy a doge from the starter doges or from the marketplace.</Text>
      </Hero>
      
      <MyDoges>
        <StyledDiv>
          <Button as="a" href="/#/" size="sm">
            Starter Doges
          </Button>
          <Button as="a" href="/#/marketplace" size="sm">
            Marketplace
          </Button>
        </StyledDiv>
        <FlexLayout>
          {dogeList(doges, true)}
        </FlexLayout>
      </MyDoges>
    </Page>
  )
}

export default DogeArmy