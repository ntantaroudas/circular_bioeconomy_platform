from django.contrib import admin
from .models import BestPractice, VacantBuilding, Interest

class InterestAdmin(admin.ModelAdmin):
    list_display = ('building', 'name', 'email', 'message', 'date_submitted')
    search_fields = ('name', 'email', 'building__name')  # Allows searching by name, email, and building name
    list_filter = ('date_submitted',)  # Filter by date submitted

class BestPracticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'link', 'created_at')
    search_fields = ('title', 'description')  # Allows searching by title and description
    list_filter = ('created_at',)  # Filter by creation date

class VacantBuildingAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'address', 'area_sq_ft', 'available_from', 
        'year', 'floor', 'proposed_purpose', 'latitude', 'longitude'
    )    
    search_fields = ('name', 'address', 'proposed_purpose')  # Allows searching by name, address, and proposed purpose
    list_filter = ('year', 'floor', 'available_from')  # Filter by year, floor, and available from date

# Register your models here
admin.site.register(BestPractice, BestPracticeAdmin)
admin.site.register(Interest, InterestAdmin)
admin.site.register(VacantBuilding, VacantBuildingAdmin)
