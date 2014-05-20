import csv

from emergency.models import Hospital
from django.contrib.auth.models import User


# header = ['provider_id', 'hospital_name', 'address1', 'city', 'state', 'zip_code', 'county_name', 'phone_number', 'ed2', 'ed1', 'left_before_being_seen', 'op18', 'door_to_diagnostic_eval','median_time_to_pain_med', 'head_ct_results']



def populate_from_file(loc): # loc is file location, edtfinal_location.csv and remain_edtfinal_location.csv
    defaultUser = User.objects.get(pk=1)
    edt = open(loc, 'r')
    edtcsv = csv.reader(edt)
    header = edtcsv.next()
    try:
        while True:
            hosp = edtcsv.next()
            e = Hospital(
                    hospital_admin          = defaultUser,
                    provider_id             = hosp[0],
                    hospital_name           = hosp[1],
                    address                 = hosp[2],
                    city                    = hosp[3],
                    state                   = hosp[4],
                    zip_code                = hosp[5],
                    county_name             = hosp[6],
                    phone_number            = hosp[7],
                    ed2                     = hosp[8],
                    ed1                     = hosp[9],
                    left_before_being_seen  = hosp[10],
                    op18                    = hosp[11],
                    door_to_diagnostic_eval = hosp[12],
                    median_time_to_pain_med = hosp[13],
                    head_ct_results         = hosp[14],
                    address_from_google     = hosp[15],
                    latitude                = hosp[16],
                    longitude               = hosp[17],
                    )
            e.save()
    except:
        pass
    return

def populate():
    populate_from_file('edtfinal_location.csv')
    populate_from_file('remain_edtfinal_location_2.csv')
