let base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
let dropdownslct = document.querySelectorAll(".drop-down select")
let btn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select") 
let toCurr = document.querySelector(".to select")


for (let select of dropdownslct) {
    for (let currcode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currcode
        newOption.value = currcode
        if (select.name == "from" && currcode == "USD") {
            newOption.selected = "selected"
        } else if (select.name == "to" && currcode == "PKR") {
            newOption.selected = "selected"
        }

        select.append(newOption)
    }

    select.addEventListener('change',(evt)=>[
        updateFlag(evt.target)
    ])

}


let updateFlag = (element) =>{
 let currcode = element.value
 let countryCode = countryList[currcode]
 let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
 let img = element.parentElement.querySelector("img")
 img.src= newSrc
 }
  

//  btn.addEventListener('click', async (evt) =>{
//     evt.preventDefault();
// let amount = document.querySelector(".input-ammount input")
//  let amtVal = amount.value
// if(amtVal = '' || amtVal <1){
//     amtVal=1
//     amount.value= "1"

// }

// // console.log(fromCurr.value,toCurr.value);


// const URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
// let response = await fetch(URL)
// console.log(response)
 
//  })
btn.addEventListener('click', async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".input-ammount input")
    let amtVal = amount.value

    if (amtVal === '' || amtVal < 1) {
        amtVal = 1
        amount.value = "1"
    }

    const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()

    let base = fromCurr.value.toLowerCase()
    let target = toCurr.value.toLowerCase()

    let rate = data[base][target]
    let finalAmount = (amtVal * rate).toFixed(2)

    // log for debugging
    console.log(`1 ${fromCurr.value} = ${rate} ${toCurr.value}`)
    console.log(`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`)

    // ✅ show in your <div class="msg">
    document.querySelector(".msg").innerText =
        `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})
