import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, LinkExternal, Text } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import { useOrderCryptoDoge } from 'hooks/useDogesLand'
import TicketInput from 'components/TicketInput'
import styled from 'styled-components'

const StyledDiv = styled.div`
  color: #fff;
  font-size: 18px;
  // text-align: center;
  line-height: 22px;
  & a {
    width: 100%;
    justify-content: center;
  }
  max-width: 500px;
`
const SellInfo = styled.div`
  color: #fff;
  font-size: 18px;
  margin-top: 20px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
const InputField = styled.div`
  display: grid;
  max-width: 300px;
`
const StyledText = styled.div`
  font-size: 14px;
  text-align: right;
  line-height: 16px;
  margin-top: 20px;
  max-width: 200px;
  margin-left: auto;
`
interface ResultModalProps {
    title?: string
    onDismiss?: () => void
    id?: string
}

const OrderModal: React.FC<ResultModalProps> = ({ onDismiss, title="result", id = '' }) => {
    const [val, setVal] = useState('');
    const [receiveTokenAmount, setReceiveTokenAmount] = useState(0);
    const [pendingTx, setPendingTx] = useState(false)
    const { onOrderDoge } = useOrderCryptoDoge()
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
      setReceiveTokenAmount(Math.round(parseInt(e.currentTarget.value)*0.95*100)/100);
    }
    
    return (
        <Modal title={title} onDismiss={onDismiss}>
          <StyledDiv>
            Your asset will be listed on the Marketplace with this price. In order to get it back, you&apos;ll have to cancel the sale.
          </StyledDiv>
          <SellInfo>
            Sell at
            <InputField>
              <TicketInput
                value={val}
                onChange={handleChange}
                max='0'
                symbol="1DOGE"
                availableSymbol="1Doge"
              />
              <StyledText>You&apos;ll receive ~{receiveTokenAmount} 1DOGE after subtracting a 5% fee.</StyledText>
            </InputField>
          </SellInfo>
          <Button fullWidth
            disabled={pendingTx}
            onClick={async () => {
              setPendingTx(true)
              const txHash = await onOrderDoge(id, val)
              setPendingTx(false)
              onDismiss()
            }}
          >
            {pendingTx ? 'Pending Confirmation' : 'Confirm'}
          </Button>
        </Modal>
      )
}

export default OrderModal