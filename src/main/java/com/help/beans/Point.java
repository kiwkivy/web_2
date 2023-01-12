package com.help.beans;

public class Point {
    private String execTime;
    private String currTime;
    private Double x, y, r;
    private Boolean isHit;

    public Point(Double x, Double y, Double r, Boolean isHit, String currentTime, String execTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.currTime = currentTime;
        this.execTime = execTime;
    }

    public Point() {

    }

    public String getExecTime() {
        return execTime;
    }

    public String getCurrTime() {
        return currTime;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }


    public Boolean isHit() {
        return isHit;
    }
}
