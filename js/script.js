const $ = sel => document.querySelector(sel)

const today = new moment()
const day0 = new moment("july 18 2019")
const gestation = today.diff(day0, "weeks")

$("h1").innerHTML = gestation