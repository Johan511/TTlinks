var xhr_auth = new XMLHttpRequest();
xhr_auth.withCredentials = true;
xhr_auth.onreadystatechange = function () {
  if (
    this.readyState == 4 &&
    this.status == 200 &&
    this.responseText == "true"
  ) {
    document.querySelectorAll(".message-form").forEach((message_form) => {
      message_form.style = "display:block";
    });
  } else {
    document.querySelectorAll(".message-form").forEach((message_form) => {
      message_form.style = "display:none";
    });
  }
};
xhr_auth.open("GET", "/auth/tokenlogin");
xhr_auth.send();

var tt = document.querySelector("#tt");
for (let i = 1; i < 7; i++) {
  /*
    weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
    */

  let weekday = document.createElement("div");
  weekday.setAttribute("id", "weekday");
  weekday.setAttribute("class", "flex-row bg-mountain-blue " + i.toString());
  weekday.style["padding"] = "0.4rem 0.5rem 0.4rem 0.5rem";
  weekday.style["border-radius"] = "0.5rem";

  for (let hour = 0; hour < 10; hour++) {
    let hour_div = document.createElement("a");
    hour_div.setAttribute("target", "_blank");
    let classHour = "hour-" + hour.toString();
    let classDay = "day-" + i.toString();
    let classColor = "bg-white";
    let classBorder = "border";
    let classCenter = "flex-col";
    hour_div.setAttribute(
      "class",
      classHour +
        " " +
        classDay +
        " " +
        classColor +
        " " +
        classBorder +
        " " +
        classCenter +
        " " +
        "lecture"
    );
    hour_div.style["min-height"] = "1.5rem";
    hour_div.style["aspect-ratio"] = "2.8";
    weekday.appendChild(hour_div);
  }

  tt.appendChild(weekday);
}

const URL_splitted = window.location.href.split("/");
const batch = URL_splitted[URL_splitted.length - 1];
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    this.TT = JSON.parse(xhr.responseText);

    for (let courseNum = 0; courseNum < this.TT.courses.length; courseNum++) {
      let course = this.TT.courses[courseNum];
      for (
        let lectureNum = 0;
        lectureNum < course.courseTT.length;
        lectureNum++
      ) {
        let lecture = course.courseTT[lectureNum];
        let dayHour_href = lecture.split("&&");
        let lectureElement = document.querySelector(
          `.day-${dayHour_href[0][0]}.hour-${dayHour_href[0][1]}`
        );
        lectureElement.innerText = course.courseName;
        if (dayHour_href[1]) {
          lectureElement.href = dayHour_href[1];
        }
      }
      for (
        let tutorialNum = 0;
        tutorialNum < course.tutorialTT.length;
        tutorialNum++
      ) {
        let lecture = course.tutorialTT[tutorialNum];
        let dayHour_href = lecture.split("&&");
        let lectureElement = document.querySelector(
          `.day-${dayHour_href[0][0]}.hour-${dayHour_href[0][1]}`
        );
        lectureElement.innerText = course.courseName;
        if (dayHour_href[1]) {
          lectureElement.href = dayHour_href[1];
        }
      }
    }

    const announcements = document.querySelector("#announcements");
    const messages = document.querySelector("#messages");
    const pinned_messages = document.querySelector("#pinned-messages");
    console.log(this.TT);
    for (let index = 0; index < this.TT.messages.length; index++) {
      const message = this.TT.messages[index];

      let messageParent = document.createElement("div");
      messageParent.setAttribute("class", "border message");
      let message_flexrow = document.createElement("div");
      message_flexrow.setAttribute("class", "flex-row");
      let message_content = document.createElement("p");
      message_content.setAttribute("class", "border");
      message_content.innerText = message.content || "";
      let message_heading = document.createElement("h2");
      message_heading.setAttribute("class", "flex-col");
      message_heading.innerText = message.heading || "Announcement";
      let message_stamp = document.createElement("div");
      message_stamp.setAttribute("class", "flex-col fs-100 stamp");
      message_stamp.style = "--col-gap : 0; align-items: flex-end";
      let message_stamp_span1 = document.createElement("span");
      let message_stamp_span2 = document.createElement("span");
      message.updatedAt = new Date(message.updatedAt);
      message.updatedAt = message.updatedAt.toString().slice(0, 21);
      // message.updatedAt = message.updatedAt.getDate()  +'  ' +message.updatedAt.getHours() + ':' + message.updatedAt.getMinutes()
      // check time zone changes

      message.expireAt = new Date(message.expireAt);
      message.expireAt = message.expireAt.toString().slice(0, 21);
      message_stamp_span1.innerText =
        "updated by " + message.author + " at " + message.updatedAt;
      message_stamp_span2.innerText = "expires at " + message.expireAt;

      message_stamp.appendChild(message_stamp_span1);
      message_stamp.appendChild(message_stamp_span2);

      message_flexrow.appendChild(message_heading);
      message_flexrow.appendChild(message_stamp);

      messageParent.appendChild(message_flexrow);
      messageParent.appendChild(message_content);

      if (message.isAnnouncement) {
        announcements.appendChild(messageParent);
      } else if (message.isPinned) {
        pinned_messages.appendChild(messageParent);
      } else {
        messages.appendChild(messageParent);
      }
    }
  }
};
xhr.open("GET", `/batch/${batch}/getTT`);
xhr.send();

document.querySelectorAll(".hour-0").forEach((hour_div, index) => {
  hour_div.style["font-size"] = "1.4em";
  const weekday = ["MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  hour_div.innerHTML = weekday[index];
});
