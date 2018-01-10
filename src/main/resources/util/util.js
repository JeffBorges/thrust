var File = Java.type("java.io.File")
var ZipInputStream = Java.type("java.util.zip.ZipInputStream")
var BufferedOutputStream = Java.type( "java.io.BufferedOutputStream")
var FileInputStream = Java.type("java.io.FileInputStream")
var FileOutputStream = Java.type("java.io.FileOutputStream")
var Byte = Java.type("byte[]")
var URLClassLoader = Java.type("java.net.URLClassLoader")
var URLArr = Java.type("java.net.URL[]")
var System = Java.type("java.lang.System")
var Class = Java.type("java.lang.Class")

function unzip(zipFilePath, destDirectory) {
    var destDir = undefined
    
    if(destDirectory) {
        var destDir = new File(destDirectory)
        if (!destDir.exists()) {
            destDir.mkdir()
        }
    } else {
    	destDirectory = new File(".").getAbsolutePath();
    }
    
    var zipIn = new ZipInputStream(new FileInputStream(zipFilePath))
    var entry = zipIn.getNextEntry()
    while (entry != null) {
        var filePath = destDirectory + File.separator + entry.getName()
        if (!entry.isDirectory()) {
            extractFile(zipIn, filePath)
        } else {
            var dir = new File(filePath)
            dir.mkdir()
        }
        zipIn.closeEntry()
        entry = zipIn.getNextEntry()
    }
    zipIn.close()
}

function extractFile(zipIn, filePath) {
    var bos = new BufferedOutputStream(new FileOutputStream(filePath))
    var bytesIn = new Byte(4096)
    var read = 0
    while ((read = zipIn.read(bytesIn)) !== -1) {
        bos.write(bytesIn, 0, read)
    }
    bos.close()
}

function loadJar(jarPath, classFqn) {
    var f = new File(jarPath)
    var urlArr = new URLArr(1)
    urlArr[0] = f.toURL()
    print(f.toURL())
    var urlCl = new URLClassLoader(urlArr, System.class.getClassLoader())
    var classInst = urlCl.loadClass(classFqn)
    classInst.newInstance()
}

exports = {
    unzip: unzip,
    loadJar: loadJar
}
