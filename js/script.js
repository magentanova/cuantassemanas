const $ = sel => document.querySelector(sel)

let displayType = "weeks"
let lang = "es"
const today = new moment()
const day0 = new moment("2019-07-10")

const translationDict = {
    "months": {
        "en": "months",
        "es": "meses",
    },
    "days": {
        "en": "days",
        "es": "días",
    },
    "weeks": {
        "en": "weeks",
        "es": "semanas",
    },
    "month": {
        "en": "month",
        "es": "mes",
    },
    "day": {
        "en": "day",
        "es": "día",
    },
    "week": {
        "en": "week",
        "es": "semana",
    }
}

const add = (m,v,t) => m.clone().add(v,t)

const getTranslation = text => {
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
    $("h1").innerHTML = getTranslation(`
        ${weeks} weeks <br> ${days} days
    `)
}

const showMonths = () => {
    const months = today.diff(day0, "months")
    console.log(today, day0, months)
    const weeks = today.diff(add(day0,months, "months"), "weeks")
    const days = today.diff(add(add(day0,months,"months"),weeks,"weeks"), "days")
    $("h1").innerHTML = getTranslation(`
        ${months} months <br> ${weeks} weeks <br> ${days} days
    `)
}

const toggleDisplay = () => {
    if (displayType === "weeks") {
        displayType = "months"
        $("button").innerHTML = getTranslation("weeks")
    }
    else {
        $("button").innerHTML = getTranslation("months")
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