package com.help.beans;

import java.util.ArrayList;
import java.util.List;

public class PointList {
    List<Point> points;

    public PointList() {
        this(new ArrayList<Point>());
    }

    public PointList(List<Point> points) {
        this.points = points;
    }

    public List<Point> getPoints() {
        return points;
    }

}
