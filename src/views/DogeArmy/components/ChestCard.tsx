import React, { useEffect, useCallback, useState } from 'react'
import { Heading, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useOpenChest } from 'hooks/useDogesLand'
import { tribes } from 'hooks/useDogeInfo'

interface ChestCardProps {
    id: string
    tribe: string
}

const StyledImage = styled.div<{
    imgUrl?: string
}>`
    width:100%;
    min-height: 260px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    background-position: center;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    text-transform: capitalize;
`
const StyledCardHeader = styled(CardHeader)`
    padding: 0px;
`
const DogeInfo = styled.div`
    display: flex;
    justify-content: space-between;
    & * {
        display: flex;
        margin-right: 10px;
    }
`

const Id = styled.div`
    position: absolute;
    background: linear-gradient(-45deg,#e8c456,#aa8929,#fdd325);
    animation: dogeid 3s ease infinite;
    padding: 5px 10px;
    font-weight: 400;
    min-width: 80px;
    font-size: 1rem;
    border-radius: 10rem;
    margin: 10px;
`
const ChestCard: React.FC<ChestCardProps> = ({id, tribe}) => {
    const { account, connect, reset } = useWallet()
    const tribeName = tribes[tribe].name;
    const tribeAsset = tribes[tribe].asset;
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    // const [requestedApproval, setRequestedApproval] = useState(false)
    // const allowance = useCreateCryptoDogeAllowance()
    // const { onApprove } = useCreateCryptoDogeApprove()
    const [pendingTx, setPendingTx] = useState(false)

    // const handleApprove = useCallback(async () => {
    //     try {
    //       setRequestedApproval(true)
    //       const txHash = await onApprove()
    //       // user rejected tx or didn't go thru
    //       if (!txHash) {
    //         setRequestedApproval(false)
    //       }
    //       // onPresentApprove()
    //     } catch (e) {
    //       console.error(e)
    //     }
    // }, [onApprove])
    const { onPresentConnectModal } = useWalletModal(connect, reset)

    const { onOpenChest } = useOpenChest()

    const handleOpenChest = useCallback(async () => {
        try {
            setPendingTx(true)
          const txHash = await onOpenChest(id)
          // user rejected tx or didn't go thru
          if (!txHash) {
            setPendingTx(false)
          }
          // onPresentApprove()
        } catch (e) {
          console.error(e)
        }
    }, [onOpenChest, id])

    const renderDogeCardButtons = () => {
        // if (!allowance.toNumber()) {
        //   return (
        //     <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
        //       Approve 1Doge
        //     </Button>
        //   )
        // }
        return (
            <Button fullWidth size="sm"
            disabled={pendingTx}
            onClick={handleOpenChest}>{pendingTx ? 'Pending Open Chest' : 'Open Chest'}</Button>
        )
      }

    return (
        <div>
            <Card>
                <Id>#{id}</Id>
                <StyledCardHeader>
                    <StyledImage imgUrl={`/images/chests/${tribeAsset}`}/>
                </StyledCardHeader>
                <CardBody>
                    <StyledHeading size="lg" color="primary">{tribeName}</StyledHeading>
                </CardBody>
                <CardFooter>
                    <DogeInfo>
                        {account? (renderDogeCardButtons())
                        : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                    </DogeInfo>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ChestCard;