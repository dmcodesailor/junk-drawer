import sys
import xml.etree.ElementTree

# Usage: python proxy-driver-maven.py pwd eid
pwd = sys.argv[1]
eid = sys.argv[2]
filenameMaven = "/Users/" + eid + "/.m2/settings.xml"

# The Maven settings are in an XML file.
doc = xml.etree.ElementTree.parse(filenameMaven)
node = doc.find('./proxies').find('./proxy').find('password')

# Only need to set the password. The settings file already contains the EID.
node.text = pwd

doc.write(filenameMaven)