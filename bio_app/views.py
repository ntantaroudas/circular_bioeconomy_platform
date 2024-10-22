from django.shortcuts import render

# Create your views here.

#Home Page
def home(request):
    return render(request, 'bio_app/home.html')


#About Page
def about(request):
    return render(request, 'bio_app/about.html')


#Scenarios Analysis Page
def scenarios_analysis(request):
    return render(request, 'bio_app/scenarios_analysis.html')


#Best Practices Page
def best_practices(request):
    return render(request, 'bio_app/best_practices.html')


#FAQ Page
def faq(request):
    return render(request, 'bio_app/faq.html')

