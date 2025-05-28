
interface GroceryItem {
    name: string;
    quantity: number;
    expire_date: string; // Expected format: 'YYYY-MM-DD' or 'N/A'
    type: 'Meat' | 'Grain' | 'Dairy' | 'Produce' | 'Beverage' | 'Frozen' | 'Pantry' | 'Household' | 'Other';
}

type GroceryList = GroceryItem[];

const foodList : GroceryList = [
    {
        "name": "Steak",
        "quantity": 1,
        "expire_date": "2025-06-03",
        "type": "Meat"
    },
    {
        "name": "Tomatoes",
        "quantity": 10,
        "expire_date": "2025-06-01",
        "type": "Produce"
    },
    {
        "name": "Milk (2L)",
        "quantity": 1,
        "expire_date": "2025-06-05",
        "type": "Dairy"
    },
    {
        "name": "Bread (loaf)",
        "quantity": 1,
        "expire_date": "2025-05-30",
        "type": "Grain"
    },
    {
        "name": "Eggs",
        "quantity": 12,
        "expire_date": "2025-06-15",
        "type": "Dairy"
    },
    {
        "name": "Chicken Breast",
        "quantity": 4,
        "expire_date": "2025-06-02",
        "type": "Meat"
    },
    {
        "name": "Potatoes (kg)",
        "quantity": 2,
        "expire_date": "2025-06-10",
        "type": "Produce"
    },
    {
        "name": "Onions (large)",
        "quantity": 3,
        "expire_date": "2025-06-20",
        "type": "Produce"
    },
    {
        "name": "Apples",
        "quantity": 6,
        "expire_date": "2025-06-07",
        "type": "Produce"
    },
    {
        "name": "Bananas",
        "quantity": 5,
        "expire_date": "2025-05-31",
        "type": "Produce"
    },
    {
        "name": "Yogurt (individual)",
        "quantity": 8,
        "expire_date": "2025-06-08",
        "type": "Dairy"
    },
    {
        "name": "Cheese (block)",
        "quantity": 1,
        "expire_date": "2025-06-25",
        "type": "Dairy"
    },
    {
        "name": "Butter (pack)",
        "quantity": 1,
        "expire_date": "2025-07-10",
        "type": "Dairy"
    },
    {
        "name": "Rice (kg)",
        "quantity": 1,
        "expire_date": "2026-01-01",
        "type": "Grain"
    },
    {
        "name": "Pasta (pack)",
        "quantity": 2,
        "expire_date": "2025-12-01",
        "type": "Grain"
    },
    {
        "name": "Cereal (box)",
        "quantity": 1,
        "expire_date": "2025-09-15",
        "type": "Pantry"
    },
    {
        "name": "Coffee (ground)",
        "quantity": 1,
        "expire_date": "2025-10-20",
        "type": "Beverage"
    },
    {
        "name": "Orange Juice (1L)",
        "quantity": 1,
        "expire_date": "2025-06-06",
        "type": "Beverage"
    },
    {
        "name": "Lettuce (head)",
        "quantity": 1,
        "expire_date": "2025-06-01",
        "type": "Produce"
    },
    {
        "name": "Cucumbers",
        "quantity": 2,
        "expire_date": "2025-06-04",
        "type": "Produce"
    },
    {
        "name": "Bell Peppers",
        "quantity": 3,
        "expire_date": "2025-06-05",
        "type": "Produce"
    },
    {
        "name": "Sausages",
        "quantity": 6,
        "expire_date": "2025-06-03",
        "type": "Meat"
    },
    {
        "name": "Pork Chops",
        "quantity": 2,
        "expire_date": "2025-06-02",
        "type": "Meat"
    },
    {
        "name": "Salmon Fillets",
        "quantity": 2,
        "expire_date": "2025-06-01",
        "type": "Meat"
    },
    {
        "name": "Shrimp (pack)",
        "quantity": 1,
        "expire_date": "2025-06-04",
        "type": "Meat"
    },
    {
        "name": "Frozen Peas",
        "quantity": 1,
        "expire_date": "2026-03-01",
        "type": "Frozen"
    },
    {
        "name": "Frozen Corn",
        "quantity": 1,
        "expire_date": "2026-03-01",
        "type": "Frozen"
    },
    {
        "name": "Ice Cream (pint)",
        "quantity": 1,
        "expire_date": "2025-08-01",
        "type": "Frozen"
    },
    {
        "name": "Flour (kg)",
        "quantity": 1,
        "expire_date": "2026-04-01",
        "type": "Pantry"
    },
    {
        "name": "Sugar (kg)",
        "quantity": 1,
        "expire_date": "2026-04-01",
        "type": "Pantry"
    },
    {
        "name": "Olive Oil (bottle)",
        "quantity": 1,
        "expire_date": "2026-06-01",
        "type": "Pantry"
    },
    {
        "name": "Vinegar (bottle)",
        "quantity": 1,
        "expire_date": "2026-06-01",
        "type": "Pantry"
    },
    {
        "name": "Salt (pack)",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Black Pepper (grinder)",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Ketchup (bottle)",
        "quantity": 1,
        "expire_date": "2025-11-01",
        "type": "Pantry"
    },
    {
        "name": "Mustard (jar)",
        "quantity": 1,
        "expire_date": "2025-11-01",
        "type": "Pantry"
    },
    {
        "name": "Mayonnaise (jar)",
        "quantity": 1,
        "expire_date": "2025-10-01",
        "type": "Pantry"
    },
    {
        "name": "Jam (jar)",
        "quantity": 1,
        "expire_date": "2026-02-01",
        "type": "Pantry"
    },
    {
        "name": "Honey (jar)",
        "quantity": 1,
        "expire_date": "2027-03-01",
        "type": "Pantry"
    },
    {
        "name": "Peanut Butter (jar)",
        "quantity": 1,
        "expire_date": "2026-01-01",
        "type": "Pantry"
    },
    {
        "name": "Canned Tuna",
        "quantity": 3,
        "expire_date": "2026-05-01",
        "type": "Pantry"
    },
    {
        "name": "Canned Beans",
        "quantity": 2,
        "expire_date": "2026-05-01",
        "type": "Pantry"
    },
    {
        "name": "Canned Tomatoes",
        "quantity": 2,
        "expire_date": "2026-05-01",
        "type": "Pantry"
    },
    {
        "name": "Soda (can)",
        "quantity": 6,
        "expire_date": "2025-09-01",
        "type": "Beverage"
    },
    {
        "name": "Water Bottles (small)",
        "quantity": 12,
        "expire_date": "2026-07-01",
        "type": "Beverage"
    },
    {
        "name": "Paper Towels (roll)",
        "quantity": 1,
        "expire_date": "N/A",
        "type": "Household"
    },
    {
        "name": "Dish Soap",
        "quantity": 1,
        "expire_date": "N/A",
        "type": "Household"
    },
    {
        "name": "Laundry Detergent",
        "quantity": 1,
        "expire_date": "N/A",
        "type": "Household"
    },
    {
        "name": "Trash Bags (roll)",
        "quantity": 1,
        "expire_date": "N/A",
        "type": "Household"
    },
    {
        "name": "Hand Soap",
        "quantity": 1,
        "expire_date": "N/A",
        "type": "Household"
    },
    {
        "name": "Ground Beef (lb)",
        "quantity": 1,
        "expire_date": "2025-06-01",
        "type": "Meat"
    },
    {
        "name": "Pears",
        "quantity": 4,
        "expire_date": "2025-06-06",
        "type": "Produce"
    },
    {
        "name": "Spinach (bag)",
        "quantity": 1,
        "expire_date": "2025-06-02",
        "type": "Produce"
    },
    {
        "name": "Sour Cream",
        "quantity": 1,
        "expire_date": "2025-06-12",
        "type": "Dairy"
    },
    {
        "name": "Tortillas (pack)",
        "quantity": 1,
        "expire_date": "2025-06-10",
        "type": "Grain"
    },
    {
        "name": "Frozen Pizza",
        "quantity": 1,
        "expire_date": "2025-10-01",
        "type": "Frozen"
    },
    {
        "name": "Broccoli (head)",
        "quantity": 1,
        "expire_date": "2025-06-03",
        "type": "Produce"
    },
    {
        "name": "Carrots (bag)",
        "quantity": 1,
        "expire_date": "2025-06-15",
        "type": "Produce"
    },
    {
        "name": "Cheddar Cheese (shredded)",
        "quantity": 1,
        "expire_date": "2025-06-20",
        "type": "Dairy"
    },
    {
        "name": "Bacon (pack)",
        "quantity": 1,
        "expire_date": "2025-06-07",
        "type": "Meat"
    },
    {
        "name": "Hot Dogs (pack)",
        "quantity": 1,
        "expire_date": "2025-06-08",
        "type": "Meat"
    },
    {
        "name": "Buns (pack)",
        "quantity": 1,
        "expire_date": "2025-06-05",
        "type": "Grain"
    },
    {
        "name": "Oatmeal (container)",
        "quantity": 1,
        "expire_date": "2026-02-01",
        "type": "Grain"
    },
    {
        "name": "Maple Syrup",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Pancake Mix",
        "quantity": 1,
        "expire_date": "2025-11-01",
        "type": "Pantry"
    },
    {
        "name": "Frozen Berries",
        "quantity": 1,
        "expire_date": "2026-04-01",
        "type": "Frozen"
    },
    {
        "name": "Frozen French Fries",
        "quantity": 1,
        "expire_date": "2026-03-01",
        "type": "Frozen"
    },
    {
        "name": "Ice Cubes (bag)",
        "quantity": 1,
        "expire_date": "N/A",
        "type": "Frozen"
    },
    {
        "name": "Garlic (head)",
        "quantity": 1,
        "expire_date": "2025-07-01",
        "type": "Produce"
    },
    {
        "name": "Lemons",
        "quantity": 2,
        "expire_date": "2025-06-10",
        "type": "Produce"
    },
    {
        "name": "Limes",
        "quantity": 2,
        "expire_date": "2025-06-10",
        "type": "Produce"
    },
    {
        "name": "Avocados",
        "quantity": 2,
        "expire_date": "2025-06-02",
        "type": "Produce"
    },
    {
        "name": "Canned Chickpeas",
        "quantity": 2,
        "expire_date": "2026-04-01",
        "type": "Pantry"
    },
    {
        "name": "Canned Black Olives",
        "quantity": 1,
        "expire_date": "2026-03-01",
        "type": "Pantry"
    },
    {
        "name": "Soy Sauce",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Ranch Dressing",
        "quantity": 1,
        "expire_date": "2025-09-01",
        "type": "Pantry"
    },
    {
        "name": "Salad Mix (bag)",
        "quantity": 1,
        "expire_date": "2025-05-31",
        "type": "Produce"
    },
    {
        "name": "Grapes (bag)",
        "quantity": 1,
        "expire_date": "2025-06-05",
        "type": "Produce"
    },
    {
        "name": "Strawberries (pint)",
        "quantity": 1,
        "expire_date": "2025-06-01",
        "type": "Produce"
    },
    {
        "name": "Blueberries (pint)",
        "quantity": 1,
        "expire_date": "2025-06-01",
        "type": "Produce"
    },
    {
        "name": "Pita Bread",
        "quantity": 1,
        "expire_date": "2025-06-04",
        "type": "Grain"
    },
    {
        "name": "Hummus",
        "quantity": 1,
        "expire_date": "2025-06-09",
        "type": "Dairy"
    },
    {
        "name": "Tofu (block)",
        "quantity": 1,
        "expire_date": "2025-06-10",
        "type": "Meat"
    },
    {
        "name": "Veggie Burgers (frozen)",
        "quantity": 4,
        "expire_date": "2026-01-01",
        "type": "Frozen"
    },
    {
        "name": "Almond Milk (carton)",
        "quantity": 1,
        "expire_date": "2025-07-01",
        "type": "Beverage"
    },
    {
        "name": "Sparkling Water (can)",
        "quantity": 6,
        "expire_date": "2025-12-01",
        "type": "Beverage"
    },
    {
        "name": "Tea Bags (box)",
        "quantity": 1,
        "expire_date": "2027-05-01",
        "type": "Beverage"
    },
    {
        "name": "Coffee Creamer",
        "quantity": 1,
        "expire_date": "2025-07-15",
        "type": "Dairy"
    },
    {
        "name": "Bagels (pack)",
        "quantity": 1,
        "expire_date": "2025-06-03",
        "type": "Grain"
    },
    {
        "name": "Cream Cheese",
        "quantity": 1,
        "expire_date": "2025-06-18",
        "type": "Dairy"
    },
    {
        "name": "Frozen Waffles",
        "quantity": 1,
        "expire_date": "2026-02-01",
        "type": "Frozen"
    },
    {
        "name": "Syrup (bottle)",
        "quantity": 1,
        "expire_date": "2026-10-01",
        "type": "Pantry"
    },
    {
        "name": "Chocolate Chips (bag)",
        "quantity": 1,
        "expire_date": "2026-03-01",
        "type": "Pantry"
    },
    {
        "name": "Baking Soda",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Baking Powder",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Vanilla Extract",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Spaghetti Sauce (jar)",
        "quantity": 1,
        "expire_date": "2026-01-01",
        "type": "Pantry"
    },
    {
        "name": "Parmesan Cheese (shredded)",
        "quantity": 1,
        "expire_date": "2025-07-01",
        "type": "Dairy"
    },
    {
        "name": "Ground Turkey",
        "quantity": 1,
        "expire_date": "2025-06-02",
        "type": "Meat"
    },
    {
        "name": "Pork Tenderloin",
        "quantity": 1,
        "expire_date": "2025-06-03",
        "type": "Meat"
    },
    {
        "name": "Cod Fillets",
        "quantity": 2,
        "expire_date": "2025-06-01",
        "type": "Meat"
    },
    {
        "name": "Tuna (fresh)",
        "quantity": 1,
        "expire_date": "2025-05-30",
        "type": "Meat"
    },
    {
        "name": "Green Beans (fresh)",
        "quantity": 1,
        "expire_date": "2025-06-05",
        "type": "Produce"
    },
    {
        "name": "Mushrooms (pack)",
        "quantity": 1,
        "expire_date": "2025-06-02",
        "type": "Produce"
    },
    {
        "name": "Sweet Potatoes",
        "quantity": 3,
        "expire_date": "2025-06-12",
        "type": "Produce"
    },
    {
        "name": "Cabbage (head)",
        "quantity": 1,
        "expire_date": "2025-06-15",
        "type": "Produce"
    },
    {
        "name": "Cilantro (bunch)",
        "quantity": 1,
        "expire_date": "2025-06-01",
        "type": "Produce"
    },
    {
        "name": "Parsley (bunch)",
        "quantity": 1,
        "expire_date": "2025-06-01",
        "type": "Produce"
    },
    {
        "name": "Dill (bunch)",
        "quantity": 1,
        "expire_date": "2025-06-01",
        "type": "Produce"
    },
    {
        "name": "Basil (plant)",
        "quantity": 1,
        "expire_date": "2025-06-10",
        "type": "Produce"
    },
    {
        "name": "Rosemary (bunch)",
        "quantity": 1,
        "expire_date": "2025-06-05",
        "type": "Produce"
    },
    {
        "name": "Thyme (bunch)",
        "quantity": 1,
        "expire_date": "2025-06-05",
        "type": "Produce"
    },
    {
        "name": "Bay Leaves",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Cinnamon (ground)",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Nutmeg (ground)",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Paprika",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Chili Powder",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Cumin (ground)",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Oregano (dried)",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Garlic Powder",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Onion Powder",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    },
    {
        "name": "Ginger (ground)",
        "quantity": 1,
        "expire_date": "2027-01-01",
        "type": "Pantry"
    }
  ]