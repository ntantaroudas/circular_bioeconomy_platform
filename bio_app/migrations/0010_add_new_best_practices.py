from django.db import migrations


def add_best_practices(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')

    practices = [
        {
            'title': 'BeanSaver - Upcycling Coffee Grounds',
            'description': 'BeanSaver\u00ae is an Austrian company specializing in the reuse of coffee residues. The focus lies on the development and production of an organic fertilizer based on coffee grounds, combined with sheep wool and wood. The aim is to use this by-product as a valuable resource, return it to natural material cycles, and reintroduce it into economic utilization cycles.',
            'link': 'https://www.beansaver.at/',
            'factsheet_pdf_en': 'factsheets/best_practices/BeanSaver_EN.pdf',
        },
        {
            'title': 'futureBloc - S',
            'description': 'Recycling wall system with natural insulation materials. futureBloc - S is a research and development project by Salzburg Wohnbau, Fachhochschule Salzburg and several regional partner companies. The aim is to develop a circular wall system that is largely based on regional secondary raw materials, using materials from building demolition as a resource instead of relying on primary materials.',
            'link': 'https://www.salzburg-wohnbau.at/futurebloc-salzburg-recycling-wandaufbau-mit-natuerlichen-daemmstoffen/',
            'factsheet_pdf_en': 'factsheets/best_practices/futureBloc_S_EN.pdf',
        },
        {
            'title': 'Unverschwendet',
            'description': 'Upcycling surplus food into high-quality products. Unverschwendet is an Austrian company based in Vienna that focuses on rescuing and utilizing surplus food. In close cooperation with agricultural businesses and producers, the company uses raw food materials that cannot be sold due to overproduction, visual imperfections or lack of market demand, transforming them into jams, syrups, chutneys and sauces.',
            'link': 'https://www.unverschwendet.at/',
            'factsheet_pdf_en': 'factsheets/best_practices/Unverschwendet_EN.pdf',
        },
    ]

    for p in practices:
        BestPractice.objects.create(**p)


def reverse(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    BestPractice.objects.filter(
        title__in=[
            'BeanSaver - Upcycling Coffee Grounds',
            'futureBloc - S',
            'Unverschwendet',
        ]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('bio_app', '0009_populate_bestpractice_en_pdf'),
    ]

    operations = [
        migrations.RunPython(add_best_practices, reverse),
    ]
