console.log("Client side JS running");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch("http://localhost:3000/weather?address=Boston").then(response => {
//     response.json().then(data => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const paraMsg1 = document.querySelector("#msg-1")
const paraMsg2 = document.querySelector("#msg-2")


weatherForm.addEventListener('submit' , (event) => {
    event.preventDefault()
    paraMsg1.textContent = "Loading.."
    paraMsg2.textContent = ""
    fetch("http://localhost:3000/weather?address=" + encodeURIComponent(search.value)).then(response => {
    response.json().then(data => {
        if(data.error) {
            console.log(data.error)
            paraMsg1.textContent = data.error
        } else {
            console.log(data);
            // console.log(data.location);
            // console.log(data.forecast);
            paraMsg1.textContent = data.address
            paraMsg2.textContent = data.forecast
        }
    })
    search.value = ""
})

})
