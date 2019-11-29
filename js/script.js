const $ = sel => document.querySelector(sel)

let displayType = "weeks"
let lang = "es"
const today = new moment()
const day0 = new moment("2019-07-10")

const add = (m,v,t) => m.clone().add(v,t)

const handleNumber = (word, n) => {
    if (n === 1) {
        return word
    }
    return pluralsDict[word]
}

const translate = text => {
    return text.split(/[\s]/g).map(word => {
        if (translationDict[word]) {
            return translationDict[word][lang]
        }
        return word
    })
    .join(" ")
}

const render = () => {
    if (displayType === "weeks") {
        showWeeks()
    }
    else {
        showMonths()
    }
}

const showWeeks = () => {
    const weeks = today.diff(day0, "weeks")
    const days = today.diff(add(day0,weeks,"weeks"), "days")
    $("h1").innerHTML = translate(`
        ${weeks} ${handleNumber("week",weeks)} 
        <br> 
        ${days} ${handleNumber("day",days)}
    `)
}

const showMonths = () => {
    const months = today.diff(day0, "months")
    console.log(today, day0, months)
    const weeks = today.diff(add(day0,months, "months"), "weeks")
    const days = today.diff(add(add(day0,months,"months"),weeks,"weeks"), "days")
    $("h1").innerHTML = translate(`
        ${months} ${handleNumber("month",months)} 
        <br> 
        ${weeks} ${handleNumber("week",weeks)} 
        <br> 
        ${days} ${handleNumber("day",days)}
    `)
}

const toggleDisplay = () => {
    if (displayType === "weeks") {
        displayType = "months"
        $("button").innerHTML = translate("weeks")
    }
    else {
        $("button").innerHTML = translate("months")
        displayType = "weeks"
    }
    render()
}

const toggleLang = e => {
    console.log(e.target.value)
    lang = e.target.value;
    if (lang == "es") {
        $("button#lang-toggle").value = "en"
        $("button#lang-toggle").innerHTML = "🇺🇸"
    }
    else {
        $("button#lang-toggle").value = "es"
        $("button#lang-toggle").innerHTML = "🇦🇷"
    }
    render()
}

render()

$("button#display-toggle").onclick = toggleDisplay

$("button#lang-toggle").onclick = toggleLang