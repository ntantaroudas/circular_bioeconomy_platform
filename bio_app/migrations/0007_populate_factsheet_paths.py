from django.db import migrations


def populate_data(apps, schema_editor):
    VacantBuilding = apps.get_model('bio_app', 'VacantBuilding')
    BestPractice = apps.get_model('bio_app', 'BestPractice')

    # Clear old data
    VacantBuilding.objects.all().delete()
    BestPractice.objects.all().delete()

    # Create correct vacant building records
    buildings = [
        {
            'name': 'Altes Milchhaus',
            'address': '',
            'area_sq_ft': '0.00',
            'available_from': '2026-02-16',
            'year': 2024,
            'floor': 0,
            'type_of_use': 'permanent',
            'previous_use': 'small_retail',
            'facility_size': '100_200',
            'reachability': 'very_central',
            'governance': 'private',
            'previous_state': 'poor',
            'factsheet_pdf_en': 'factsheets/vacant_buildings/en/Altes_Milchhaus_EN.pdf',
            'factsheet_pdf_de': 'factsheets/vacant_buildings/de/Altes_Milchhaus_DE.pdf',
        },
        {
            'name': 'Arbeit im Dorf',
            'address': '',
            'area_sq_ft': '0.00',
            'available_from': '2026-02-16',
            'year': 2024,
            'floor': 0,
            'type_of_use': 'long_term',
            'previous_use': 'residential',
            'facility_size': '40_100',
            'reachability': 'very_central',
            'governance': 'civil_society',
            'previous_state': 'moderate',
            'factsheet_pdf_en': 'factsheets/vacant_buildings/en/Arbeit_im_Dorf_EN.pdf',
            'factsheet_pdf_de': 'factsheets/vacant_buildings/de/Arbeit_im_Dorf_DE.pdf',
        },
        {
            'name': 'Die Giesserei',
            'address': '',
            'area_sq_ft': '0.00',
            'available_from': '2026-02-16',
            'year': 2024,
            'floor': 0,
            'type_of_use': 'permanent',
            'previous_use': 'industry',
            'facility_size': 'over_200',
            'reachability': 'very_central',
            'governance': 'civil_society',
            'previous_state': 'poor',
            'factsheet_pdf_en': 'factsheets/vacant_buildings/en/Die_Giesserei_EN.pdf',
            'factsheet_pdf_de': 'factsheets/vacant_buildings/de/Die_Giesserei_DE.pdf',
        },
        {
            'name': 'Leutkircher B\u00fcrgerbahnhof',
            'address': '',
            'area_sq_ft': '0.00',
            'available_from': '2026-02-16',
            'year': 2024,
            'floor': 0,
            'type_of_use': 'permanent',
            'previous_use': 'industry',
            'facility_size': 'over_200',
            'reachability': 'very_central',
            'governance': 'civil_society',
            'previous_state': 'poor',
            'factsheet_pdf_en': 'factsheets/vacant_buildings/en/Leutkircher_Buergerbahnhof_EN.pdf',
            'factsheet_pdf_de': 'factsheets/vacant_buildings/de/Leutkircher_Buergerbahnhof_DE.pdf',
        },
        {
            'name': 'Dorfplatz St.Andr\u00e4-W\u00f6rdern',
            'address': '',
            'area_sq_ft': '0.00',
            'available_from': '2026-02-16',
            'year': 2024,
            'floor': 0,
            'type_of_use': 'long_term',
            'previous_use': 'residential',
            'facility_size': 'over_200',
            'reachability': 'very_central',
            'governance': 'mixed',
            'previous_state': 'moderate',
            'factsheet_pdf_en': 'factsheets/vacant_buildings/en/Dorfplatz_St_Andrae_Woerdern_EN.pdf',
            'factsheet_pdf_de': 'factsheets/vacant_buildings/de/Dorfplatz_St_Andrae_Woerdern_DE.pdf',
        },
    ]

    for b in buildings:
        VacantBuilding.objects.create(**b)

    # Create correct best practice records
    BestPractice.objects.create(
        title='Cambium - vertECO',
        description='Closing water and nutrient cycles. Cambium in Fehring (Styria, Austria) transforms a former barracks into a sustainable living place for over 70 people, using the vertECO system for wastewater treatment and reuse.',
        link='https://www.cambium.at/',
        factsheet_pdf='factsheets/best_practices/Cambium_vertECO_DE.pdf',
    )


def reverse_data(apps, schema_editor):
    VacantBuilding = apps.get_model('bio_app', 'VacantBuilding')
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    VacantBuilding.objects.all().delete()
    BestPractice.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('bio_app', '0006_remove_vacantbuilding_latitude_and_more'),
    ]

    operations = [
        migrations.RunPython(populate_data, reverse_data),
    ]
