from django.shortcuts import render
from .models import BestPractice
from django.db.models import Q  # Import Q for complex queries

# Create your views here.
#Home Page
def home(request):
    return render(request, 'bio_app/home.html')


#About Page
def about(request):
    return render(request, 'bio_app/about.html')


def scenario_analysis(request):
    return render(request, 'bio_app/scenario_analysis.html')


# Best Practices Page with search functionality
def best_practices(request):
    query = request.GET.get('q')  # Get the search query from the request
    if query:
        # If there's a search query, filter the BestPractice model based on title or description
        best_practices_list = BestPractice.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        )
    else:
        # If no search query, return all BestPractice objects
        best_practices_list = BestPractice.objects.all()

    context = {
        'best_practices': best_practices_list,
        'query': query
    }

    return render(request, 'bio_app/best_practices.html', context)


#FAQ Page
def contact(request):
    return render(request, 'bio_app/contact.html')

