#include "logger.h"
#include "service.h"
#include <QCoreApplication>
#include <QRegExp>

#define ERROR -1

struct Args {
    QString uri;
    QString location;
    QString avgDeviceCount;
};

QStringList supportedUris = {
    "http://cwruded.herokuapp.com/api/updateLocation",
    "http://localhost:5000/api/updateLocation"
};

QStringList supportedLocations = {
    "Home"
};

Args extractArgs();

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    Logger::setup();

    qDebug(logInfo()) << "\n\n\nStarting service...";

    Args args = extractArgs();
    Service *s = new Service(args.uri, args.location, args.avgDeviceCount.toInt());
    s->start();

    return a.exec();
}

Args extractArgs() {
    int numArgs = QCoreApplication::arguments().length();
    if (numArgs != 4) {
        qDebug(logCritical()) << "Service shutting down -> incorrect number of arg (" + QString::number(numArgs) + ")";
        exit(ERROR);
    }

    Args a;
    a.uri = QCoreApplication::arguments().at(1);
    a.location = QCoreApplication::arguments().at(2);
    a.avgDeviceCount = QCoreApplication::arguments().at(3);

    bool isValid = true;
    if (!supportedUris.contains(a.uri)) {
        qDebug(logCritical()) << "Not a supported uri";
        isValid = false;
    }
    if (!supportedLocations.contains(a.location)) {
        qDebug(logCritical()) << "Not a supported location";
        isValid = false;
    }
    QRegExp re("\\d*");
    if (!re.exactMatch(a.avgDeviceCount) || a.avgDeviceCount.length() == 0) {
        qDebug(logCritical()) << "Not a valid device count";
        isValid = false;
    }

    if (!isValid) {
        qDebug(logCritical()) << "Service shutting down -> invalid args";
        exit(ERROR);
    }

    return a;
}

