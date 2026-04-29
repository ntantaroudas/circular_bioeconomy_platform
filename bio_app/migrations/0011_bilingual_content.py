from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bio_app', '0010_add_new_best_practices'),
    ]

    operations = [
        # BestPractice: rename existing single-language columns to *_en (existing
        # content is in English) and add empty *_de columns.
        migrations.RenameField(
            model_name='bestpractice',
            old_name='title',
            new_name='title_en',
        ),
        migrations.RenameField(
            model_name='bestpractice',
            old_name='description',
            new_name='description_en',
        ),
        migrations.RenameField(
            model_name='bestpractice',
            old_name='factsheet_pdf',
            new_name='factsheet_pdf_de',
        ),
        migrations.AlterField(
            model_name='bestpractice',
            name='title_en',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='bestpractice',
            name='description_en',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='bestpractice',
            name='title_de',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
        migrations.AddField(
            model_name='bestpractice',
            name='description_de',
            field=models.TextField(blank=True, default=''),
        ),
        # VacantBuilding: rename existing single-language columns to *_en (the
        # only non-null content in those columns is the English "test" entry,
        # which will be removed by the fixture cleanup).
        migrations.RenameField(
            model_name='vacantbuilding',
            old_name='proposed_purpose',
            new_name='proposed_purpose_en',
        ),
        migrations.RenameField(
            model_name='vacantbuilding',
            old_name='description',
            new_name='description_en',
        ),
        migrations.AlterField(
            model_name='vacantbuilding',
            name='proposed_purpose_en',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='vacantbuilding',
            name='description_en',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='vacantbuilding',
            name='proposed_purpose_de',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AddField(
            model_name='vacantbuilding',
            name='description_de',
            field=models.TextField(blank=True, default=''),
        ),
    ]
