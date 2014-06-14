\o/

ERscout
=======

Er Wait time application


todo:
====

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

5) You can populate the hospital table from the csv file using the temp.py script, this has to be done only after the above syncdb command

> python manage.py shell

> from temp import populate

> populate()




5) deploy


6) API, default formal is json, if given error, add format=json parameter
	
schema:	/api/v1/

list hospitals: /api/v1/hospital/

list checkins: /api/v1/check_in/

list users: /api/v1/user/

default is paginated results with 20 per page, if want a particular entry with a primary key, add /pk/ in the end, eg: api/v1/hospital/1/

filter hospital based on state: /api/v1/hospital/?state=TX

filter hospital based on hospital admin: 	/api/v1/hospital?hospital_admin__username=hospitaladmin

filter checkins based on hospitaladmin: /api/v1/check_in/?hospitaladmin=hospitaladmin


checkin example: 

{
    "checked_in_user": "/api/v1/user/3/",
    "hospital": "/api/v1/hospital/1/",
    "hospital_admin": "hospitaladmin",
    "id": 1,
    "pub_date": "2014-04-17T16:47:13",
    "resource_uri": "/api/v1/check_in/1/"
}

user example: 

{
    "date_joined": "2014-04-17T11:12:55.285069",
    "first_name": "",
    "id": 1,
    "last_login": "2014-04-17T11:33:05.377787",
    "last_name": "",
    "resource_uri": "/api/v1/user/1/",
    "username": "ec2-user"
}

hospital example:

{
    "address": "1108 ROSS CLARK CIRCLE",
    "city": "DOTHAN",
    "county_name": "HOUSTON",
    "door_to_diagnostic_eval": "61",
    "ed1": "258",
    "ed2": "69",
    "head_ct_results": "Not Available",
    "hospital_admin": "/api/v1/user/2/",
    "hospital_name": "SOUTHEAST ALABAMA MEDICAL CENTER",
    "id": 1,
    "left_before_being_seen": "4",
    "median_time_to_pain_med": "99",
    "op18": "190",
    "phone_number": "3347938701",
    "provider_id": "10001",
    "resource_uri": "/api/v1/hospital/1/",
    "state": "AL",
    "zip_code": "36301"
}




First Deliverable Update:
========================

Here is the url:

http://ec2-54-196-92-53.compute-1.amazonaws.com:8000/account/login/
** doesn't work anymore, took it offline
 
web admin: username: ec2-user, pwd: test

hospital admin: username: hospitaladmin, pwd: test

normal users: patient1, patient2, patient3, pwd: test

Hospitals details were obtained from the web site you provided to fill the Hospital table

By default, the web admin will be the hospital admin, to all the hospitals.

The web admin can edit the hospital details, while editing the hospital details, he can create a new hospital admin.

The web admin must mark the user as 'staff' to make him a hospital admin.

The web admin, can look, change, edit, delete all the objects in all the tables available in the webportal.

The hospital admin and web admin can enable two factor authentication using google qr code authenticators available in various smartphones.

The hospital admin, can only change the details of his own hospital, in his admin panel. he can update various wait times that are available. url: /admin/

When the hospital admin logs in he will be able to see the details of his hospital, and all the check ins to his hospital. He can update the hospital details by clicking on the update button.

For testing purposes, you can create sample check ins, by logging in as web admin, go to the check_in table, and create new checkins.

Some of the api, that we will be using to build the phone applications, their details are available on the readme.md on github.
