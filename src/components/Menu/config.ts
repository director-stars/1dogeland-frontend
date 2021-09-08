import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
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
    href: '/my-1doge',
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
    label: 'Help',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Buy 1doge',
        href: 'https://github.com/goosedefi/',
      },
      {
        label: 'How to Play',
        href: 'https://docs.1doge.io/',
      }
    ],
  }
]

export default config
