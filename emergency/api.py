
from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.authentication import SessionAuthentication
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import Authorization

from emergency.models import Hospital

from django.contrib.auth.models import User


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
	resource_name = 'hospital_admin'
	excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser']
	filtering = {
	    'username': ALL,
	}
        authentication = SessionAuthentication()


class HospitalResource(ModelResource):
    hospital_admin = fields.ForeignKey(UserResource, 'hospital_admin')
    class Meta:
	queryset = Hospital.objects.all()
	resource_name = 'hospital'
        authentication = SessionAuthentication()
	filtering = {
	    'hospital_admin' : ALL_WITH_RELATIONS,
	    'state': ['exact'],
	    'county_name': ['exact'],
            'zip_code': ['exact'],
            'city': ['exact'],
        }
	allowed_methods = ['get', 'put', 'patch']
	authorization = Authorization()
