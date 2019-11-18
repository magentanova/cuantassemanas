const $ = sel => document.querySelector(sel)

let displayType = "months"
const today = new moment()
const day0 = new moment("2019-07-10")

const add = (m,v,t) => m.clone().add(v,t)
const showWeeks = () => {
    const weeks = today.diff(day0, "weeks")
    const days = today.diff(add(day0,weeks,"weeks"), "days")
    $("h1").innerHTML = `
        ${weeks} weeks<br>${days} days
    `
}

const showMonths = () => {
    const months = today.diff(day0, "months")
    console.log(today, day0, months)
    const weeks = today.diff(add(day0,months, "months"), "weeks")
    const days = today.diff(add(add(day0,months,"months"),weeks,"weeks"), "days")
    $("h1").innerHTML = `
        ${months} months<br>${weeks} weeks<br>${days} days
    `
}

const toggleDisplay = () => {
    if (displayType === "weeks") {
        displayType = "months"
        showWeeks()
    }
    else {
        displayType = "weeks"
        showMonths()
    }
    $("button").innerHTML = displayType
}

showWeeks()
$("button").onclick = toggleDisplay