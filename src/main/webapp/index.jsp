<%@ page import="com.help.beans.Point" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Collections" %>
<jsp:useBean id="points" class="com.help.beans.PointList" scope="session"/>
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: fantasy;
            font-style: normal;
            font-variant: normal;
            color: black;
            width: auto;
            margin: 2px;
            font-weight: 50;
            background-image: url("https://img.freepik.com/free-photo/white-concrete-wall_53876-92803.jpg?w=1380&t=st=1672080012~exp=1672080612~hmac=bc07bc04412ccdeca8f477ec7b0be20cf55dcf8ba8ceb2a6f82605daccc07643");
            background-size: cover;
        }

        .body_of_main {
            background-size: cover;
        }

        button:active {
            background-color: green;
        }

        .errors {
            font-size: 16px;
            line-height: 10px;
            color: crimson;
        }

        table {
            border: 3px solid grey;
            border-collapse: collapse;
            width: auto;

        }


        .table_main {
            width: 80%;
            color: #0f1c08;
            margin: 4% auto;
            text-align: center;
        }

        .table_main th {
            width: 50%;
        }

        .table-header th {
            width: 20%;
        }

        caption {
            caption-side: top;
            text-align: left;
        }

        th, td {
            border: 1px solid grey;
            vertical-align: center;

        }

        td {
            width: 20%;
        }

        .my_title {
            text-align: left;
            color: inherit;
        }

        #canvas {
            border: 1px solid black;
        }

        #canvas {
            background-image: url("materials/ver1.png");
            left: 0;
            right: 600px;
            margin: 0 auto;
        }


    </style>
    <meta charset="utf-8">
    <title>Лаба по вебу я пыталась честно</title>
</head>

<body class="body_of_main">
<table class="table_main" onload="loadCanvas()">
    <tr>
        <th class="my_title">
            <i>Лабораторная работа №2.<br>
                ФИО: Гладкая Ксения Витальевна<br>
                Группа: P32141<br>
                Вариант: 14100<br>
            </i>
        </th>
    </tr>
    <tr>
        <th>Координатная плоскость</th>
        <th>Ввод значений</th>
    </tr>
    <tr>
        <td>
            <form id="send-data-form" action="ControllerServlet" method="GET" onsubmit="return isRCorrect()">
                <input type="hidden" name="x" id="x-value">
                <input type="hidden" name="y" id="y-value">
                <input type="hidden" name="r" id="r-value">
                <input type="hidden" name="flag" id="flag" value="false">
                <input type="hidden" id="clearToSend" name='clear' value="false">
            </form>
            <section onload="loadCanvas()">
                <canvas id="canvas" class="graph-canvas" width="449" height="449">Chart Interactive Area</canvas>
            </section>
            <p class="errors" id="err_canvas"></p>
        </td>
        <td>
            <form action="ControllerServlet" id="answers" method="get" onsubmit="return isCorrect();">
                <p class="errors" id="err_range"></p>
                <label>
                    X:
                    <input required type="radio" name="x" value="-3"> -3
                    <input required type="radio" name="x" value="-2"> -2
                    <input required type="radio" name="x" value="-1"> -1
                    <input required type="radio" name="x" value="0"> 0
                    <input required type="radio" name="x" value="1"> 1
                    <input required type="radio" name="x" value="2"> 2
                    <input required type="radio" name="x" value="3"> 3
                    <input required type="radio" name="x" value="4"> 4
                    <input required type="radio" name="x" value="5"> 5<br>
                </label>
                <label for="y">Y:</label>
                <input required type="text" id="y" name="y" maxlength="6"/>
                <p class="errors" id="err_y"></p>
                <label for="r">R:</label>
                <input required type="text" id="r" name="r" maxlength="6" onchange="typeROnAction()"/>
                <p class="errors" id="err_r"></p>
                <input type="submit" value="Испытать себя">
                <input type="reset" value="Очистить форму пожалуйста">
            </form>
    <tr>
        <td>
            <table id="result-table">
                <tr class="table-header">
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Локальное время</th>
                    <th>Время исполнения</th>
                    <th>Попадание</th>
                </tr>

                <% List<Point> pointList = points.getPoints();
                    Collections.reverse(pointList);
                    for (Point point : pointList) { %>
                <tr class="<%=(point.isHit()? "hit-yes": "hit-no")%>">
                    <td class="x-table"><%=point.getX() + point.getR()  %>
                    </td>
                    <td class="y-table"><%=point.getY()%>
                    </td>
                    <td class="r-table"><%=point.getR()%>
                    </td>
                    <td><%=point.getCurrTime()%>
                    </td>
                    <td><%=point.getExecTime()%>
                    </td>
                    <td><%=(point.isHit() ? "Да" : "Нет")%>
                    </td>
                </tr>
                <% } %>
            </table>
        </td>
        <td>
            <video width="400" height="300" controls="controls" poster="materials/3.gif">
                <source src="materials/video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            </video>
        </td>
    </tr>
</table>
<div id="snow" count="200"></div>
<script src="js/validate_form.js"></script>
<script src="js/draw_canvas.js"></script>
<script src="js/surprise.js"></script>
</body>
</html>