import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import formatLotteryDate from '../helpers/formatLotteryDate'

const Wrapper = styled.div`
  // position: absolute;
  // top: 0;
  // right: 0;
  margin:0px 5px;
`

const Timestamp = ({ timeValue }) => {
  const { hours, minutes } = formatLotteryDate(timeValue)

  return (
    <Wrapper>
      {/* <Text fontSize="14px"> */}
        {(minutes > 0)? hours+1:hours}
      {/* </Text> */}
    </Wrapper>
  )
}

export default Timestamp
