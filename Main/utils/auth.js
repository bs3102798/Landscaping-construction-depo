const withAuth = (req, res, next) => {
    if (!req.sesstion.logged_in) {
        res.redirct('/login')
    } else {
        next();
    }
};

module.exports = withAuth;