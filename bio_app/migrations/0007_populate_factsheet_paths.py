from django.db import migrations


def set_factsheet_paths(apps, schema_editor):
    VacantBuilding = apps.get_model('bio_app', 'VacantBuilding')
    BestPractice = apps.get_model('bio_app', 'BestPractice')

    # Vacant buildings factsheet mappings (by name)
    vb_factsheets = {
        'Altes Milchhaus': {
            'en': 'factsheets/vacant_buildings/en/Altes_Milchhaus_EN.pdf',
            'de': 'factsheets/vacant_buildings/de/Altes_Milchhaus_DE.pdf',
        },
        'Arbeit im Dorf': {
            'en': 'factsheets/vacant_buildings/en/Arbeit_im_Dorf_EN.pdf',
            'de': 'factsheets/vacant_buildings/de/Arbeit_im_Dorf_DE.pdf',
        },
        'Die Giesserei': {
            'en': 'factsheets/vacant_buildings/en/Die_Giesserei_EN.pdf',
            'de': 'factsheets/vacant_buildings/de/Die_Giesserei_DE.pdf',
        },
        'Leutkircher Bürgerbahnhof': {
            'en': 'factsheets/vacant_buildings/en/Leutkircher_Buergerbahnhof_EN.pdf',
            'de': 'factsheets/vacant_buildings/de/Leutkircher_Buergerbahnhof_DE.pdf',
        },
        'Dorfplatz St.Andrä-Wördern': {
            'en': 'factsheets/vacant_buildings/en/Dorfplatz_St_Andrae_Woerdern_EN.pdf',
            'de': 'factsheets/vacant_buildings/de/Dorfplatz_St_Andrae_Woerdern_DE.pdf',
        },
    }

    for name, paths in vb_factsheets.items():
        try:
            vb = VacantBuilding.objects.get(name=name)
            vb.factsheet_pdf_en = paths['en']
            vb.factsheet_pdf_de = paths['de']
            vb.save()
        except VacantBuilding.DoesNotExist:
            pass

    # Best practices factsheet mappings (by title)
    bp_factsheets = {
        'Cambium - vertECO': 'factsheets/best_practices/Cambium_vertECO_DE.pdf',
    }

    for title, path in bp_factsheets.items():
        try:
            bp = BestPractice.objects.get(title=title)
            bp.factsheet_pdf = path
            bp.save()
        except BestPractice.DoesNotExist:
            pass


def clear_factsheet_paths(apps, schema_editor):
    VacantBuilding = apps.get_model('bio_app', 'VacantBuilding')
    BestPractice = apps.get_model('bio_app', 'BestPractice')

    VacantBuilding.objects.all().update(factsheet_pdf_en='', factsheet_pdf_de='')
    BestPractice.objects.all().update(factsheet_pdf='')


class Migration(migrations.Migration):

    dependencies = [
        ('bio_app', '0006_remove_vacantbuilding_latitude_and_more'),
    ]

    operations = [
        migrations.RunPython(set_factsheet_paths, clear_factsheet_paths),
    ]
