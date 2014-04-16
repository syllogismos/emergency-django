from django.conf.urls import patterns, include, url
from django_otp.forms import OTPAuthenticationForm
from django.views.generic import RedirectView

from emergency.api import HospitalResource
from emergency.api import UserResource

from tastypie.api import Api

from django.contrib import admin
admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(HospitalResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'erscout.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('two_factor.urls', 'two_factor')),
    url(r'^accounts/logout/$', RedirectView.as_view(url='/admin/logout/')),
    url(r'^api/', include(v1_api.urls)),
)
