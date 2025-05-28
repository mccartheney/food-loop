import { IconType } from 'react-icons';
import {
    GiShinyApple, GiCarrot, GiSteak, GiFishCooked, GiMilkCarton, GiSlicedBread,
    GiPaperBagFolded, GiIceCube, GiChipsBag, GiChocolateBar, GiSodaCan,
    GiSaltShaker, GiOlive, GiFlour, GiFrenchFries, GiTomato
} from 'react-icons/gi';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { ItemType } from '@prisma/client';

export const getItemIcon = (itemType: ItemType | string): IconType => {
    switch (itemType) {
        case ItemType.FRUITS:
            return GiShinyApple;
        case ItemType.VEGETABLES:
            return GiCarrot; // Or GiTomato if you prefer for a generic vegetable
        case ItemType.MEAT:
            return GiSteak;
        case ItemType.FISH_SEAFOOD:
            return GiFishCooked;
        case ItemType.EGGS:
            return GiMilkCarton;
        case ItemType.GRAINS_CEREALS:
            return GiSlicedBread; // Or GiSpaghetti for pasta
        case ItemType.CANNED_GOODS:
            return GiPaperBagFolded; // Using a generic bag/can icon
        case ItemType.FROZEN_FOODS:
            return GiIceCube; // Or GiFrenchFries if it's common
        case ItemType.SNACKS:
            return GiChipsBag;
        case ItemType.DESSERTS_SWEETS:
            return GiChocolateBar;
        case ItemType.BEVERAGES:
            return GiSodaCan;
        case ItemType.SPICES_SEASONINGS:
            return GiSaltShaker;
        case ItemType.OILS_FATS:
            return GiOlive;
        case ItemType.BAKERY:
            return GiFlour;
        default:
            return FiPackage; // Default icon for unknown types
    }
};

// You might also want a helper for specific item names if types are too broad
export const getIconByItemName = (itemName: string, itemType: ItemType | string): IconType => {
    const lowerName = itemName.toLowerCase();
    if (lowerName.includes('apple')) return GiShinyApple;
    if (lowerName.includes('tomato')) return GiTomato;
    if (lowerName.includes('chicken') || lowerName.includes('steak')) return GiSteak;
    if (lowerName.includes('sardinhas') || lowerName.includes('fish')) return GiFishCooked;
    if (lowerName.includes('fries')) return GiFrenchFries;
    if (lowerName.includes('espaguete') || lowerName.includes('pasta')) return GiFlour;
    if (lowerName.includes('chocolate')) return GiChocolateBar;

    return getItemIcon(itemType); // Fallback to type-based icon
};
