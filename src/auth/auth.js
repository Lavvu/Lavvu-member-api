import passport from 'passport';

export default (server) => {
	server.use(passport.initialize());
};
