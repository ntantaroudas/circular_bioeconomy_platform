from django.db import models
from django.utils.translation import get_language


def _localised(obj, base_field):
    lang = (get_language() or "en").split("-")[0].lower()
    suffix = "de" if lang == "de" else "en"
    value = getattr(obj, f"{base_field}_{suffix}", None)
    if value:
        return value
    return getattr(obj, f"{base_field}_en", None) or getattr(obj, f"{base_field}_de", None) or ""


class BestPractice(models.Model):
    title_en = models.CharField(max_length=200, blank=True, default="")
    title_de = models.CharField(max_length=200, blank=True, default="")
    description_en = models.TextField(blank=True, default="")
    description_de = models.TextField(blank=True, default="")
    link = models.URLField(blank=True, default='')
    factsheet_pdf_en = models.FileField(upload_to='factsheets/best_practices/', blank=True, null=True)
    factsheet_pdf_de = models.FileField(upload_to='factsheets/best_practices/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def title(self):
        return _localised(self, "title")

    @property
    def description(self):
        return _localised(self, "description")

    @property
    def factsheet_pdf(self):
        return _localised(self, "factsheet_pdf")

    def __str__(self):
        return self.title_en or self.title_de or f"BestPractice #{self.pk}"


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
    proposed_purpose_en = models.CharField(max_length=255, blank=True, default="")
    proposed_purpose_de = models.CharField(max_length=255, blank=True, default="")
    description_en = models.TextField(blank=True, default="")
    description_de = models.TextField(blank=True, default="")
    type_of_use = models.CharField(max_length=20, choices=TYPE_OF_USE_CHOICES, blank=True, null=True)
    previous_use = models.CharField(max_length=20, choices=PREVIOUS_USE_CHOICES, blank=True, null=True)
    facility_size = models.CharField(max_length=10, choices=FACILITY_SIZE_CHOICES, blank=True, null=True)
    reachability = models.CharField(max_length=20, choices=REACHABILITY_CHOICES, blank=True, null=True)
    governance = models.CharField(max_length=20, choices=GOVERNANCE_CHOICES, blank=True, null=True)
    previous_state = models.CharField(max_length=10, choices=PREVIOUS_STATE_CHOICES, blank=True, null=True)

    factsheet_pdf_en = models.FileField(upload_to='factsheets/vacant_buildings/en/', blank=True, null=True)
    factsheet_pdf_de = models.FileField(upload_to='factsheets/vacant_buildings/de/', blank=True, null=True)

    @property
    def proposed_purpose(self):
        return _localised(self, "proposed_purpose")

    @property
    def description(self):
        return _localised(self, "description")

    @property
    def factsheet_pdf(self):
        return _localised(self, "factsheet_pdf")

    def __str__(self):
        return self.name
