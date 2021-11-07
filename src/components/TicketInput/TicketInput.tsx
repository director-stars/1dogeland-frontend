import React from 'react'
import styled from 'styled-components'
import { Image } from '@pancakeswap-libs/uikit'
import Input, { InputProps } from '../Input'

const TokenIcon = styled(Image)`
    width: 24px;
`

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  availableSymbol: string
  onSelectMax?: () => void
}

const TicketInput: React.FC<TokenInputProps> = ({ max, symbol, availableSymbol, onChange, value }) => {

  return (
    <StyledTokenInput>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <div>
              <TokenIcon width={24} height={24} src="/images/egg/9.png"/>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="100, 000"
        value={value}
      />
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``


const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

export default TicketInput
