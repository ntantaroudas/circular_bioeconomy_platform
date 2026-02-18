from django.db import models

# Create your models here.
class BestPractice(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField()  # Link to the external source
    factsheet_pdf = models.FileField(upload_to='factsheets/best_practices/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class VacantBuilding(models.Model):
    TYPE_OF_USE_CHOICES = [
        ('temporary', 'Temporary'),
        ('long_term', 'Long-term'),
        ('permanent', 'Permanent'),
    ]
    PREVIOUS_USE_CHOICES = [
        ('residential', 'Residential'),
        ('industry', 'Industry'),
        ('gastronomy', 'Gastronomy'),
        ('small_retail', 'Small retail space'),
        ('large_retail', 'Large retail space'),
    ]
    FACILITY_SIZE_CHOICES = [
        ('15_40', '15–40 m²'),
        ('40_100', '40–100 m²'),
        ('100_200', '100–200 m²'),
        ('over_200', '>200 m²'),
    ]
    REACHABILITY_CHOICES = [
        ('very_central', 'Very Central'),
        ('central', 'Central'),
        ('somewhat_central', 'Somewhat Central'),
        ('not_central', 'Not centrally located'),
    ]
    GOVERNANCE_CHOICES = [
        ('civil_society', 'Civil society organisations'),
        ('public', 'Public'),
        ('private', 'Private'),
        ('mixed', 'Mixed or other models'),
    ]
    PREVIOUS_STATE_CHOICES = [
        ('poor', 'Poor'),
        ('moderate', 'Moderate'),
        ('excellent', 'Excellent'),
    ]

    name = models.CharField(max_length=255)
    address = models.TextField()
    area_sq_ft = models.DecimalField(max_digits=10, decimal_places=2)
    available_from = models.DateField()
    year = models.IntegerField(default=2023)
    floor = models.IntegerField()
    proposed_purpose = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    type_of_use = models.CharField(max_length=20, choices=TYPE_OF_USE_CHOICES, blank=True, null=True)
    previous_use = models.CharField(max_length=20, choices=PREVIOUS_USE_CHOICES, blank=True, null=True)
    facility_size = models.CharField(max_length=10, choices=FACILITY_SIZE_CHOICES, blank=True, null=True)
    reachability = models.CharField(max_length=20, choices=REACHABILITY_CHOICES, blank=True, null=True)
    governance = models.CharField(max_length=20, choices=GOVERNANCE_CHOICES, blank=True, null=True)
    previous_state = models.CharField(max_length=10, choices=PREVIOUS_STATE_CHOICES, blank=True, null=True)

    factsheet_pdf_en = models.FileField(upload_to='factsheets/vacant_buildings/en/', blank=True, null=True)
    factsheet_pdf_de = models.FileField(upload_to='factsheets/vacant_buildings/de/', blank=True, null=True)

    def __str__(self):
        return self.name


