from django.db import models
import datetime

from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class Hospital(models.Model):
    hospital_admin = models.ForeignKey(User)
    provider_id = models.CharField(max_length = 20)
    hospital_name = models.CharField(max_length = 100)
    address = models.CharField(max_length = 200)
    city = models.CharField(max_length = 20)
    state = models.CharField(max_length = 20)
    zip_code = models.CharField(max_length = 20)
    county_name = models.CharField(max_length = 20)
    phone_number = models.CharField(max_length = 20)
    ed2 = models.CharField(max_length = 20)
    ed1 = models.CharField(max_length = 20)
    left_before_being_seen = models.CharField(max_length = 20)
    op18 = models.CharField(max_length = 20)
    door_to_diagnostic_eval = models.CharField(max_length = 20)
    median_time_to_pain_med = models.CharField(max_length = 20)
    head_ct_results = models.CharField(max_length = 20)
    address_from_google = models.CharField(max_length = 200)
    latitude = models.CharField(max_length=20)
    longitude = models.CharField(max_length=20)
    def __unicode__(self):
        return self.hospital_name

class Check_in(models.Model):
    hospital = models.ForeignKey(Hospital)
    checked_in_user = models.ForeignKey(User)
    pub_date = models.DateTimeField('date published')
    hospital_admin = models.CharField(max_length=20)
