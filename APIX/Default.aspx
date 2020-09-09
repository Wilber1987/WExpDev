﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="APIX.Default" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <title>jQuery AJAX | YogiHosting Demo</title>
    <link rel="icon" type="image/png" href="http://www.yogihosting.com/wp-content/themes/yogi-yogihosting/Images/favicon.ico" />
    <style>
        body {
            background: #111 no-repeat;
            background-image: -webkit-gradient(radial, 50% 0, 150, 50% 0, 300, from(#444), to(#111));
        }

        h1, h2 {
            text-align: center;
            color: #FFF;
        }

            h2 a {
                color: #0184e3;
                text-decoration: none;
            }

                h2 a:hover {
                    text-decoration: underline;
                }

        #content {
            margin: 0 auto;
            width: 960px;
            background-color: #cccccc;
        }

            #content h1 {
                text-align: center;
                text-decoration: underline;
                color: #000;
            }

            #content img {
                left: 48%;
                position: absolute;
                width: 50px;
                display: none;
            }

        table {
            width: 100%;
        }

            table tr td {
                width: 40%;
                text-align: center;
            }

        #errorDiv {
            background-color: red;
            color: #FFFFFF;
            padding-left: 25px;
        }
    </style>
</head>
<body>
    <h1>jQuery AJAX</h1>
    <h2><a href="http://www.yogihosting.com/calling-a-c-function-with-jquery-ajax/">Read the tutorial on YogiHosting »</a></h2>
    <form id="form1" runat="server">
        <div id="content">
            <h1>Subscribe To Our Newsletter</h1>
            <div id="errorDiv"></div>
            <table>
                <tr>
                    <td>Name:-</td>
                    <td>
                        <input type="text" id="nameInput" /></td>
                </tr>
                <tr>
                    <td>Email:-</td>
                    <td>
                        <input type="text" id="emailInput" /></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" id="submitButton" value="Submit" /></td>
                </tr>
            </table>
            <img src="Image/loading.gif" id="loadingImg" />
        </div>
    </form>
    <%--<script type="text/javascript" src="JS/jquery-2.1.1.js"></script>--%>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" lang="javascript">
        function EmailValidate() {
            var numericExpression = /^\w.+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
            var elem = $("#emailInput").val();
            if (elem.match(numericExpression))
                return true;
            else
                return false;
        }

        function ValidateAll() {
            var errorCounter = 0;
            var errorMessage = "";
            //Name
            if ($("#nameInput").val() == '') {
                errorMessage += " Enter your Name<br/>";
                errorCounter++;
            }
            //End

            //Email
            if ($("#emailInput").val() == '') {
                errorMessage += " Enter your email address<br/>";
                errorCounter++;
            }
            else if (!(EmailValidate())) {
                errorMessage += " Invalid email address<br/>";
                errorCounter++;
            }
            //End

            $("#errorDiv").html(errorMessage);
            if (errorCounter == 0) {
                return true;
            }
            else {
                return false;
            }
        }
    </script>
    <script type="text/javascript">
        $(document).ready(function () {
            $(document).ajaxStart(function () {
                $("#loadingImg").show();
            });

            $(document).ajaxStop(function () {
                $("#loadingImg").hide();
            });

            $("#submitButton").click(function (e) {
                var result = ValidateAll();
                if (result == true) {
                    $.ajax({
                        type: "POST",
                        url: "Default.aspx/Save",
                        //url: "Employee.cs/get",
                        contentType: "application/json; charset=utf-8",
                        data: '{"name":"' + $("#nameInput").val() + '","email":"' + $("#emailInput").val() + '"}',
                        dataType: "json",
                        success: function (msg) {
                            if (msg.d) {
                                $("#errorDiv").html(msg.d);
                            }
                        },
                        error: function (req, status, error) {
                            alert("Error try again");
                        }
                    });
                }
                return false;
            });
        });
    </script>
</body>
</html>
