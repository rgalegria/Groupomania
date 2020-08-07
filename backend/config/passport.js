const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

// Database Route
const db = require("../config/db");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const userAuth = (username, password, done) => {
  if (!username || !password) {
    return res.status(400).json({ error: "Veillez rentrer vos identifiants" });
  }

  // Requete de l'utilisateur sur la base de donnés

  const sql = "SELECT id, email, password FROM users WHERE email = ?";
  const findUser = db.query(sql, [email], (error, user) => {
    // Vérifie que l'object ne soit pas vide (Utilisateur inexistant)

    if (user.length === 0) {
      return done(
        null,
        false,
        res.status(401).json({
          error: "Votre adresse e-mail n'est pas valide",
        })
      );
    }

    // Comparaison entre le hash et le mot de passe
    bcrypt.compare(password, user[0].password).then((valid) => {
      if (!valid) {
        return done(
          null,
          false,
          res.status(401).json({
            error: "Votre mot de passe n'est pas valide",
          })
        );
      }

      // Signe le id de l'utilisateur et retourne un JWT dans l'entete
      return done(
        null,
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            {
              userId: user.id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES,
            }
          ),
        })
      );
    });
  });
};

const strategy = new LocalStrategy(customFields, userAuth);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
