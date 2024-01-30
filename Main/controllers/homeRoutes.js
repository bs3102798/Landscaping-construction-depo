const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require("../utils/auth.js")

router.get('/', async (req, res) => {
    try {

        const projectData = await Project.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const projects = projectData.map((project) => project.get({ plain: true }));


        res.render('homepage', {
            projects,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

router.get('/checkout', (req, res) => {

    res.render('checkout', { logged_in: req.session.logged_in })
});

router.get('/payment', async (req, res) => {

    res.render("payment", { logged_in: req.session.logged_in })
});

router.get("/about", (req, res) => {
    res.render("about")
});

router.get("/contact", (req, res) => {
    res.render("contact")
});

router.get("/about", (req, res) => {
    res.render("about")
});

router.get("/landscape", (req, res) => {
    res.render("landscape")
});



router.get("/project", (req, res) => {
    res.render("project", { logged_in: req.session.logged_in })
});

router.get("/rocky", (req, res) => {
    res.render("rocky", { logged_in: req.session.logged_in })
});

router.get("/services", (req, res) => {
    res.render("services")
});

router.get("/signup", (req, res) => {
    res.render("signup")
});

router.get("/simple", (req, res) => {
    res.render("simple", { logged_in: req.session.logged_in })
});

router.get("/teams", (req, res) => {
    res.render("teams")
});

router.get("/tropical", (req, res) => {
    res.render("tropical", { logged_in: req.session.logged_in })
});

router.get("/modern", (req, res) => {
    res.render("modern", { logged_in: req.session.logged_in })
});

router.get("/info", (req, res) => {
    res.render("info")
});



module.exports = router;
