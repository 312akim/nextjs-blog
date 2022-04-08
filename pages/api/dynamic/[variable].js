// Request to /api/dynamic/[variable] will trigger below
export default function handler(req, res) {
    const { variable } = req.query
    res.end(`Post: ${variable}`)
}