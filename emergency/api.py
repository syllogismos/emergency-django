
from tastypie.resources import ModelResource
from emergency.models import Hospital


class HospitalResource(ModelResource):
    class Meta:
	queryset = Hospital.objects.all()
	resource_name = 'hospital'
