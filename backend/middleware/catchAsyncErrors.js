module.exports = theFunc => (req, response, next) => {
    Promise.resolve(theFunc(req,response,next)).catch(next)
}