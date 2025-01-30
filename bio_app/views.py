from django.shortcuts import render, redirect, get_object_or_404
from .models import BestPractice, VacantBuilding, Interest
from django.db.models import Q  # Import Q for complex queries
from django.core.mail import EmailMessage
from django.contrib import messages  # For showing success messages
from django.core.paginator import Paginator
from .forms import InterestForm



# Create your views here.
#Home Page
def home(request):
    return render(request, 'bio_app/home.html')


#About Page
def about(request):
    return render(request, 'bio_app/about.html')

# Scenario Analysis Page
def scenario_analysis(request):
    return render(request, 'bio_app/scenario_analysis.html')


# Vacant Buildings Page
def vacant_buildings(request):
    query = request.GET.get('search', '')
    if query:
        vacant_buildings = VacantBuilding.objects.filter(
            Q(name__icontains=query) |
            Q(address__icontains=query) |
            Q(proposed_purpose__icontains=query) |
            Q(description__icontains=query) |
            Q(year__icontains=query)
        )
    else:
        vacant_buildings = VacantBuilding.objects.all()

    # Add pagination (set to 10 items per page)
    paginator = Paginator(vacant_buildings, 10)  # Adjust the number if needed
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {'page_obj': page_obj, 'query': query}
    return render(request, 'bio_app/vacant_buildings.html', context)


# Best Practices Page with search and pagination functionality
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

    # Pagination settings: Show 8 best practices per page
    paginator = Paginator(best_practices_list, 8)  # Show 10 best practices per page

    page_number = request.GET.get('page')  # Get the current page number
    best_practices = paginator.get_page(page_number)  # Get the best practices for the current page

    context = {
        'best_practices': best_practices,  # Paginated best practices
        'query': query
    }

    return render(request, 'bio_app/best_practices.html', context)


# Contact Page with Email Sending functionality
def contact(request):
    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        print(f"Received POST request: Full Name: {full_name}, Email: {email}, Message: {message}")

        # Compose the email
        email_subject = f"Contact Form Submission from {full_name}"
        email_body = f"Name: {full_name}\nEmail: {email}\n\nMessage:\n{message}"

        # Send the email
        try:
            email_message = EmailMessage(
                email_subject, email_body, 'ntantaroudas@gmail.com', ['ntantaroudas@gmail.com']
            )
            email_message.send()
            messages.success(request, 'Your message has been sent successfully!')
            print("Email sent successfully!")

        except Exception as e:
            messages.error(request, f'Error sending your message: {e}')
            print(f"Error sending email: {e}")

        return redirect('contact')  # Redirect back to the contact page after submission

    return render(request, 'bio_app/contact.html')


#Express Interest View
def express_interest(request, building_id):
    building = get_object_or_404(VacantBuilding, id=building_id)
    if request.method == 'POST':
        form = InterestForm(request.POST)
        if form.is_valid():
            Interest.objects.create(
                building=building,
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                message=form.cleaned_data['message']
            )
            return redirect('vacant_buildings')
    else:
        form = InterestForm()
    return render(request, 'bio_app/express_interest.html', {'form': form, 'building': building})