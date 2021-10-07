import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap-libs/uikit'

const config: MenuItemsType[] = [
  {
    label: 'Starter Doges',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Marketplace',
    icon: 'TradeIcon',
    href: '/marketplace',
  },
  {
    label: 'My 1Doge Army',
    icon: 'FarmIcon',
    href: '/my-doge',
  },
  {
    label: 'Merge Stone',
    icon: 'FarmIcon',
    href: '/merge-stone',
  },
  {
    label: 'Battle Monsters',
    icon: 'PoolIcon',
    href: '/battle-monsters',
  },
  {
    label: 'Battle Bosses',
    icon: 'PoolIcon',
    href: '/battle-bosses',
  },
  {
    label: 'Referrals',
    icon: 'PoolIcon',
    href: '/referrals',
  },
  {
    href: "",
    label: 'Help',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Buy 1doge',
        href: 'https://pancakeswap.finance/swap#/swap?outputCurrency=0x40619dc9F00ea34e51D96b6EC5d8a6aD75457434&inputCurrency=BNB',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'How to Play',
        href: 'https://docs.1doge.io/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      }
    ],
  }
]

export default config
