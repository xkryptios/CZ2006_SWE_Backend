

// var date = new Date();
let arr = []
for (let i = 0; i < 3; i++) {
    arr.push({
        id: i,
        date: new Date
    })
}
console.log(arr)

arr.forEach((item) => {
    item = 10
})

console.log(arr)