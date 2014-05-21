from django.shortcuts import render

# Create your views here.
def index(request):
  return render(request, 'landing.html',) 

def newtemplate(request):
  return render(request, 'newtemplate.html',)
