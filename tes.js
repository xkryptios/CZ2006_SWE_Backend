
const schedule = () => {
    const time = new Date();
    console.log(time);

    // setTimeout(() => {
    //     console.log("inside callback fucntion of setimeout" + new Date())
    // }, 5000);
    console.log("inside setinterval" + new Date())

    setInterval(() => {
        console.log("inside setinterval" + new Date())
    }, 3000);
}

schedule();