from django import forms

class InterestForm(forms.Form):
    name = forms.CharField(max_length=255, label="Your Name")
    email = forms.EmailField(label="Your Email")
    message = forms.CharField(widget=forms.Textarea, label="Message")