const express = require("express")
const request = require("request")

const app = express()

const defaultDomains = ["ideagenhomedev.com", "ideagen.com"]

// Use middleware to parse text content from payload
app.use(express.text()) 

// Post method for URL validation
app.post("/validate-url", (req, res) => {
    request(
        { url: 'https://home-feature.ideagenhomedev.com/poc/home-marketing-whitelist.json' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message})
            }

            try {
                let allowedDomains = body
                    ? JSON.parse(body)?.allowedDomains
                    : defaultDomains
                let inputUrl = new URL(decodeURIComponent(req.body.trim().toString()))
                if (inputUrl.protocol !== "https:") res.send()
            
                let resultUrl = allowedDomains?.find((domain) =>
                    inputUrl.host.includes(domain)
                );
                if (resultUrl) res.send(req.body)
                else res.send()
            }
            catch (e) {
                res.status(500).json({ type: 'error', message: e.message})
            }

        }
    )
});

const PORT = process.env.PORT || 4030
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
