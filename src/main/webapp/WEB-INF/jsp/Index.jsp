
<!DOCTYPE html>


<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>The Event Finder</title>
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/style.css"/>"/>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    </head>
  <body>
  <div class="wrapper">
      <div class="overlay"></div>
      <div class="welcomePage">
          <h1>The Event Finder</h1>
          <p>Discover new passions and meet new people with us.</p>
          <div class="loginDiv">
              <button type="button" id="login"></button>
          </div>
      </div>
      <nav class="navigationBar">
          <button type="button" class="toggle_createEvent_sideBar_btn">Create Event</button>
          <h3>The Event Finder</h3>

          <button type="button" id="logout"></button>
      </nav>

      <div class="main">
            <div class="createEventSideBar"><jsp:include page="${request.contextPath}/event"></jsp:include></div>

            <div class="mapContainer">
                <input id="mapSearchBox" class="controls" type="text" placeholder="Search Box">
                <div id="map"></div>
            </div>
            <div class="eventInfoSideBar"><jsp:include page="${request.contextPath}/eventinfo/1"></jsp:include></div>


            <script src="https://code.jquery.com/jquery-3.1.1.js"   integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="   crossorigin="anonymous"></script>
            <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

            <script async defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDw_tl_1b0d4i3KviPUzVHvM7sFbmAz-RE&callback=initMap&libraries=places">
            </script>
            <!--<h3><a href="/eventinfo/1">Event Info</a></h3>-->
            <!--<h3><a href="/event">Create event</a></h3>-->
        </div>
    </div>
    <script src="<c:url value="/js/main.js" />"></script>
  </body>
</html>