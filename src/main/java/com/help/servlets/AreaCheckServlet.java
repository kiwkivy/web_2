package com.help.servlets;

import com.help.beans.Point;
import com.help.beans.PointList;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@WebServlet(name = "AreaCheckServlet", value = "/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    private static final Double[] X_VALUE = {-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0, 5.0};

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");

        PointList pointList = (PointList) req.getSession().getAttribute("points");
        if (pointList == null) pointList = new PointList();

        long initTime = System.nanoTime();
        String strX = req.getParameter("x");
        String strY = req.getParameter("y");
        String strR = req.getParameter("r");
        String strFlag = req.getParameter("flag");

        boolean isValid, isHit = false, flag = false;
        double x = 0;
        double y = 0, r = 0;
        try {
            x = Double.parseDouble(strX);
            y = Double.parseDouble(strY);
            r = Double.parseDouble(strR);
            flag = Boolean.parseBoolean(strFlag);
            if (!flag) {
                isValid = isAllValid(x, y, r);
            } else {
                isValid = true;
            }
            isHit = isHit(x, y, r);
        } catch (NumberFormatException e) {
            isValid = false;
        }


        resp.setHeader("isValid", String.valueOf(isValid));
        PrintWriter pw = resp.getWriter();

        if (isValid) {
            String currentTime = new SimpleDateFormat("HH:mm:ss").format(new Date());
            String execDuration = String.valueOf(new DecimalFormat("#0.0000").format((System.nanoTime() - initTime) / 1e9));
            Point point = new Point(truncateDouble(x), truncateDouble(y), truncateDouble(r), isHit, currentTime, execDuration);
            pointList.getPoints().add(point);
            req.getSession().setAttribute("points", pointList);
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
            pw.println(generateRow(point));
            pw.close();
        } else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
        //resp.setHeader("Location", "http://localhost:8080/web_help-test3/index.jsp");
    }

    private Double truncateDouble(double valueToTruncate) {
        return BigDecimal.valueOf(valueToTruncate).setScale(4, RoundingMode.HALF_UP).doubleValue();
    }

    private String generateRow(Point point) {
        NumberFormat nf = NumberFormat.getInstance();
        nf.setMaximumFractionDigits(3);
        return (point.isHit() ? "<tr class=\"hit-yes\">" : "<tr class=\"hit-no\">") + "<td>" + point.getX() + "</td>" + "<td>" + point.getY() + "</td>" + "<td>" + point.getR() + "</td>" + "<td>" + point.getCurrTime() + "</td>" + "<td>" + point.getExecTime() + "</td>" + "<td>" + (point.isHit() ? "Да" : "Нет)" + "</td>");
    }

    private boolean isRectHit(double x, double y, double r) {
        return x < (r / 2) && r >= 0 && y <= 0 && y > -r;
    }

    private boolean isCircleHit(double x, double y, double r) {
        return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2) / 4 && x <= 0 && y >= 0;
    }

    private boolean isTriangleHit(double x, double y, double r) {
        return y > (-1.0 / 2) * x - r / 2 && y <= 0 && x <= 0;
    }

    private boolean isHit(double x, double y, double r) {
        return isCircleHit(x, y, r) || isRectHit(x, y, r) || isTriangleHit(x, y, r);
    }


    private boolean isAllValid(double x, double y, double r) {
        return y > -3 && y < 5 && r > 1 && r < 4 && Arrays.asList(X_VALUE).contains(x);
    }


}