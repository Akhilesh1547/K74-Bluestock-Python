from rest_framework import serializers
from .models import Company, IPO, Document

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class IPOSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), write_only=True, source='company'
    )
    def validate_ipo_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("IPO price must be greater than 0.")
        return value

    def validate_current_market_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Current Market Price can't be negative.")
        return value

    def validate_current_return(self, value):
        if value < -100 or value > 500:
            raise serializers.ValidationError("Return should be between -100% and 500%.")
        return value

    class Meta:
        model = IPO
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    ipo = IPOSerializer(read_only=True)
    ipo_id = serializers.PrimaryKeyRelatedField(
        queryset=IPO.objects.all(), write_only=True, source='ipo'
    )

    class Meta:
        model = Document
        fields = '__all__'