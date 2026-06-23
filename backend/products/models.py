import uuid
from django.db import models

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, db_index=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Sort by newest first by default
        ordering = ['-created_at', '-id']
        # CRITICAL: This composite index makes cursor pagination fast!
        indexes = [
            models.Index(fields=['-created_at', '-id']),
        ]

    def __str__(self):
        return self.name
