// libs/productData.ts
import {
    Crown,
    Shield,
    Trophy,
    Zap,
    Key,
    Ban,
    CreditCard,
    Coins,
    Package
} from 'lucide-react';
import React from 'react';

// Define interfaces
export interface ProductImage {
    id: number;
    src: string;
    alt: string;
}

export interface Product {
    id: number;
    name: string;
    categoryId: string;
    description: string;
    longDescription: string;
    price: number;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    features: string[];
    popular: boolean;
    comingSoon?: boolean;
    images: ProductImage[];
    benefits: string[];
}

export interface Category {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    products: Product[];
}

// All product data
export const products: Product[] = [
    // Ranks
    {
        id: 1,
        name: 'VIP Rank',
        categoryId: 'ranks',
        description: 'Access exclusive features and stand out with special chat colors.',
        longDescription: 'The VIP Rank grants you access to a variety of exclusive features that set you apart from regular players. Enjoy custom chat colors that make your messages stand out, access to VIP-only servers with special events, exclusive emotes to express yourself, and a distinguished VIP badge next to your name. Upgrade your gaming experience today and join the VIP community!',
        price: 9.99,
        icon: Crown,
        features: [
            'Custom chat color',
            'Access to VIP server',
            '5 exclusive emotes',
            'VIP badge next to name'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'VIP rank badge showcase' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'VIP exclusive chat colors' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'VIP server access' }
        ],
        benefits: [
            'Stand out in chat with custom colors',
            'Connect with other VIPs in exclusive servers',
            'Express yourself with unique emotes',
            'Show off your status with a VIP badge',
            'Get priority support from our team'
        ]
    },
    {
        id: 2,
        name: 'MVP Rank',
        categoryId: 'ranks',
        description: 'Premium perks with enhanced visibility and unique game abilities.',
        longDescription: 'The MVP Rank takes your gaming experience to the next level with an impressive array of premium perks. Make a grand entrance with custom join messages, skip the waiting lines with priority server queue, receive exclusive monthly bonus items, and showcase your status with MVP-exclusive cosmetics. The MVP Rank includes all VIP benefits plus much more, giving you the recognition and advantages you deserve.',
        price: 19.99,
        icon: Trophy,
        features: [
            'All VIP features',
            'Custom join message',
            'Priority server queue',
            'Monthly bonus items',
            'MVP exclusive cosmetics'
        ],
        popular: true,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'MVP rank showcase' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'MVP exclusive cosmetics' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Monthly bonus items showcase' }
        ],
        benefits: [
            'Skip the waiting lines with priority queue',
            'Make an entrance with custom join messages',
            'Receive monthly exclusive items',
            'Access all VIP perks',
            'Enjoy advanced cosmetic options',
            'Get recognized with MVP tag in chat'
        ]
    },
    {
        id: 3,
        name: 'Legend Rank',
        categoryId: 'ranks',
        description: 'Dominate with advanced permissions and rare customization options.',
        longDescription: 'The Legend Rank represents the elite tier of our community. With this prestigious rank, you\'ll have access to animated name tags that catch everyone\'s attention, custom player auras that make you stand out in any crowd, early access to testing features before they\'re public, exclusive Legend-only game modes for unique gameplay experiences, and dedicated concierge support from our staff. The Legend Rank includes all MVP features and takes them to new heights.',
        price: 39.99,
        icon: Shield,
        features: [
            'All MVP features',
            'Animated name tags',
            'Custom player aura',
            'Access to testing features',
            'Legend-only game modes',
            'Personal concierge support'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'Legend rank animated badge' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Custom player auras' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Legend exclusive game modes' }
        ],
        benefits: [
            'Captivate others with animated name tags',
            'Create a unique visual identity with custom auras',
            'Experience new features before anyone else',
            'Enjoy exclusive game modes only for Legends',
            'Get dedicated support with priority assistance',
            'Access all MVP and VIP benefits'
        ]
    },
    {
        id: 4,
        name: 'TITAN Rank',
        categoryId: 'ranks',
        description: 'Ultimate status with exclusive powers and developer access.',
        longDescription: 'The TITAN Rank represents the absolute pinnacle of our ranking system. As a TITAN, you\'ll have unprecedented access to developer chats where you can interact directly with our team, create custom commands that enhance your gameplay experience, participate in exclusive monthly private events, influence the future of the game with your feedback, get priority for feature requests, and receive the ultimate cosmetic bundle that makes your character truly unique. The TITAN Rank is for those who demand nothing but the best.',
        price: 99.99,
        icon: Zap,
        features: [
            'All Legend features',
            'Developer chat access',
            'Custom command creation',
            'Monthly private events',
            'Exclusive game influence',
            'Priority feature requests',
            'Ultimate cosmetic bundle'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'TITAN rank showcase' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Ultimate cosmetic bundle' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Developer chat access' },
            { id: 4, src: '/api/placeholder/600/400', alt: 'Custom command interface' }
        ],
        benefits: [
            'Shape the future of the game with direct developer access',
            'Create your own commands for unique gameplay',
            'Attend exclusive events with developers and other TITANs',
            'Enjoy the most comprehensive cosmetic collection',
            'Have your feature suggestions prioritized',
            'Access all benefits from Legend, MVP, and VIP ranks'
        ]
    },

    // Crates
    {
        id: 5,
        name: 'VIP Crate Key',
        categoryId: 'crates',
        description: 'Unlock exclusive VIP gear with boosted drop rates.',
        longDescription: 'The VIP Crate Key unlocks a treasure trove of valuable items designed for players who want to enhance their gameplay experience. Each crate contains a selection of rare weapon skins that add style to your arsenal, basic armor sets for improved protection, common emotes to express yourself in-game, and a 10% chance to receive rare drops that are typically difficult to obtain. The VIP Crate is the perfect starting point for collectors and players looking to stand out.',
        price: 2.99,
        icon: Key,
        features: [
            'Rare weapon skins',
            'Basic armor sets',
            'Common emotes',
            '10% chance for rare drops'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'VIP crate opening animation' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'VIP rare weapon skins' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Basic armor sets' }
        ],
        benefits: [
            'Customize your weapons with rare skins',
            'Increase your defense with basic armor sets',
            'Express yourself with new emotes',
            'Chance to obtain rare items normally difficult to find',
            'Affordable entry into our crate system'
        ]
    },
    {
        id: 6,
        name: 'MVP Crate Key',
        categoryId: 'crates',
        description: 'Superior items with enhanced stats and unique designs.',
        longDescription: 'The MVP Crate Key offers access to superior quality items that provide both aesthetic appeal and gameplay advantages. Each crate contains the powerful Energy Pistol, a collection of rare weapon attachments to customize your arsenal, uncommon armor sets with enhanced protection, exclusive MVP emotes that are unavailable elsewhere, and a 15% chance to receive epic drops that can change your gameplay experience. The MVP Crate is perfect for serious players looking for both style and substance.',
        price: 4.99,
        icon: Key,
        features: [
            'Energy Pistol',
            'Rare weapon attachments',
            'Uncommon armor sets',
            'Exclusive MVP emotes',
            '15% chance for epic drops'
        ],
        popular: true,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'MVP crate key' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Energy Pistol' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Rare weapon attachments' },
            { id: 4, src: '/api/placeholder/600/400', alt: 'Uncommon armor sets' }
        ],
        benefits: [
            'Equip the powerful Energy Pistol for an advantage in combat',
            'Customize your weapons with rare attachments',
            'Improve your defense with uncommon armor',
            'Stand out with exclusive emotes',
            'Higher chance for epic items'
        ]
    },
    {
        id: 7,
        name: 'Legend Crate Key',
        categoryId: 'crates',
        description: 'Premium loot with guaranteed rare items and special effects.',
        longDescription: 'The Legend Crate Key opens the door to premium loot designed for serious players. Each crate contains the powerful Energy Assault Rifle, Kevlar II armor pieces for superior protection, animated weapon skins that stand out on the battlefield, exclusive Legend-only pets that follow you in game, and a 25% chance for legendary drops that can transform your gameplay experience. The Legend Crate represents high-value rewards for discerning players.',
        price: 7.99,
        icon: Key,
        features: [
            'Energy Assault Rifle',
            'Kevlar II armor pieces',
            'Animated weapon skins',
            'Legend-exclusive pets',
            '25% chance for legendary drops'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'Legend crate key' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Energy Assault Rifle' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Kevlar II armor' },
            { id: 4, src: '/api/placeholder/600/400', alt: 'Animated weapon skins' }
        ],
        benefits: [
            'Dominate with the powerful Energy Assault Rifle',
            'Enhanced protection with Kevlar II armor',
            'Stand out with animated weapon skins',
            'Showcase your status with exclusive pets',
            'High chance for legendary items',
            'Access to rare gameplay modifications'
        ]
    },
    {
        id: 8,
        name: 'TITAN Crate Key',
        categoryId: 'crates',
        description: 'The ultimate crate with the rarest and most powerful items in the game.',
        longDescription: 'The TITAN Crate Key unlocks the most prestigious and valuable collection of items available in the game. Each crate contains the devastating Plasma Rifle, the versatile Energy Assault Rifle, the complete Kevlar III armor set for maximum protection, exclusive particle effects that showcase your status, legendary weapon skins of the highest quality, and a guaranteed legendary item that will transform your gameplay. The TITAN Crate represents the pinnacle of our offering and is designed for players who accept nothing but the absolute best.',
        price: 14.99,
        icon: Key,
        features: [
            'Plasma Rifle',
            'Energy Assault Rifle',
            'Kevlar III armor set',
            'Exclusive particle effects',
            'Legendary weapon skins',
            'Guaranteed legendary item'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'TITAN crate key' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Plasma Rifle' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Energy Assault Rifle' },
            { id: 4, src: '/api/placeholder/600/400', alt: 'Kevlar III armor set' },
            { id: 5, src: '/api/placeholder/600/400', alt: 'Particle effects showcase' }
        ],
        benefits: [
            'Dominate with the powerful Plasma Rifle',
            'Versatile combat options with the Energy Assault Rifle',
            'Maximum protection with the complete Kevlar III armor',
            'Stand out with exclusive particle effects',
            'Showcase your status with legendary weapon skins',
            'Guaranteed to receive at least one legendary item'
        ]
    },

    // Punishments
    {
        id: 9,
        name: 'Minor Offense Unban',
        categoryId: 'punishments',
        description: 'Appeal a minor offense and get back to playing.',
        longDescription: 'The Minor Offense Unban service provides a way for players to appeal temporary bans resulting from minor rule violations. This service removes temporary restrictions, lifts chat limitations, and cleans your record for minor offenses. The appeal is processed instantly, allowing you to get back to playing without delay. This service is designed for first-time or accidental violations where the impact on other players was minimal.',
        price: 4.99,
        icon: Ban,
        features: [
            'Removes temporary bans',
            'Chat restriction removal',
            'Clean record for minor offenses',
            'Instant processing'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'Minor offense unban process' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Chat restrictions removal' }
        ],
        benefits: [
            'Get back to playing immediately',
            'Clean slate for minor infractions',
            'Removal of chat restrictions',
            'Instant automatic processing',
            'No waiting period for appeals'
        ]
    },
    {
        id: 10,
        name: 'Major Offense Appeal',
        categoryId: 'punishments',
        description: 'Appeal a major offense with mandatory review.',
        longDescription: 'The Major Offense Appeal service allows players to request a review of more serious rule violations. Each appeal undergoes a thorough manual review by our admin team who carefully considers the circumstances of the violation. If approved, your account will be reinstated with a one-time warning status. Appeals are processed within 24 hours, and our team may reach out for additional information. This service is designed for players who acknowledge their mistake and are committed to following the rules moving forward.',
        price: 14.99,
        icon: Ban,
        features: [
            'Appeal for serious violations',
            'Manual admin review',
            'One-time warning status',
            'Processing within 24 hours'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'Major offense appeal process' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Admin review dashboard' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Warning status badge' }
        ],
        benefits: [
            'Second chance for significant violations',
            'Fair review by experienced administrators',
            'Opportunity to explain circumstances',
            'Priority processing compared to free appeals',
            'Clear path to restore account standing'
        ]
    },

    // Token Packs
    {
        id: 11,
        name: '500 Tokens',
        categoryId: 'tokens',
        description: 'Small token pack for marketplace purchases.',
        longDescription: 'The 500 Tokens pack provides you with in-game currency to spend in our marketplace. These tokens can be used to purchase a variety of cosmetic items, temporary boosters, and other convenience items. Tokens are delivered instantly to your account upon purchase, allowing you to immediately browse and shop in our marketplace. This small token pack is perfect for players who want to make a few select purchases without committing to a larger amount.',
        price: 4.99,
        icon: Coins,
        features: [
            '500 in-game tokens',
            'Instant delivery',
            'Use in marketplace for cosmetics'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: '500 tokens visualization' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Marketplace shopping with tokens' }
        ],
        benefits: [
            'Quick access to in-game marketplace',
            'Purchase cosmetic items',
            'Instant delivery to your account',
            'Affordable entry option',
            'Use for limited-time offers'
        ]
    },
    {
        id: 12,
        name: '1,200 Tokens',
        categoryId: 'tokens',
        description: 'Medium token pack with 10% bonus.',
        longDescription: 'The 1,200 Tokens pack offers excellent value with 1,100 base tokens plus a 10% bonus of 100 additional tokens. These tokens can be used in our marketplace to purchase rare items, exclusive cosmetics, and temporary gameplay enhancers. Tokens are delivered instantly upon purchase, allowing you to immediately start shopping. This medium-sized token pack is ideal for regular players who want access to more valuable items in the marketplace.',
        price: 9.99,
        icon: Coins,
        features: [
            '1,100 base tokens',
            '100 bonus tokens (10%)',
            'Instant delivery',
            'Use in marketplace for rare items'
        ],
        popular: true,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: '1,200 tokens pack' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Bonus tokens visualization' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Rare marketplace items' }
        ],
        benefits: [
            'Get 10% more tokens as a bonus',
            'Access to rare marketplace items',
            'More purchasing power for premium cosmetics',
            'Instant delivery to your account',
            'Best value for regular players'
        ]
    },
    {
        id: 13,
        name: '2,600 Tokens',
        categoryId: 'tokens',
        description: 'Large token pack with 15% bonus.',
        longDescription: 'The 2,600 Tokens pack provides substantial value with 2,260 base tokens plus a 15% bonus of 340 additional tokens. This amount of tokens gives you significant purchasing power in our marketplace, allowing you to acquire epic items, limited edition cosmetics, and other high-value offerings. Tokens are delivered instantly to your account upon purchase. This large token pack is perfect for dedicated players who want access to premium marketplace content.',
        price: 19.99,
        icon: Coins,
        features: [
            '2,260 base tokens',
            '340 bonus tokens (15%)',
            'Instant delivery',
            'Use in marketplace for epic items'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: '2,600 tokens pack' },
            { id: 2, src: '/api/placeholder/600/400', alt: '15% bonus visualization' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Epic marketplace items' }
        ],
        benefits: [
            'Enjoy a generous 15% token bonus',
            'Access to epic and rare marketplace items',
            'Substantial buying power for premium content',
            'Instant delivery to your account',
            'Great value for dedicated players'
        ]
    },
    {
        id: 14,
        name: '5,500 Tokens',
        categoryId: 'tokens',
        description: 'Premium token pack with 20% bonus.',
        longDescription: 'The 5,500 Tokens pack represents our best value with 4,580 base tokens plus a massive 20% bonus of 920 additional tokens. This premium amount gives you exceptional purchasing power in our marketplace, allowing you to acquire legendary items, the rarest cosmetics, and other exclusive offerings. Tokens are delivered instantly to your account. This premium token pack is designed for our most dedicated players who want unrestricted access to the very best items available.',
        price: 39.99,
        icon: Coins,
        features: [
            '4,580 base tokens',
            '920 bonus tokens (20%)',
            'Instant delivery',
            'Use in marketplace for legendary items'
        ],
        popular: false,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: '5,500 tokens pack' },
            { id: 2, src: '/api/placeholder/600/400', alt: '20% bonus visualization' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Legendary marketplace items' }
        ],
        benefits: [
            'Receive our largest bonus of 20% extra tokens',
            'Access to legendary and exclusive items',
            'Maximum purchasing power in the marketplace',
            'Instant delivery to your account',
            'Best value option for serious players',
            'Ability to purchase multiple premium items'
        ]
    },

    // Bank
    {
        id: 15,
        name: 'Game Bank Account',
        categoryId: 'bank',
        description: 'Manage your finances remotely with our premium banking system.',
        longDescription: 'The Game Bank Account is a premium service that allows you to manage your in-game finances with unprecedented convenience and security. With a monthly subscription of $5.00, you gain access to remote currency management, the ability to set up scheduled payments to other players, earn interest on your balance, view detailed transaction history, and make seamless money transfers between players. This service is perfect for serious players who engage in trading, maintain multiple investments, or simply want more control over their in-game economy.',
        price: 5.00,
        icon: CreditCard,
        features: [
            'Remote currency management',
            'Scheduled payments',
            'Interest on balance',
            'Transaction history',
            'Money transfers between players'
        ],
        popular: false,
        comingSoon: true,
        images: [
            { id: 1, src: '/api/placeholder/600/400', alt: 'Game bank interface' },
            { id: 2, src: '/api/placeholder/600/400', alt: 'Remote banking app' },
            { id: 3, src: '/api/placeholder/600/400', alt: 'Transaction history view' },
            { id: 4, src: '/api/placeholder/600/400', alt: 'Interest earnings visualization' }
        ],
        benefits: [
            'Manage your finances from anywhere',
            'Earn passive income through interest',
            'Schedule recurring payments',
            'Track all your transactions in one place',
            'Transfer money safely to other players',
            'Receive financial reports and insights'
        ]
    }
];

// All categories with their associated products
export const categories: Category[] = [
    {
        id: 'ranks',
        name: 'Ranks',
        icon: Crown,
        products: products.filter(product => product.categoryId === 'ranks')
    },
    {
        id: 'crates',
        name: 'Crates',
        icon: Package,
        products: products.filter(product => product.categoryId === 'crates')
    },
    {
        id: 'punishments',
        name: 'Punishments',
        icon: Ban,
        products: products.filter(product => product.categoryId === 'punishments')
    },
    {
        id: 'tokens',
        name: 'Token Packs',
        icon: Coins,
        products: products.filter(product => product.categoryId === 'tokens')
    },
    {
        id: 'bank',
        name: 'Bank',
        icon: CreditCard,
        products: products.filter(product => product.categoryId === 'bank')
    }
];

// Helper functions
export const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
    return categories.find(category => category.id === id);
};

export const getCategoryName = (categoryId: string): string => {
    const category = getCategoryById(categoryId);
    return category ? category.name : 'Unknown Category';
};