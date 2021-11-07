import React from 'react'
import { Modal, LinkExternal } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'

const StyledDiv = styled.div`
  color: #fff;
  font-size: 22px;
  text-align: center;
  line-height: 30px;
  & a {
    width: 100%;
    justify-content: center;
  }
`
interface ResultModalProps {
    title?: string
    onDismiss?: () => void
    rewardExp?: string
    rewardToken?: string
    tx?: string
    error?: string
    winNumber?: string
    fightNumber?: string
}

const ResultModal: React.FC<ResultModalProps> = ({ onDismiss, title="result", rewardExp = "0", rewardToken="0", tx="" , error="", winNumber="0", fightNumber="0" }) => {
    const winResult = (winNumber === '0')?"lost":"won";
    // console.log('fightNumber', typeof fightNumber, fightNumber)
    // console.log('winNumber', typeof winNumber, winNumber)
    return (
        <Modal title={title} onDismiss={onDismiss}>
          {(error === "")?(
          <StyledDiv>
            {(fightNumber === "1")?(
              <div>You {winResult} the fight!</div>
            ):(
              <div>You won {winNumber} time(s) on {fightNumber} fight(s)!</div>
            )}
          
          <div>You got {rewardToken} 1Doge, {rewardExp} Exp</div>
          <LinkExternal href={`https://bscscan.com/tx/${tx}`} external>Check TX</LinkExternal>
          </StyledDiv>
          ):(<StyledDiv>{error}</StyledDiv>)}
        </Modal>
      )
}

export default ResultModal