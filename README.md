ERscout
=======

Er Wait time application


todo:
1) Must be python 2.7, the default python installation on ec2 linux instances is 2.6
update python according to these instructions http://www.lecloud.net/post/61401763496/install-update-to-python-2-7-and-latest-pip-on-ec2

2) install django, django-otp, django-two-factor-auth, django-tastypie

> pip install django
> pip install django-otp
> pip install django-two-factor-auth
> pip install django-tastypie

2) update the database settings to point to the production database, the current configuration points to a local sqlite database.

3) >python manage.py syncdb

4) deploy
