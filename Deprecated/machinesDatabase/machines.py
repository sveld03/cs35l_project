import pandas as pd
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pymongo import MongoClient

# Set up Google Sheets API
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope) # note: this is Steven's credentials file, stored locally
client = gspread.authorize(credentials)

# Access the Google Sheet
sheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1B_3U3yxeQZ5NYxFWBxrRVygM98twae3yzuNrrTLgbBg/edit?usp=sharing')
worksheet = sheet.get_worksheet(0)  # Use the first sheet
data = worksheet.get_all_records()

# Convert to DataFrame
df = pd.DataFrame(data)

# Connect to MongoDB
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client['gym_database']
collection = db['machines']

# Insert data into MongoDB
collection.insert_many(df.to_dict('records'))

print("Data inserted into MongoDB successfully.")
