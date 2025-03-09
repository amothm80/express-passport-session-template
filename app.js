import path from "node:path";
import { fileURLToPath } from "url";
import "dotenv/config";
import pg from "pg";
import express from "express";
import session from "express-session";
import passport from "passport";
import passportlocal from "passport-local";
import crypto from 'crypto';
import pgSimple from "connect-pg-simple";
import { pool } from "./config/database.js";
import { __dirname } from "./lib/dirname.js";
import { router } from "./routes/index.js";
const pgSession = pgSimple(session);

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */

app.use(
  session({
    store: new pgSession({
      pool: pool, // Connection pool
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 days,
    saveUninitialized: true,

    // Insert express-session options here
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.session());


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(router);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000,() => console.log("app listening on port 3000"));