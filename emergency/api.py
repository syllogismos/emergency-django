
from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.authentication import SessionAuthentication

from emergency.models import Hospital

from django.contrib.auth.models import User


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
	resource_name = 'hospital_admin'
        authentication = SessionAuthentication()


class HospitalResource(ModelResource):
    hospital_admin = fields.ForeignKey(UserResource, 'hospital_admin')
    class Meta:
	queryset = Hospital.objects.all()
	resource_name = 'hospital'
        authentication = SessionAuthentication()
