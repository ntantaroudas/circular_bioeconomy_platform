from django.db import models

# Create your models here.
class BestPractice(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField()  # Link to the external source
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class VacantBuilding(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    area_sq_ft = models.DecimalField(max_digits=10, decimal_places=2)
    available_from = models.DateField()
    year = models.IntegerField(default=2023)  # Set a numeric default
    floor = models.IntegerField()
    proposed_purpose = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)


    def __str__(self):
        return self.name


class Interest(models.Model):
    building = models.ForeignKey(VacantBuilding, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField(blank=True, null=True)
    date_submitted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Interest in {self.building.name} by {self.name}"