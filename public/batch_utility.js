var present = new Date()
present = new Date(present.getTime() + 12 * 60000)
var day = present.getDay()
var hour = present.getHours()
hour = hour - 7

switch (hour) {
    case 1:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        console.log(hour)
        break;
    case 2:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        console.log(hour)
        break;
    case 3:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        console.log(hour)
        break;

    case 4:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        console.log(hour)
        break;

    case 5:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        console.log(hour)
        break;

    case 6:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        console.log(hour)
        break;

    case 7:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        console.log(hour)
        break;


    case 8:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        break;

    case 9:
        document.querySelector(`.hour-${hour}.day-${day}`).ariaSelected = "true"
        break;

    default:
        console.log(hour)
        document.querySelector(`.hour-1.day-${day}`).ariaSelected = "true"

        break;
}