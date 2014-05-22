from django.conf.urls import patterns, include, url
from django_otp.forms import OTPAuthenticationForm
from django.views.generic import RedirectView

from emergency.api import HospitalResource
from emergency.api import UserResource
from emergency.api import CheckInResource 

from emergency import views

from tastypie.api import Api

from django.contrib import admin
admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(HospitalResource())
v1_api.register(CheckInResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'erscout.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', views.index, name="index"), 
    url(r'^newtemplate$', views.newtemplate, name="newtemplate"), 
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('two_factor.urls', 'two_factor')),
    url(r'^accounts/logout/$', RedirectView.as_view(url='/admin/logout/')),
    url(r'^api/', include(v1_api.urls)),

    url(r'^user/password/reset/$',
        'django.contrib.auth.views.password_reset',
        {'post_reset_redirect': '/user/password/reset/done/'},
        name = 'password_reset'),
    url(r'^user/password/reset/done/$',
        'django.contrib.auth.views.password_reset_done'),
    url(r'^user/password/reset/(?P<uidb64>[0-9A-Za-z]+)-(P<token>.+)/$',
        'django.contrib.auth.views.password_reset_confirm',
        {'post_reset_redirect': '/user/password/done/'},
        name='password_reset_confirm'),
    url(r'^user/password/done/$',
        'django.contrib.auth.views.password_reset_complete'),

)
