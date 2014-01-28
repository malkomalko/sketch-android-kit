sketch-android-kit
==================

Sketch.app Plugin for Exporting Android Layouts

**WIP: nothing much to see here at the moment**

### installation / linking (non app store)

    cd ~/Library/Application\ Support/sketch/Plugins/
    git clone https://github.com/malkomalko/sketch-android-kit.git
    ln -s "`pwd`/sketch-android-kit/library" "`pwd`/library"

### logging

    tail -f /var/log/system.log | awk '/Sketch\[/,/SketchEOL/'
