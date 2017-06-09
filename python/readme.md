# Python

### Prerequisites

Python is installed along with Python package manager;

### awstokens.py

Request AWS API tokens for one or more authorized roles.  ROLE(s) are substring matched and case sensitive. Will fetch all available if none listed.  I didn't actually write this.  It is generally publicly available.

[AWS Scripts Link](https://github.kdc.capitalone.com/public-cloud/aws-iam-utils/tree/master/SecurityTokenService/scripts)

### Proxy Drivers
In fighting with the corporate proxy. 

#### proxy-driver.py
The original driver file before being split to support multiple application's settings. Kept as a reference for general file operations.

#### proxy-driver-maven.py
This file differs from the above _and_ below files in that the Maven settings file is in XML format.  This script uses [ElementTree](https://docs.python.org/3/library/xml.etree.elementtree.html).

#### proxy-driver-vscode.py
This script specifically writes to the Visual Studio Code settings file.  It performs typical file IO operations by opening the file, updating a line it finds with a hard-coded search operation, writes the updated line back to the file and closes the file.  The operation is a brute-force algorithm.