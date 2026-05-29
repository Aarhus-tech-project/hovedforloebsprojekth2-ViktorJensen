import os
import pprint

from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv, find_dotenv

def clean_stock_data():
    """
    Docstring for clean_stock_data
    """
    load_dotenv(find_dotenv())

    uri = "mongodb://localhost:27017"

    try:
        client = MongoClient(uri)
        db = client.api_data
        collection = db.stock_data

        res = collection.delete_many({})

        print(res.deleted_count, " documents deleted.")
    except Exception as e:
        print(f"Error deleting documents: {e}")
    finally:
        client.close()