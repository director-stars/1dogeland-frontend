import React, { useEffect, useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFillOrder, useDogeBalance } from 'hooks/useDogesLand'
import { classes, tribes } from 'hooks/useDogeInfo'
import { useCryptoDogeNFTAllowance } from 'hooks/useAllowance'
import { useCryptoDogeNFTApprove } from 'hooks/useApprove'

interface MartketCardProps {
    id: string
    classInfo: string
    price: string
    owner: string
    level: string
    rare: string
    exp: string
    tribe: string
}

const StyledHeading = styled(Heading)`
    text-align: center;
    text-transform: capitalize;
`
const DogeInfo = styled.div`
    display: flex;
    justify-content: space-between;
`
const PriceInfo = styled.div`
    display: flex;
`
const TokenIcon = styled(Image)`
    width: 24px;
`
const OwnerInfo = styled.div`
    display: flex;
    justify-content: space-between;
`
const StyledImage = styled.div<{
    imgUrl?: string
}>`
    width:100%;
    min-height: 260px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    background-position: center;
`
const DogeInfoItem = styled.div`
    display: flex;
    & ${Text}:first-child{
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
const MarketCard: React.FC<MartketCardProps> = ({id, classInfo, price, owner, level, exp, rare, tribe}) => {
    const price1 = new BigNumber(price).div(new BigNumber(10).pow(18)).toString()
    const ownerAddress = `${owner.substring(0, 4)}...${owner.substring(owner.length - 4)}`;
    let dogeImage;
    let dogeName;
    if(classInfo){
        dogeImage = classes[parseInt(rare) - 1][classInfo].asset;
        dogeName = classes[parseInt(rare) - 1][classInfo].name;
    }
    else{
        dogeImage = "warm.gif";
        dogeName = "Doge";
    }
    
    const tribeName = tribes[tribe].name;
    const [oneDogeBalance, setOneDogeBalance] = useState(parseInt(window.localStorage.getItem("oneDogeBalance")) / 10**18);
    const [dogeNFTBalance, setDogeNFTBalance] = useState(parseInt(window.localStorage.getItem("dogeNFTBalance")));
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    const [pendingTx, setPendingTx] = useState(false)

    const { onFillOrder } = useFillOrder();

    const handleFillOrder = useCallback(async (dogeId) => {
        try {
            setPendingTx(true)
          const txHash = await onFillOrder(dogeId)
          // user rejected tx or didn't go thru
          if (!txHash) {
            setPendingTx(false)
          }
          // onPresentApprove()
        } catch (e) {
          console.error(e)
        }
      }, [onFillOrder])

      const { onGetDogeBalance } = useDogeBalance()
      const handleGetDogeBalance = useCallback(async () => {
        try {
          await onGetDogeBalance()
          setOneDogeBalance(parseInt(window.localStorage.getItem("oneDogeBalance")) / 10**18);
          setDogeNFTBalance(parseInt(window.localStorage.getItem("dogeNFTBalance")));
        } catch (e) {
          console.error(e)
        }
      }, [onGetDogeBalance])

    const { onPresentConnectModal } = useWalletModal(connect, reset)

    const [requestedApproval, setRequestedApproval] = useState(false)
    const allowance = useCryptoDogeNFTAllowance()
    const { onApprove } = useCryptoDogeNFTApprove()
    const handleApprove = useCallback(async () => {
        try {
          setRequestedApproval(true)
          const txHash = await onApprove()
          // user rejected tx or didn't go thru
          if (!txHash) {
            setRequestedApproval(false)
          }
          // onPresentApprove()
        } catch (e) {
          console.error(e)
        }
      }, [onApprove])
      const renderDogeCardButtons = () => {
        if (!allowance.toNumber()) {
          return (
            <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
              Approve
            </Button>
          )
        }
        if(!oneDogeBalance){
            return (
                <Button fullWidth disabled size="sm">
                  Not enough 1doge
                </Button>
            ) 
        }
        if(dogeNFTBalance > 1){
            return (
                <Button fullWidth disabled size="sm">
                  You have enough Doges
                </Button>
            ) 
        }
        return (
            <Button fullWidth size="sm"
            disabled={pendingTx}
            onClick={async () => {
                setPendingTx(true)
                await handleFillOrder(id)
                await handleGetDogeBalance();
                setPendingTx(false)
            }}>{pendingTx ? 'Pending Buy Doge' : 'Buy Doge'}</Button>
        )
      }

    return (
        <div>
            <Card>
                <Id>#{id}</Id>
                <CardHeader>
                    <StyledImage imgUrl={`/images/doges/${dogeImage}`}/>
                </CardHeader>
                <CardBody>
                    {/* {account? (<Button fullWidth size="sm" onClick={async () => {
                        setPendingTx(true)
                        handleFillOrder(id);
                        setPendingTx(false)
                    }}>{pendingTx ? 'Pending Buy Doge' : 'Buy Doge'}</Button>)
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)} */}
                    {account? (renderDogeCardButtons())
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                </CardBody>
                <CardFooter>
                    <StyledHeading size="lg">{dogeName}</StyledHeading>
                    <DogeInfo>
                        <DogeInfoItem>
                            <Text>Rare : </Text>
                            <Text>{rare}</Text>
                        </DogeInfoItem>
                        <DogeInfoItem>
                            <Text>Level :</Text>
                            <Text>{level} / {exp} exp</Text>
                        </DogeInfoItem>
                    </DogeInfo>
                    <DogeInfo>
                        <DogeInfoItem>
                            <Text>Tribe :</Text>
                            <Text>{tribeName}</Text>
                        </DogeInfoItem>
                        <DogeInfoItem>
                            <Text>Price</Text>
                            <PriceInfo>
                                <TokenIcon width={24} height={24} src="/images/egg/9.png"/>
                                <Text>{price1}</Text>
                            </PriceInfo>
                        </DogeInfoItem>
                    </DogeInfo>
                    <OwnerInfo>
                        <Text>Owner</Text>
                        <Text>{ownerAddress}</Text>
                    </OwnerInfo>
                </CardFooter>
            </Card>
        </div>
    )
}

export default MarketCard;