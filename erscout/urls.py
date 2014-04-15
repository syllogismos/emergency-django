from django.conf.urls import patterns, include, url
from django_otp.forms import OTPAuthenticationForm
from django.views.generic import RedirectView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'erscout.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('two_factor.urls', 'two_factor')),
    url(r'^accounts/logout/$', RedirectView.as_view(url='/admin/logout/')),
)
