import random
import time
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from products.models import Product

CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Books', 'Toys', 'Sports', 'Food', 'Beauty']

class Command(BaseCommand):
    help = 'Seeds the database with 200,000 products quickly.'

    def handle(self, *args, **kwargs):
        self.stdout.write('Starting data generation...')
        
        # Avoid running it again if already seeded
        if Product.objects.count() >= 200000:
            self.stdout.write(self.style.SUCCESS('Database already seeded. Skipping.'))
            return

        total_products = 200000
        batch_size = 10000 # We will insert 10,000 at a time to make it extremely fast
        
        products_to_create = []
        
        # We'll simulate data spanning the last year
        base_time = timezone.now() - timedelta(days=365)
        
        start_time = time.time()
        
        for i in range(total_products):
            # Increment time slightly so products have different created_at dates
            created_time = base_time + timedelta(minutes=i)
            
            product = Product(
                name=f"Awesome Product {i}",
                category=random.choice(CATEGORIES),
                price=round(random.uniform(5.0, 500.0), 2),
            )
            # We manually set the time to simulate historical data
            product.created_at = created_time
            product.updated_at = created_time
            
            products_to_create.append(product)
            
            # --- HOW THE DATA GOES INTO NEON ---
            # When this Python list reaches 10,000 products, we call `bulk_create`.
            # Behind the scenes, Django takes all 10,000 Python objects and translates them into a single, massive SQL `INSERT` statement.
            # Using the `DATABASE_URL` in our settings, the `psycopg2` driver sends this giant SQL string over the internet to your remote Neon Postgres server in ONE network request.
            # Instead of making 10,000 slow network trips (which would take minutes/hours), we make 1 big trip. That's why 200,000 items seeded in ~60 seconds!
            if len(products_to_create) == batch_size:
                Product.objects.bulk_create(products_to_create)
                self.stdout.write(f"Inserted {i + 1} products into Neon...")
                products_to_create = [] # Reset the list for the next batch
                
        # Insert any leftovers
        if products_to_create:
            Product.objects.bulk_create(products_to_create)
            
        end_time = time.time()
        self.stdout.write(self.style.SUCCESS(f'Successfully created {total_products} products in {end_time - start_time:.2f} seconds!'))
