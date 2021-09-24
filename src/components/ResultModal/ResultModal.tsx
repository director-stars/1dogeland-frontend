import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, LinkExternal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
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
    result?: string
    rewardExp?: string
    tx?: string
    error?: boolean
}

const ResultModal: React.FC<ResultModalProps> = ({ onDismiss, title="result", result = '', rewardExp = "0", tx="" , error }) => {
    // const [val, setVal] = useState('');
    // const [pendingTx, setPendingTx] = useState(false)
    // console.log('result', result)
    const winResult = !result?"Loss":"Win";
    // console.log('winResult', winResult)
    return (
        <Modal title={title} onDismiss={onDismiss}>
          {(!error)?(
          <StyledDiv>
          <div>You {winResult} the fight!</div>
          <div>You got {rewardExp} Exp</div>
          <LinkExternal href={`https://testnet.bscscan.com/tx/${tx}`} external>Check TX</LinkExternal>
          </StyledDiv>
          ):(<StyledDiv>{result}</StyledDiv>)}
          {/* <ModalActions>
            <Button variant="secondary" onClick={onDismiss}>
              Cancel
            </Button>
            <Button
              disabled={pendingTx}
              onClick={async () => {
                setPendingTx(true)
                // await onConfirm(val)
                setPendingTx(false)
                onDismiss()
              }}
            >
              {pendingTx ? 'Pending Confirmation' : 'Confirm'}
            </Button>
          </ModalActions> */}
        </Modal>
      )
}

export default ResultModal