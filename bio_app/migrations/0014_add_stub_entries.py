from datetime import date
from django.db import migrations


# Stub entries created from the Alchemia Nova content drop. The factsheet PDFs
# are the source of truth, and the filter categorisation comes from the
# Alchemia Nova taxonomy spreadsheet (gid=830779114). Bilingual title/
# description/link metadata is empty for now and will be filled in via Django
# admin once Alchemia Nova provides the per-entry text.

NEW_BEST_PRACTICES = [
    {'slug': 'BauKarussell', 'title': 'BauKarussell'},
    {'slug': 'HummusPLUS', 'title': 'HummusPLUS'},
    {'slug': 'HutStiel', 'title': 'Hut&Stiel'},
    {'slug': 'KernTec', 'title': 'Kern Tec'},
    {'slug': 'bluen', 'title': 'blün'},
    {'slug': 'noamol', 'title': 'noamol'},
]

# Filter categorisation per Alchemia Nova taxonomy spreadsheet.
NEW_VACANT_BUILDINGS = [
    {
        'slug': 'Coconat', 'name': 'Coconat',
        'type_of_use': 'long_term', 'previous_use': 'residential',
        'facility_size': 'over_200', 'reachability': 'not_central',
        'governance': 'private', 'previous_state': 'excellent',
    },
    {
        'slug': 'DorfladenboxPinsdorf', 'name': 'Dorfladenbox-Pinsdorf',
        'type_of_use': 'permanent', 'previous_use': 'small_retail',
        'facility_size': '15_40', 'reachability': 'somewhat_central',
        'governance': 'private', 'previous_state': 'excellent',
    },
    {
        'slug': 'GarageGrande', 'name': 'Garage Grande',
        'type_of_use': 'temporary', 'previous_use': 'industry',
        'facility_size': 'over_200', 'reachability': 'central',
        'governance': 'mixed', 'previous_state': 'moderate',
    },
    {
        'slug': 'GutZiegenberg', 'name': 'Gut Ziegenberg',
        'type_of_use': 'long_term', 'previous_use': 'residential',
        'facility_size': 'over_200', 'reachability': 'not_central',
        'governance': 'civil_society', 'previous_state': 'poor',
    },
    {
        'slug': 'Kleinstadtbiotop', 'name': 'Kleinstadtbiotop',
        'type_of_use': 'long_term', 'previous_use': 'large_retail',
        'facility_size': 'over_200', 'reachability': 'very_central',
        'governance': 'mixed', 'previous_state': 'moderate',
    },
    {
        'slug': 'RAZ', 'name': 'RAZ - Raum auf Zeit',
        'type_of_use': 'temporary', 'previous_use': 'small_retail',
        'facility_size': '40_100', 'reachability': 'central',
        'governance': 'mixed', 'previous_state': 'excellent',
    },
    {
        'slug': 'Wirtshauslabor', 'name': 'Wirtshaus Labor',
        'type_of_use': 'temporary', 'previous_use': 'gastronomy',
        'facility_size': '40_100', 'reachability': 'somewhat_central',
        'governance': 'mixed', 'previous_state': 'excellent',
    },
    {
        'slug': 'bugo', 'name': 'bugo',
        'type_of_use': 'permanent', 'previous_use': 'large_retail',
        'facility_size': 'over_200', 'reachability': 'very_central',
        'governance': 'public', 'previous_state': 'poor',
    },
    {
        'slug': 'spielboden', 'name': 'spielboden',
        'type_of_use': 'permanent', 'previous_use': 'industry',
        'facility_size': 'over_200', 'reachability': 'somewhat_central',
        'governance': 'civil_society', 'previous_state': 'moderate',
    },
]


def add_stubs(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    VacantBuilding = apps.get_model('bio_app', 'VacantBuilding')

    for bp in NEW_BEST_PRACTICES:
        if BestPractice.objects.filter(title_en=bp['title']).exists():
            continue
        BestPractice.objects.create(
            title_en=bp['title'],
            title_de=bp['title'],
            description_en='',
            description_de='',
            link='',
            factsheet_pdf_en=f"factsheets/best_practices/BP_{bp['slug']}_EN.pdf",
            factsheet_pdf_de=f"factsheets/best_practices/BP_{bp['slug']}_DE.pdf",
        )

    for vb in NEW_VACANT_BUILDINGS:
        if VacantBuilding.objects.filter(name=vb['name']).exists():
            continue
        VacantBuilding.objects.create(
            name=vb['name'],
            address='',
            area_sq_ft=0,
            available_from=date(2026, 4, 28),
            year=2024,
            floor=0,
            proposed_purpose_en='',
            proposed_purpose_de='',
            description_en='',
            description_de='',
            type_of_use=vb['type_of_use'],
            previous_use=vb['previous_use'],
            facility_size=vb['facility_size'],
            reachability=vb['reachability'],
            governance=vb['governance'],
            previous_state=vb['previous_state'],
            factsheet_pdf_en=f"factsheets/vacant_buildings/en/VB_{vb['slug']}_EN.pdf",
            factsheet_pdf_de=f"factsheets/vacant_buildings/de/VB_{vb['slug']}_DE.pdf",
        )


def remove_stubs(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    VacantBuilding = apps.get_model('bio_app', 'VacantBuilding')
    BestPractice.objects.filter(title_en__in=[b['title'] for b in NEW_BEST_PRACTICES]).delete()
    VacantBuilding.objects.filter(name__in=[v['name'] for v in NEW_VACANT_BUILDINGS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('bio_app', '0013_allow_blank_link'),
    ]

    operations = [
        migrations.RunPython(add_stubs, remove_stubs),
    ]
