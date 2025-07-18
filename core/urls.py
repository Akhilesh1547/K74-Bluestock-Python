from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, IPOViewSet, DocumentViewSet, index, admin_dashboard

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'ipos', IPOViewSet)
router.register(r'documents', DocumentViewSet)

urlpatterns = [
    path('', index, name='home'),  # Default route to homepage
    path('admin-panel/', admin_dashboard, name='admin-dashboard'),
    path('api/', include(router.urls)),
]