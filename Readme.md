# File Organizer
This script us created using **fs module** in javascript.

!! ***Folder name Should be without space***

## Features
* It helps to **organize files** in a folder.
* Make **seprate directory** for different extension.
* Can **remove source folder** when file move to output directory.

## How to use


To run Script

 ``` 
 node index.js -s [Source Directory] -o [Output Directory]
 ```

Use **-m** to move file and delete source folder

``` 
node index.js -m -s [Source Directory] -o [Output Directory]
```
# Options
* **-s** : ```To indicate Source Directory```
* **-o** : ```To indicate Output Directory```
* **-m** : ```To move file and delete source folders``` (*Optional*)

# Requirment
* Node Js (v10+)