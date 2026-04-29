from django.db import migrations


# Map old factsheet paths (legacy filenames containing inconsistent naming
# e.g. spaces, ampersands, "Cambium_vertECO_*") to the new URL-safe filenames
# under media/factsheets/{best_practices,vacant_buildings}/...
BP_PATH_MAP = {
    'factsheets/best_practices/Cambium_vertECO_DE.pdf': 'factsheets/best_practices/BP_Cambium_DE.pdf',
    'factsheets/best_practices/Cambium_vertECO_EN.pdf': 'factsheets/best_practices/BP_Cambium_EN.pdf',
    'factsheets/best_practices/BeanSaver_EN.pdf': 'factsheets/best_practices/BP_BeanSaver_EN.pdf',
    'factsheets/best_practices/futureBloc_S_EN.pdf': 'factsheets/best_practices/BP_FUTUREBLOC_EN.pdf',
    'factsheets/best_practices/Unverschwendet_EN.pdf': 'factsheets/best_practices/BP_Unverschwendet_EN.pdf',
}

VB_PATH_MAP = {
    # English
    'factsheets/vacant_buildings/en/Altes_Milchhaus_EN.pdf': 'factsheets/vacant_buildings/en/VB_AltesMilchhaus_EN.pdf',
    'factsheets/vacant_buildings/en/Arbeit_im_Dorf_EN.pdf': 'factsheets/vacant_buildings/en/VB_ArbeitImDorf_EN.pdf',
    'factsheets/vacant_buildings/en/Die_Giesserei_EN.pdf': 'factsheets/vacant_buildings/en/VB_DieGiesserei_EN.pdf',
    'factsheets/vacant_buildings/en/Leutkircher_Buergerbahnhof_EN.pdf': 'factsheets/vacant_buildings/en/VB_LeutkircherBuergerbahnhof_EN.pdf',
    'factsheets/vacant_buildings/en/Dorfplatz_St_Andrae_Woerdern_EN.pdf': 'factsheets/vacant_buildings/en/VB_DorfplatzStAndraeWoerdern_EN.pdf',
    # German
    'factsheets/vacant_buildings/de/Altes_Milchhaus_DE.pdf': 'factsheets/vacant_buildings/de/VB_AltesMilchhaus_DE.pdf',
    'factsheets/vacant_buildings/de/Arbeit_im_Dorf_DE.pdf': 'factsheets/vacant_buildings/de/VB_ArbeitImDorf_DE.pdf',
    'factsheets/vacant_buildings/de/Die_Giesserei_DE.pdf': 'factsheets/vacant_buildings/de/VB_DieGiesserei_DE.pdf',
    'factsheets/vacant_buildings/de/Leutkircher_Buergerbahnhof_DE.pdf': 'factsheets/vacant_buildings/de/VB_LeutkircherBuergerbahnhof_DE.pdf',
    'factsheets/vacant_buildings/de/Dorfplatz_St_Andrae_Woerdern_DE.pdf': 'factsheets/vacant_buildings/de/VB_DorfplatzStAndraeWoerdern_DE.pdf',
}

# Cambium previously had no DE factsheet recorded — now it does.
CAMBIUM_DE_PATH = 'factsheets/best_practices/BP_Cambium_DE.pdf'

# BeanSaver, futureBloc, Unverschwendet previously had no DE factsheet recorded.
BP_DE_BACKFILL = {
    'BeanSaver - Upcycling Coffee Grounds': 'factsheets/best_practices/BP_BeanSaver_DE.pdf',
    'futureBloc - S': 'factsheets/best_practices/BP_futureBloc_DE.pdf',
    'Unverschwendet': 'factsheets/best_practices/BP_Unverschwendet_DE.pdf',
}


def update_paths(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    VacantBuilding = apps.get_model('bio_app', 'VacantBuilding')

    # Best Practices: rewrite EN/DE paths if they match the legacy names
    for bp in BestPractice.objects.all():
        changed = False
        for field in ('factsheet_pdf_en', 'factsheet_pdf_de'):
            current = getattr(bp, field)
            if current and str(current) in BP_PATH_MAP:
                setattr(bp, field, BP_PATH_MAP[str(current)])
                changed = True
        # Backfill DE factsheets for entries that historically only had EN
        if not bp.factsheet_pdf_de and bp.title_en in BP_DE_BACKFILL:
            bp.factsheet_pdf_de = BP_DE_BACKFILL[bp.title_en]
            changed = True
        if changed:
            bp.save(update_fields=['factsheet_pdf_en', 'factsheet_pdf_de'])

    # Vacant Buildings: rewrite EN/DE paths if they match the legacy names
    for vb in VacantBuilding.objects.all():
        changed = False
        for field in ('factsheet_pdf_en', 'factsheet_pdf_de'):
            current = getattr(vb, field)
            if current and str(current) in VB_PATH_MAP:
                setattr(vb, field, VB_PATH_MAP[str(current)])
                changed = True
        if changed:
            vb.save(update_fields=['factsheet_pdf_en', 'factsheet_pdf_de'])

    # Remove the placeholder test entry that exists on some environments
    VacantBuilding.objects.filter(name='test', address='farmakidou 46').delete()


def reverse(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    VacantBuilding = apps.get_model('bio_app', 'VacantBuilding')
    bp_reverse = {v: k for k, v in BP_PATH_MAP.items()}
    vb_reverse = {v: k for k, v in VB_PATH_MAP.items()}

    for bp in BestPractice.objects.all():
        for field in ('factsheet_pdf_en', 'factsheet_pdf_de'):
            current = getattr(bp, field)
            if current and str(current) in bp_reverse:
                setattr(bp, field, bp_reverse[str(current)])
        bp.save(update_fields=['factsheet_pdf_en', 'factsheet_pdf_de'])

    for vb in VacantBuilding.objects.all():
        for field in ('factsheet_pdf_en', 'factsheet_pdf_de'):
            current = getattr(vb, field)
            if current and str(current) in vb_reverse:
                setattr(vb, field, vb_reverse[str(current)])
        vb.save(update_fields=['factsheet_pdf_en', 'factsheet_pdf_de'])


class Migration(migrations.Migration):

    dependencies = [
        ('bio_app', '0011_bilingual_content'),
    ]

    operations = [
        migrations.RunPython(update_paths, reverse),
    ]
