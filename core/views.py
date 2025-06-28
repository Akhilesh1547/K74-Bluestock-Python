from django.shortcuts import render
from rest_framework import viewsets
from .models import Company, IPO, Document
from .serializers import CompanySerializer, IPOSerializer, DocumentSerializer
from django.contrib.auth.decorators import login_required


# Create your views here.

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class IPOViewSet(viewsets.ModelViewSet):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

def index(request):
    return render(request, 'index.html')

@login_required
def admin_dashboard(request):
    return render(request, 'admin.html')
