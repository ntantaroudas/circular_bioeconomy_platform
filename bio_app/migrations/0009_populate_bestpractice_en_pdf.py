from django.db import migrations


def set_en_pdf(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    for bp in BestPractice.objects.filter(title__icontains='Cambium'):
        bp.factsheet_pdf_en = 'factsheets/best_practices/Cambium_vertECO_EN.pdf'
        bp.save()


def reverse(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    BestPractice.objects.filter(title__icontains='Cambium').update(factsheet_pdf_en='')


class Migration(migrations.Migration):

    dependencies = [
        ('bio_app', '0008_add_bestpractice_factsheet_en'),
    ]

    operations = [
        migrations.RunPython(set_en_pdf, reverse),
    ]
