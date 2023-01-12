package com.help.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Objects;

@WebServlet(name = "ControllerServlet", value = "/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        if (!Objects.equals(req.getParameter("x"), "")
                && !Objects.equals(req.getParameter("y"), "")
                && !Objects.equals(req.getParameter("r"), "")) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, res);
        } else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, res);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        doGet(req, res);
    }
}