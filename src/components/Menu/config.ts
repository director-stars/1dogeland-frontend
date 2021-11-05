import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap-libs/uikit'

const config: MenuItemsType[] = [
  {
    label: 'Starter Doges',
    icon: 'Home',
    href: '/',
  },
  {
    label: 'Marketplace',
    icon: 'Trade',
    href: '/marketplace',
  },
  {
    label: 'My 1Doge Army',
    icon: 'Doge',
    href: '/my-doge',
  },
  {
    label: 'Battle Monsters',
    icon: 'Battle',
    href: '/battle-monsters',
  },
  {
    label: 'AutoPlay',
    icon: 'Stone',
    href: '/auto-play',
  },
  {
    href: "#",
    label: 'More',
    icon: 'More',
    items: [
      {
        label: 'Battle Bosses',
        href: '/battle-bosses',
        type: DropdownMenuItemType.INTERNAL_LINK,
      },
      {
        label: 'Referrals',
        href: '/referrals',
        type: DropdownMenuItemType.INTERNAL_LINK,
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
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
