<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

    <h2>Event information</h2>
    <sf:form class="viewEventForm" commandName="info">

    <h3>Event name:</h3>
    <p class="viewEventInfo_name">${info.name}</p>

    <h3>Event description:</h3>
    <p class="viewEventInfo_description">${info.description}</p>

    <h3>Minimum age:</h3>
    <p class="viewEventInfo_ageMin">${info.ageMin}</p>

    <h3>Maximum age:</h3>
    <p class="viewEventInfo_ageMax">${info.ageMax}</p>

    <h3>Gender restrict event?</h3>
    <p class="viewEventInfo_genderRestriction">${info.genderRestriction}</p>

    <button class="viewEventInfo_attendBtn" type="button"> Attend Event! </button>

     <h3>Attendees</h3>
     <div id="attendees">
         <c:choose>
             <c:when test="${not empty attendeeNames}">
                 <c:forEach items="${attendeeNames}" var="attendee">
                     <%--<img src="http://graph.facebook.com/${attendeeFbId}/picture" alt="profile picture">--%>
                     <p>${attendee}</p>
                 </c:forEach>
             </c:when>
             <c:otherwise>
                 <h2>No one is going yet</h2>
             </c:otherwise>
         </c:choose>
     </div>
     </sf:form>
     <button class="hide_eventBtn">Hide event info</button>
