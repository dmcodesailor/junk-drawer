import sys

proxy = sys.argv[1]
filenameVscode = "/Users/cvb027/Library/Application Support/Code/User/settings.json"
proxyLine = ""
output = []

lines = list(open(filenameVscode))
for line in lines:

    # Set the proxy.
    if "\"http.proxy\":" in line:
        proxyLine = "\"http.proxy\": \"" + proxy + "\",\n"
        line = proxyLine

    # Write the line.
    output.append(line)

# Write the output to the file.
f = open(filenameVscode, "w")
for outLine in output:
    f.write(outLine)

f.close()