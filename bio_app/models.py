from django.db import models

# Create your models here.
class BestPractice(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField()  # Link to the external source
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title