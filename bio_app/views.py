from django.shortcuts import render

# Create your views here.
#Home Page
def home(request):
    return render(request, 'bio_app/home.html')


#About Page
def about(request):
    return render(request, 'bio_app/about.html')


def scenario_analysis(request):
    return render(request, 'bio_app/scenario_analysis.html')


#Best Practices Page
def best_practices(request):
    return render(request, 'bio_app/best_practices.html')


#FAQ Page
def contact(request):
    return render(request, 'bio_app/contact.html')

