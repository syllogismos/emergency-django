from django.contrib import admin
from emergency.models import Hospital, Check_in

# Register your models here.

class HospitalAdmin(admin.ModelAdmin):
    list_display = ('provider_id', 'hospital_admin', 'hospital_name', 'address', 'city', 'state', 'zip_code', 'phone_number', 'ed2', 'ed1', 'left_before_being_seen', 'op18', 'door_to_diagnostic_eval', 'median_time_to_pain_med',)
    search_fields = ['hospital_name']

class CheckInAdmin(admin.ModelAdmin):
    list_display = ('hospital', 'checked_in_user', 'pub_date')

admin.site.register(Hospital, HospitalAdmin)
admin.site.register(Check_in, CheckInAdmin)
