from django.contrib import admin
from .models import Company, IPO, Document

# Register your models here.

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'company_name', 'company_logo')

@admin.register(IPO)
class IPOAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'company', 'price_band', 'open_date', 'close_date', 'issue_size',
        'issue_type', 'listing_date', 'status', 'ipo_price', 'listing_price',
        'listing_gain', 'current_market_price', 'current_return'
    )
    list_filter = ('status', 'open_date', 'close_date')
    search_fields = ('company__company_name',)

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'ipo', 'rhp_pdf', 'drhp_pdf')
