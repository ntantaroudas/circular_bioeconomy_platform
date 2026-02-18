from django.contrib import admin
from .models import BestPractice, VacantBuilding

class BestPracticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'link', 'factsheet_pdf', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('created_at',)

class VacantBuildingAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'address', 'area_sq_ft', 'available_from',
        'year', 'floor', 'proposed_purpose',
        'type_of_use', 'previous_use', 'facility_size',
        'reachability', 'governance', 'previous_state',
    )
    search_fields = ('name', 'address', 'proposed_purpose')
    list_filter = (
        'year', 'floor', 'available_from',
        'type_of_use', 'previous_use', 'facility_size',
        'reachability', 'governance', 'previous_state',
    )

# Register your models here
admin.site.register(BestPractice, BestPracticeAdmin)
admin.site.register(VacantBuilding, VacantBuildingAdmin)
