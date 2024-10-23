from django.shortcuts import render
from .models import BestPractice

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
    best_practices = BestPractice.objects.all().order_by('-created_at')  # Optional ordering by creation date
    context = {'best_practices': best_practices}
    return render(request, 'bio_app/best_practices.html', context)


#FAQ Page
def contact(request):
    return render(request, 'bio_app/contact.html')

