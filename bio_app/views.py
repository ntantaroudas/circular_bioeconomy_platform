from django.shortcuts import render, redirect
from .models import BestPractice, VacantBuilding
from django.db.models import Q
from django.core.mail import EmailMessage
from django.contrib import messages
from django.core.paginator import Paginator
from django.utils import translation


def get_template_name(base_template_name):
    """Helper function to get the correct template based on current language"""
    current_language = translation.get_language()
    if current_language == 'de':
        # Insert _de before .html
        parts = base_template_name.rsplit('.', 1)
        if len(parts) == 2:
            return f"{parts[0]}_de.{parts[1]}"
    return base_template_name


# Create your views here.
#Home Page
def home(request):
    template_name = get_template_name('bio_app/home.html')
    return render(request, template_name)


#About Page
def about(request):
    template_name = get_template_name('bio_app/about.html')
    return render(request, template_name)

# Scenario Analysis Page
def scenario_analysis(request):
    template_name = get_template_name('bio_app/scenario_analysis.html')
    return render(request, template_name)


# Vacant Buildings Page
def vacant_buildings(request):
    query = request.GET.get('search', '')
    vacant_buildings_list = VacantBuilding.objects.all()

    if query:
        vacant_buildings_list = vacant_buildings_list.filter(
            Q(name__icontains=query) |
            Q(address__icontains=query) |
            Q(proposed_purpose__icontains=query) |
            Q(description__icontains=query) |
            Q(year__icontains=query)
        )

    # Category filters
    filter_fields = ['type_of_use', 'previous_use', 'facility_size', 'reachability', 'governance', 'previous_state']
    active_filters = {}
    for field in filter_fields:
        value = request.GET.get(field, '')
        if value:
            active_filters[field] = value
            vacant_buildings_list = vacant_buildings_list.filter(**{field: value})

    # Pagination
    paginator = Paginator(vacant_buildings_list, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'page_obj': page_obj,
        'query': query,
        'active_filters': active_filters,
        'filter_choices': {
            'type_of_use': VacantBuilding.TYPE_OF_USE_CHOICES,
            'previous_use': VacantBuilding.PREVIOUS_USE_CHOICES,
            'facility_size': VacantBuilding.FACILITY_SIZE_CHOICES,
            'reachability': VacantBuilding.REACHABILITY_CHOICES,
            'governance': VacantBuilding.GOVERNANCE_CHOICES,
            'previous_state': VacantBuilding.PREVIOUS_STATE_CHOICES,
        },
    }
    template_name = get_template_name('bio_app/vacant_buildings.html')
    return render(request, template_name, context)


# Best Practices Page with search and pagination functionality
def best_practices(request):
    query = request.GET.get('q', '').strip()

    if query:
        best_practices_list = BestPractice.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        )
    else:
        best_practices_list = BestPractice.objects.all()

    paginator = Paginator(best_practices_list, 8)
    page_number = request.GET.get('page')
    best_practices = paginator.get_page(page_number)

    context = {
        'best_practices': best_practices,
        'query': query,
    }

    template_name = get_template_name('bio_app/best_practices.html')
    return render(request, template_name, context)


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

    template_name = get_template_name('bio_app/contact.html')
    return render(request, template_name)


