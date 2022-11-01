function handler(req, res) {
    if (req.method === "POST") {
        const email = req.body.email;
        console.log(email);
    }
}