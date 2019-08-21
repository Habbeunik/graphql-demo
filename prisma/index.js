const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
	Query: {
		publishedPosts(parent, args, context) {
			return context.prisma.posts({ where: { published: true } });
		},
		post(root, args, context) {
			return context.prisma.post({ id: args.postID });
		},
		postsByUser(root, args, context) {
			return context.prisma.user({ id: args.userID }).posts();
		},
		posts(root, args, context) {
			return context.prisma.posts();
		},
	},
	Mutation: {
		createUser(root, args, context) {
			return context.prisma.createUser({ name: args.name, email: args.email });
		},
		createDraft(root, args, context) {
			return context.prisma.createPost({
				title: args.title,
				author: {
					connect: { id: args.userID },
				},
			});
		},
		publish(root, args, context) {
			return context.prisma.updatePost({
				where: { id: args.postID },
				data: { published: true },
			});
		},
	},
	User: {
		posts(root, args, context) {
			return context.prisma.user({ id: root.id }).posts();
		},
	},
	Post: {
		author(root, args, context) {
			return context.prisma.post({ id: root.id }).author();
		},
	},
};

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: {
		prisma,
	},
});

server.start(() => console.log('Server is running on http://localhost:4000'));
