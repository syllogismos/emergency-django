
import csv


from geopy.geocoders import GoogleV3
geolocator = GoogleV3()


fi = open('edtfinal.csv', 'r')
fo = open('edtfinal_location.csv', 'w')
fi_csv = csv.reader(fi)
fo_csv = csv.writer(fo)

header = fi_csv.next()
newHeader = header + ['address0', 'latitude', 'longitude']
fo_csv.writerow(newHeader)

i = 0
ids = []
try:
  while True:
    hosp = fi_csv.next()
    temp_add = hosp[1] + ", " + hosp[2] + ", " + hosp[3] + ", " + hosp[4] + ", " + hosp[5] + " " + hosp[6]
    try:
      newadd, (lat, lng) = geolocator.geocode(temp_add)
      newaddstr = str(newadd)
      hospUpdated = hosp + [newaddstr, lat, lng]
      fo_csv.writerow(hospUpdated)
    except:
      ids += [hosp[0]]
      print hosp[0]
      pass
    if (not i%30): print i
    i += 1
except:
  pass

fi.close()
fo.close()

temp = open('failedGeocoding.txt', 'w')
temp.write(str(ids))
temp.close
