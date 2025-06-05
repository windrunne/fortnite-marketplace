import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Rare Fortnite Account with Exclusive Skins',
    description: 'Fortnite account with rare skins including Thunder and Sklaxis',
    originalPrice: 149.99,
    discountedPrice: 89.99,
    discountPercentage: 40,
    imageUrl: '/images/image_1.png',
    vendorName: 'EPICSTORE',
    features: {
      instant: true,
      rare: true,
      platforms: ['All Platforms']
    },
    isCertified: true,
    hasVideo: true,
    isInstant: true,
    rarity: 'Rare',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Mobile']
  },
  {
    id: '2',
    title: 'OG Battle Royale Account with All Battle Passes',
    description: 'Fortnite Battle Royale account with exclusive items from all seasons',
    originalPrice: 199.99,
    discountedPrice: 149.99,
    discountPercentage: 25,
    imageUrl: '/images/image_2.png',
    vendorName: 'RARESHOP',
    features: {
      instant: true,
      rare: true,
      platforms: ['All Platforms']
    },
    isCertified: true,
    hasVideo: true,
    isInstant: true,
    rarity: 'Epic',
    platforms: ['PC', 'PlayStation', 'Xbox']
  },
  {
    id: '3',
    title: 'Rare Skins Collection with 100+ Outfits',
    description: 'Rare skins collection with colorful characters and exclusive emotes',
    originalPrice: 129.99,
    discountedPrice: 99.99,
    discountPercentage: 23,
    imageUrl: '/images/image_3.png',
    vendorName: 'SKINSWORLD',
    features: {
      instant: true,
      rare: true,
      platforms: ['All Platforms']
    },
    isCertified: false,
    hasVideo: true,
    isInstant: true,
    rarity: 'Uncommon',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Mobile']
  },
  {
    id: '4',
    title: 'OG Season 1 Account with Black Knight',
    description: 'OG account with exclusive and rare skins from the first seasons',
    originalPrice: 299.99,
    discountedPrice: 199.99,
    discountPercentage: 33,
    imageUrl: '/images/image_4.png',
    vendorName: 'OGACCOUNTS',
    features: {
      instant: true,
      rare: true,
      platforms: ['All Platforms']
    },
    isCertified: true,
    hasVideo: false,
    isInstant: false,
    rarity: 'Legendary',
    platforms: ['PC', 'PlayStation']
  },
  {
    id: '5',
    title: 'Galaxy Skin + Exclusive Cosmetics Bundle',
    description: 'Fortnite account with rare Galaxy skin and matching cosmetic items',
    originalPrice: 79.99,
    discountedPrice: 59.99,
    discountPercentage: 25,
    imageUrl: '/images/image_5.png',
    vendorName: 'GALAXYSHOP',
    features: {
      instant: true,
      rare: true,
      platforms: ['All Platforms']
    },
    isCertified: true,
    hasVideo: true,
    isInstant: true,
    rarity: 'Epic',
    platforms: ['PC', 'Mobile']
  },
  {
    id: '6',
    title: 'OG Skin Bundle with Renegade Raider',
    description: 'OG Skin Bundle with classic characters including the rare Renegade Raider',
    originalPrice: 399.99,
    discountedPrice: 349.99,
    discountPercentage: 13,
    imageUrl: '/images/image_6.png',
    vendorName: 'RAREMARKET',
    features: {
      instant: true,
      rare: true,
      platforms: ['All Platforms']
    },
    isCertified: true,
    hasVideo: true,
    isInstant: false,
    rarity: 'Legendary',
    platforms: ['PC', 'PlayStation', 'Xbox']
  },
  {
    id: '7',
    title: 'Budget Account with Season 8-12 Items',
    description: 'Affordable account with items from recent seasons',
    originalPrice: 49.99,
    discountedPrice: 29.99,
    discountPercentage: 40,
    imageUrl: '/images/image_7.png',
    vendorName: 'BUDGETGAMES',
    features: {
      instant: true,
      rare: false,
      platforms: ['All Platforms']
    },
    isCertified: false,
    hasVideo: false,
    isInstant: true,
    rarity: 'Common',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Mobile']
  },
  {
    id: '8',
    title: 'Premium Account with 200+ Skins Collection',
    description: 'Premium account with extensive collection of skins from all seasons',
    originalPrice: 249.99,
    discountedPrice: 199.99,
    discountPercentage: 20,
    imageUrl: '/images/image_8.png',
    vendorName: 'PREMIUMSTORE',
    features: {
      instant: true,
      rare: true,
      platforms: ['All Platforms']
    },
    isCertified: true,
    hasVideo: true,
    isInstant: true,
    rarity: 'Epic',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Mobile']
  }
]; 