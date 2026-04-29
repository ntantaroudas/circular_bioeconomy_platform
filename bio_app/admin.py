from django.contrib import admin
from .models import BestPractice, VacantBuilding


class BestPracticeAdmin(admin.ModelAdmin):
    list_display = (
        'title_en', 'title_de', 'link',
        'factsheet_pdf_en', 'factsheet_pdf_de', 'created_at',
    )
    search_fields = ('title_en', 'title_de', 'description_en', 'description_de')
    list_filter = ('created_at',)
    fieldsets = (
        ('English', {
            'fields': ('title_en', 'description_en', 'factsheet_pdf_en'),
        }),
        ('German / Deutsch', {
            'fields': ('title_de', 'description_de', 'factsheet_pdf_de'),
        }),
        ('Other', {
            'fields': ('link',),
        }),
    )


class VacantBuildingAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'address', 'area_sq_ft', 'available_from',
        'year', 'floor',
        'proposed_purpose_en', 'proposed_purpose_de',
        'type_of_use', 'previous_use', 'facility_size',
        'reachability', 'governance', 'previous_state',
    )
    search_fields = (
        'name', 'address',
        'proposed_purpose_en', 'proposed_purpose_de',
        'description_en', 'description_de',
    )
    list_filter = (
        'year', 'floor', 'available_from',
        'type_of_use', 'previous_use', 'facility_size',
        'reachability', 'governance', 'previous_state',
    )
    fieldsets = (
        ('Building info', {
            'fields': ('name', 'address', 'area_sq_ft', 'available_from', 'year', 'floor'),
        }),
        ('Filtering categories', {
            'fields': (
                'type_of_use', 'previous_use', 'facility_size',
                'reachability', 'governance', 'previous_state',
            ),
        }),
        ('English content', {
            'fields': ('proposed_purpose_en', 'description_en', 'factsheet_pdf_en'),
        }),
        ('German content / Deutsch', {
            'fields': ('proposed_purpose_de', 'description_de', 'factsheet_pdf_de'),
        }),
    )


admin.site.register(BestPractice, BestPracticeAdmin)
admin.site.register(VacantBuilding, VacantBuildingAdmin)
