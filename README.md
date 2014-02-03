sketch-android-kit
==================

Sketch.app Plugin for Exporting Android Layouts

**Current Progress:**

* http://quick.as/wzx8cb2m - generate an android app in under 3 minutes
* http://quick.as/lw0di0mm - pixel density and generating layouts with images
* http://quick.as/x4zxhkyj - passing data to generated templates
* http://quick.as/wzx8c0mp - introduction

### installation / linking (non app store)

    cd ~/Library/Application\ Support/sketch/Plugins/
    git clone https://github.com/malkomalko/sketch-android-kit.git
    ln -s "`pwd`/sketch-android-kit/library" "`pwd`/library"

### logging

    tail -f /var/log/system.log | awk '/Sketch\[/,/SketchEOL/'
