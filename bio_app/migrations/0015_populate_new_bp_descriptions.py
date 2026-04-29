from django.db import migrations


# Bilingual descriptions extracted from the Alchemia Nova factsheet PDFs and
# condensed to the same Cambium-style format already used on the page (a
# short tagline followed by a 1–2-sentence project summary).
NEW_BP_CONTENT = {
    'BauKarussell': {
        'link': 'https://www.baukarussell.at/',
        'description_en': (
            'Circular deconstruction and reuse of building components. BauKarussell '
            'is an Austrian cooperative based in Vienna that uses a "Social Urban '
            'Mining" approach to analyse buildings, identify reusable materials, and '
            'organise their selective dismantling and redistribution — combining '
            'material reuse with qualification and employment for people distant '
            'from the labour market.'
        ),
        'description_de': (
            'Zirkulärer Rückbau und Wiederverwendung von Bauteilen. BauKarussell ist '
            'eine österreichische Genossenschaft mit Sitz in Wien, die mit dem Ansatz '
            'des „Social Urban Mining" Gebäude analysiert, wiederverwendbare '
            'Materialien identifiziert und deren gezielte Demontage und '
            'Weitervermittlung organisiert — und verbindet Materialkreisläufe mit '
            'Qualifizierung und Beschäftigung arbeitsmarktferner Personen.'
        ),
    },
    'HummusPLUS': {
        'link': 'https://www.humusplus.at/',
        'description_en': (
            'Humus build-up as a circular model for climate-positive agriculture. '
            'HUMUS+ is an Austrian programme of the Ökoregion Kaindorf that supports '
            'farms in implementing humus-building land management practices, backed '
            'by scientific monitoring of soil carbon and nutrient cycles, and '
            'integrates participating farmers into a network for knowledge transfer '
            'and long-term implementation.'
        ),
        'description_de': (
            'Humusaufbau als Kreislaufmodell für klimapositive Landwirtschaft. '
            'HUMUS+ ist ein österreichisches Programm der Ökoregion Kaindorf, das '
            'landwirtschaftliche Betriebe bei humusaufbauenden '
            'Bewirtschaftungsmaßnahmen unterstützt, den Fortschritt durch '
            'wissenschaftliches Monitoring begleitet und Landwirt*innen in ein '
            'Netzwerk für Wissenstransfer einbindet.'
        ),
    },
    'Hut&Stiel': {
        'link': 'https://www.hutundstiel.at/',
        'description_en': (
            'Mushrooms from coffee grounds — circular economy in the heart of '
            'Vienna. Hut & Stiel collects spent coffee grounds from Viennese coffee '
            'houses and gastronomy and uses them as a nutrient substrate to '
            'cultivate edible mushrooms; the harvest is marketed regionally and the '
            'used substrate is composted as fertiliser, closing a local urban food '
            'loop.'
        ),
        'description_de': (
            'Pilze aus Kaffeesatz — Kreislaufwirtschaft mitten in Wien. Hut & Stiel '
            'sammelt Kaffeesatz aus Wiener Kaffeehäusern und Gastronomiebetrieben '
            'und nutzt ihn als Nährsubstrat für die Kultivierung von Speisepilzen; '
            'die Ernte wird regional vermarktet und das verbrauchte Substrat wird '
            'als Dünger in den natürlichen Kreislauf zurückgeführt.'
        ),
    },
    'Kern Tec': {
        'link': 'https://www.kern-tec.com/',
        'description_en': (
            'Upcycling stone fruit pits into high-value raw materials. Kern Tec is '
            'an Austrian B2B supplier that uses unused stone fruit pits — from '
            'apricots, cherries or plums — as starting material to produce '
            'plant-based pastes, oils and functional ingredients for the food and '
            'cosmetics industries, transforming a previously discarded side stream '
            'into circular value chains.'
        ),
        'description_de': (
            'Upcycling von Steinobstkernen zu hochwertigen Rohstoffen. Kern Tec ist '
            'ein österreichisches B2B-Unternehmen, das ungenutzte Steinobstkerne — '
            'etwa von Marillen, Kirschen oder Zwetschken — zu pflanzlichen Pasten, '
            'Ölen und funktionellen Inhaltsstoffen für die Lebensmittel- und '
            'Kosmetikindustrie verarbeitet und so bisher entsorgte Nebenströme in '
            'zirkuläre Wertschöpfungsketten überführt.'
        ),
    },
    'blün': {
        'link': 'https://bluen.at/pages/aquaponik',
        'description_en': (
            'Aquaponics — food production in a closed-loop system. blün is a '
            'Vienna-based food producer that combines fish farming and vegetable '
            'cultivation in an integrated aquaponics system: nutrient-rich fish '
            'water fertilises the plants, the plants in turn purify the water, and '
            'food is produced without external fertilisers or wastewater.'
        ),
        'description_de': (
            'Aquaponik — Lebensmittelproduktion im geschlossenen Kreislauf. blün ist '
            'ein Wiener Lebensmittelproduzent, der Fischzucht und Gemüseanbau in '
            'einer integrierten Aquaponik-Anlage verbindet: Nährstoffreiches '
            'Fischwasser düngt die Pflanzen, die Pflanzen reinigen das Wasser, und '
            'Lebensmittel entstehen ohne externe Düngemittel oder Abwasser.'
        ),
    },
    'noamol': {
        'link': 'https://www.noamol.at/',
        'description_en': (
            'Regional network for reuse and circular economy. noamol is a non-profit '
            'association in Tyrol that connects municipalities, social enterprises '
            'and citizens around reuse, sharing and repair, operating an online '
            'platform together with physical drop-off infrastructure (the noamol '
            'box) so everyday goods stay in circulation longer and recycling '
            'becomes a last resort.'
        ),
        'description_de': (
            'Regionale Kreislaufwirtschaft durch Wiederverwendung. noamol ist ein '
            'gemeinnütziger Tiroler Verein, der Gemeinden, Sozialbetriebe und '
            'Bürger*innen rund um Re-Use, Sharing und Reparatur vernetzt — über eine '
            'Online-Plattform und physische Sammelinfrastruktur (die noamol-Box) '
            'bleiben Alltagsgüter länger im Umlauf und Recycling wird zum letzten '
            'Schritt.'
        ),
    },
}


def populate(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    for title, fields in NEW_BP_CONTENT.items():
        BestPractice.objects.filter(title_en=title).update(**fields)


def reverse(apps, schema_editor):
    BestPractice = apps.get_model('bio_app', 'BestPractice')
    BestPractice.objects.filter(title_en__in=NEW_BP_CONTENT.keys()).update(
        link='', description_en='', description_de=''
    )


class Migration(migrations.Migration):

    dependencies = [
        ('bio_app', '0014_add_stub_entries'),
    ]

    operations = [
        migrations.RunPython(populate, reverse),
    ]
