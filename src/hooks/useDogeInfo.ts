import { sha256 } from 'js-sha256'

export const getBuyDogeToken = (lastTokenId, account, _classInfo) => {
    const temp = "-STARS-";
    return sha256(lastTokenId+temp+account+temp+_classInfo);
}

export const getDecreaseFNToken = (dogeId, account) => {
    const temp = "_STARS_";
    return sha256(dogeId+temp+account);
}

export const getFillOrderToken = (_tokenId, account) => {
    const temp = "*STARS*";
    return sha256(_tokenId+temp+account);
}

export const getOpenChestToken = (_tokenId, account, _classInfo) => {
    const temp = "-STARS-";
    return sha256(_tokenId+temp+account+temp+_classInfo);
}

export const classes = [
    [
      {asset: "warm.gif", name: "warm"},
      {asset: "electric.gif", name: "electric"},
      {asset: "sky.gif", name: "sky"},
      {asset: "grass.gif", name: "grass"},
      {asset: "dragon.gif", name: "dragon"},
      {asset: "gold.gif", name: "gold"},
      {asset: "tiger.gif", name: "tiger"},
      {asset: "chaos.gif", name: "chaos"},
      {asset: "silver.gif", name: "silver"},
      {asset: "sun.gif", name: "sun"},
      {asset: "bronze.gif", name: "bronze"},
      {asset: "moon.gif", name: "moon"},
      {asset: "ronin.gif", name: "ronin"},
      {asset: "kraken.gif", name: "kraken"},
      {asset: "shield.gif", name: "shield"},
      {asset: "snowball.gif", name: "snowball"},
      {asset: "essence.gif", name: "essence"},
      {asset: "paladin.gif", name: "paladin"},
      {asset: "sinner.gif", name: "sinner"},
      {asset: "berserker.gif", name: "berserker"},
      {asset: "bard.gif", name: "bard"}
    ],
    [
      {asset: "fish.gif", name: "fish"},
      {asset: "rock.gif", name: "rock"},
      {asset: "sword.gif", name: "sword"},
      {asset: "merc.gif", name: "merc"},
      {asset: "rain.gif", name: "rain"},
      {asset: "elder.gif", name: "elder"},
      {asset: "hydro.gif", name: "hydro"},
      {asset: "lancer.gif", name: "lancer"},
    ],
    [
      {asset: "negative.gif", name: "negative"},
      {asset: "leaf.gif", name: "leaf"},
      {asset: "vamp.gif", name: "vamp"},
      {asset: "pirate.gif", name: "pirate"},
    ],
    [
      {asset: "wind.gif", name: "wind"},
      {asset: "blades.gif", name: "blades"},
      {asset: "mystic.gif", name: "mystic"},
      {asset: "rogue.gif", name: "rogue"},
    ],
    [
      {asset: "ninja.gif", name: "ninja"},
      {asset: "olaf.gif", name: "olaf"},
      {asset: "plague.gif", name: "plague"},
    ],
    [
      {asset: "druid.gif", name: "druid"},
      {asset: "fur.gif", name: "fur"},
      {asset: "spot.gif", name: "spot"},
    ]
  ]
  
  export const tribes = [
    {asset: "fire.gif", name:"Fire"},
    {asset: "sky.gif", name:"Sky"},
    {asset: "electric.gif", name:"Electric"},
    {asset: "grass.gif", name:"Grass"},
    {asset: "wind.gif", name:"Wind"},
    {asset: "water.gif", name:"Water"},
  ]
  
  export const monsters = [
    {asset: "Enemy_Skeleton.gif", name:"Calaca Skeleton"},
    {asset: "Enemy_Zombie.gif", name:"Plague Zombie"},
    {asset: "Enemy_Drowner.gif", name:"Mudkin Drowner"},
    {asset: "Enemy_Draugr.gif", name:"Deathlord Draugr"},
  ]