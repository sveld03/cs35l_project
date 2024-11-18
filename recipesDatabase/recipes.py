import requests
import pymongo
import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")

# MongoDB setup
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client['gym_database']
collection = db['machines']
# Define recipe ID ranges
recipe_ranges = [
    range(160000, 160040),   # 160000 to 160039
    range(161000, 161099),   # 161000 to 161098
    range(162000, 162035),   # 162000 to 162034
    range(163000, 163154)    # 163000 to 163153
]

def scrape_recipes():
    # Open a file in append mode to save recipe data as text
    with open("ucla_recipes.txt", "a") as file:
        for recipe_range in recipe_ranges:
            for recipe_id in recipe_range:
                # Set up the request data for each recipe
                url = 'https://menu.dining.ucla.edu/Recipes/MultiLabelData'
                data = {
                    "Portions": "1",
                    "RecipeList": f"{recipe_id}*1"
                }
                
                # Send the request
                response = requests.post(url, data=data)
                
                # Check if the request was successful
                if response.status_code == 200:
                    recipe_data = response.json()
                    
                    # Write recipe data to text file
                    file.write(f"Recipe ID: {recipe_id}\n")
                    file.write(json.dumps(recipe_data, indent=4))
                    file.write("\n\n")
                    
                    # Insert recipe into MongoDB
                    recipe_data["RecipeID"] = recipe_id  # Add RecipeID for easier querying
                    collection.insert_one(recipe_data)
                    
                    print(f"Recipe {recipe_id} saved to text file and MongoDB.")
                else:
                    print(f"Recipe {recipe_id} does not exist or could not be retrieved")

# Run the scraping function for the given ID ranges
scrape_recipes()
