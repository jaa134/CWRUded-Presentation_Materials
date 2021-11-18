#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "iostream"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    connect(ui->horizontalSlider, &QSlider::valueChanged, this, &MainWindow::updateSlider);
}

MainWindow::~MainWindow()
{
    delete ui;
}

QColor MainWindow::green = QColor(51, 165, 50);
QColor MainWindow::yellow = QColor(231, 180, 22);
QColor MainWindow::red = QColor(204, 50, 50);

void MainWindow::updateSlider(int val)
{
    ui->progressBar->setValue(val);

    QColor c;
    int r = 0, g = 0, b = 0;
    double max = ui->progressBar->maximum();
    if (val <= max / 2)
    {
        r = green.red() + ((yellow.red() - green.red()) * (val / (max / 2)));
        g = green.green() + ((yellow.green() - green.green()) * (val / (max / 2)));
        b = green.blue() + ((yellow.blue() - green.blue()) * (val / (max / 2)));
    }
    else
    {
        val -= max / 2;
        r = yellow.red() + ((red.red() - yellow.red()) * (val / (max / 2)));
        g = yellow.green() + ((red.green() - yellow.green()) * (val / (max / 2)));
        b = yellow.blue() + ((red.blue() - yellow.blue()) * (val / (max / 2)));
    }
    c = QColor(r, g, b);


    ui->progressBar->setStyleSheet("QProgressBar::chunk { background-color: " + c.name() + " }");
}
