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

3) update the database settings to point to the production database, the current configuration points to a local sqlite database.

database configuration in erscout/settings.py

4) Create tables of all the models.

> python manage.py syncdb

this command will ask to create a super user if run for the first time

5) Create a new superuser(admin)

> python manage.py createsuperuser --username=test --email=test@test.com

5) deploy
