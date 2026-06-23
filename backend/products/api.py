import base64
import json
import uuid
from datetime import datetime
from typing import List, Optional
from ninja import NinjaAPI, Schema
from django.db.models import Q
from .models import Product

api = NinjaAPI()

# We define the structure of what our API returns
class ProductSchema(Schema):
    id: uuid.UUID
    name: str
    category: str
    price: float
    created_at: datetime
    
class PaginatedProductSchema(Schema):
    items: List[ProductSchema]
    next_cursor: Optional[str]

# -----------------------------------------
# CURSOR PAGINATION LOGIC
# -----------------------------------------

def encode_cursor(created_at: datetime, product_id: str) -> str:
    """Takes the timestamp and ID, turns it into JSON, and encodes it in Base64."""
    cursor_data = {
        'ts': created_at.isoformat(),
        'id': str(product_id)
    }
    json_str = json.dumps(cursor_data)
    # URL-safe base64 is perfect for passing via query parameters
    return base64.urlsafe_b64encode(json_str.encode('utf-8')).decode('utf-8')

def decode_cursor(cursor: str) -> Optional[dict]:
    """Reverses the process. Takes the Base64 cursor from the URL and gets the timestamp/ID."""
    try:
        json_str = base64.urlsafe_b64decode(cursor.encode('utf-8')).decode('utf-8')
        data = json.loads(json_str)
        return {
            'ts': datetime.fromisoformat(data['ts']),
            'id': data['id']
        }
    except Exception:
        return None

@api.get("/products", response=PaginatedProductSchema)
def list_products(request, category: Optional[str] = None, cursor: Optional[str] = None, limit: int = 50):
    queryset = Product.objects.all()
    
    # Apply category filter
    if category:
        queryset = queryset.filter(category__iexact=category)
        
    # The heart of the task: applying the cursor
    if cursor:
        cursor_data = decode_cursor(cursor)
        if cursor_data:
            # We fetch products created BEFORE our cursor's timestamp.
            # If two products share the exact same timestamp, we use the ID as a tie-breaker.
            queryset = queryset.filter(
                Q(created_at__lt=cursor_data['ts']) | 
                (Q(created_at=cursor_data['ts']) & Q(id__lt=cursor_data['id']))
            )
            
    # Always sort newest first, matching the database index we built in models.py.
    # Without this exact sorting order, the index wouldn't be used and it would be slow!
    queryset = queryset.order_by('-created_at', '-id')
    
    # We fetch `limit + 1` items. 
    # If we want 50 items, we ask the database for 51.
    # If we get 51 back, we know there is another page!
    items = list(queryset[:limit + 1])
    
    next_cursor = None
    if len(items) > limit:
        # We have a next page.
        last_item = items[-2] # The 50th item
        next_cursor = encode_cursor(last_item.created_at, last_item.id)
        # Remove the 51st item from our return list
        items = items[:-1]
    
    return {
        "items": items,
        "next_cursor": next_cursor
    }
