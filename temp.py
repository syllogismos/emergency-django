import csv

from emergency.models import Hospital
from django.contrib.auth.models import User

edt = open('edtfinal.csv', 'r')
edtcsv = csv.reader(edt)

header = edtcsv.next()

# header = ['provider_id', 'hospital_name', 'address1', 'city', 'state', 'zip_code', 'county_name', 'phone_number', 'ed2', 'ed1', 'left_before_being_seen', 'op18', 'door_to_diagnostic_eval','median_time_to_pain_med', 'head_ct_results']

defaultUser = User.objects.get(pk=1)

try:
    while True:
        hosp = edtcsv.next()
        e = Hospital(
                hospital_admin          = defaultUser,
                provider_id             = header[0],
                hospital_name           = header[1],
                address                 = header[2],
                city                    = header[3],
                state                   = header[4],
                zip_code                = header[5],
                county_name             = header[6],
                phone_number            = header[7],
                ed2                     = header[8],
                ed1                     = header[9],
                left_before_being_seen  = header[10],
                op18                    = header[11],
                door_to_diagnostic_eval = header[12],
                median_time_to_pain_med = header[13],
                head_ct_results         = header[14],
                )
        e.save()
except:
    pass
