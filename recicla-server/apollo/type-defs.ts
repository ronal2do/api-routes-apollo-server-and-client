import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Query {
    viewer: User
  }

  """Represents Answer"""
	type Answer implements Node {
		"""The ID of an object"""
		id: ID!
		_id: String
		userId: User
		questionId: Question
		createdAt: String
		updatedAt: String
	}

	input AnswerAddInput {
		userId: String!
		questionId: String!
		clientMutationId: String
	}

	type AnswerAddPayload {
		answerEdge: AnswerEdge
		error: String
		clientMutationId: String
	}

	"""A connection to a list of items."""
	type AnswerConnection {
		count: Int

		"""
		A count of the total number of objects in this connection, ignoring pagination.
			This allows a client to fetch the first five objects by passing "5" as the
			argument to "first", then fetch the total count so it could display "5 of 83",
			for example.
		"""
		totalCount: Int!

		"""Offset from start"""
		startCursorOffset: Int!

		"""Offset till end"""
		endCursorOffset: Int!

		"""Information to aid in pagination."""
		pageInfo: PageInfoExtended!

		"""A list of edges."""
		edges: [AnswerEdge]!
	}

	"""An edge in a connection."""
	type AnswerEdge {
		"""The item at the end of the edge"""
		node: Answer

		"""A cursor for use in pagination"""
		cursor: String!
	}

	"""Represents Category"""
	type Category implements Node {
		"""The ID of an object"""
		id: ID!
		_id: String

		"""The category name"""
		name: String
		actived: Boolean
		createdAt: String
		updatedAt: String
	}

	input CategoryAddInput {
		name: String!
		action: String
		clientMutationId: String
	}

	type CategoryAddPayload {
		categoryEdge: CategoryEdge
		error: String
		clientMutationId: String
	}

	"""A connection to a list of items."""
	type CategoryConnection {
		count: Int

		"""
		A count of the total number of objects in this connection, ignoring pagination.
			This allows a client to fetch the first five objects by passing "5" as the
			argument to "first", then fetch the total count so it could display "5 of 83",
			for example.
		"""
		totalCount: Int!

		"""Offset from start"""
		startCursorOffset: Int!

		"""Offset till end"""
		endCursorOffset: Int!

		"""Information to aid in pagination."""
		pageInfo: PageInfoExtended!

		"""A list of edges."""
		edges: [CategoryEdge]!
	}

	"""An edge in a connection."""
	type CategoryEdge {
		"""The item at the end of the edge"""
		node: Category

		"""A cursor for use in pagination"""
		cursor: String!
	}

	"""Collect points"""
	type Collect implements Node {
		"""The ID of an object"""
		id: ID!
		_id: String

		"""The Collect point name"""
		name: String

		"""The Collect point name"""
		dat: String
		actived: Boolean
		createdAt: String
		updatedAt: String
	}

	"""A connection to a list of items."""
	type CollectConnection {
		count: Int

		"""
		A count of the total number of objects in this connection, ignoring pagination.
			This allows a client to fetch the first five objects by passing "5" as the
			argument to "first", then fetch the total count so it could display "5 of 83",
			for example.
		"""
		totalCount: Int!

		"""Offset from start"""
		startCursorOffset: Int!

		"""Offset till end"""
		endCursorOffset: Int!

		"""Information to aid in pagination."""
		pageInfo: PageInfoExtended!

		"""A list of edges."""
		edges: [CollectEdge]!
	}

	"""An edge in a connection."""
	type CollectEdge {
		"""The item at the end of the edge"""
		node: Collect

		"""A cursor for use in pagination"""
		cursor: String!
	}

	"""Represents Cupom"""
	type Cupom implements Node {
		"""The ID of an object"""
		id: ID!
		_id: String
		userId: User

		"""The cupom number"""
		number: String
		actived: Boolean
		createdAt: String
		updatedAt: String
	}

	input CupomAddInput {
		userId: String!
		action: String
		clientMutationId: String
	}

	type CupomAddPayload {
		cupomEdge: CupomEdge
		error: String
		clientMutationId: String
	}

	"""A connection to a list of items."""
	type CupomConnection {
		count: Int

		"""
		A count of the total number of objects in this connection, ignoring pagination.
			This allows a client to fetch the first five objects by passing "5" as the
			argument to "first", then fetch the total count so it could display "5 of 83",
			for example.
		"""
		totalCount: Int!

		"""Offset from start"""
		startCursorOffset: Int!

		"""Offset till end"""
		endCursorOffset: Int!

		"""Information to aid in pagination."""
		pageInfo: PageInfoExtended!

		"""A list of edges."""
		edges: [CupomEdge]!
	}

	"""An edge in a connection."""
	type CupomEdge {
		"""The item at the end of the edge"""
		node: Cupom

		"""A cursor for use in pagination"""
		cursor: String!
	}

	type Mutation {
		AnswerAdd(input: AnswerAddInput!): AnswerAddPayload
		CategoryAdd(input: CategoryAddInput!): CategoryAddPayload
		CupomAdd(input: CupomAddInput!): CupomAddPayload
		PointAdd(input: PointAddInput!): PointAddPayload
		QuestionAdd(input: QuestionAddInput!): QuestionAddPayload
		UserChangePassword(input: UserChangePasswordInput!): UserChangePasswordPayload
		UserLoginWithEmail(input: UserLoginWithEmailInput!): UserLoginWithEmailPayload
		UserRegisterWithEmail(input: UserRegisterWithEmailInput!): UserRegisterWithEmailPayload
		UserChangePicture(input: UserChangePictureInput!): UserChangePicturePayload
		UserChangeCpf(input: UserChangeCpfInput!): UserChangeCpfPayload
		UserForgetPassword(input: UserForgetPasswordMutationInput!): UserForgetPasswordMutationPayload
		UserResetPassword(input: UserResetPasswordMutationInput!): UserResetPasswordMutationPayload
		UserPushTokenAdd(input: UserPushTokenAddInput!): UserPushTokenAddPayload
	}

	"""An object with an ID"""
	interface Node {
		"""The id of the object."""
		id: ID!
	}

	"""Information about pagination in a connection."""
	type PageInfoExtended {
		"""When paginating forwards, are there more items?"""
		hasNextPage: Boolean!

		"""When paginating backwards, are there more items?"""
		hasPreviousPage: Boolean!

		"""When paginating backwards, the cursor to continue."""
		startCursor: String

		"""When paginating forwards, the cursor to continue."""
		endCursor: String
	}

	"""Represents Point"""
	type Point implements Node {
		"""The ID of an object"""
		id: ID!
		_id: String
		userId: User

		"""The number of points"""
		points: Int
		actived: Boolean
		createdAt: String
		updatedAt: String
	}

	input PointAddInput {
		userId: String!
		action: String
		clientMutationId: String
	}

	type PointAddPayload {
		userEdge: UserEdge
		error: String
		clientMutationId: String
	}

	"""A connection to a list of items."""
	type PointConnection {
		count: Int

		"""
		A count of the total number of objects in this connection, ignoring pagination.
			This allows a client to fetch the first five objects by passing "5" as the
			argument to "first", then fetch the total count so it could display "5 of 83",
			for example.
		"""
		totalCount: Int!

		"""Offset from start"""
		startCursorOffset: Int!

		"""Offset till end"""
		endCursorOffset: Int!

		"""Information to aid in pagination."""
		pageInfo: PageInfoExtended!

		"""A list of edges."""
		edges: [PointEdge]!
	}

	"""An edge in a connection."""
	type PointEdge {
		"""The item at the end of the edge"""
		node: Point

		"""A cursor for use in pagination"""
		cursor: String!
	}

	"""The root of all... queries"""
	type Query {
		"""Fetches an object given its ID"""
		node(
			"""The ID of an object"""
			id: ID!
		): Node
		me: User
		answer(id: ID!): Answer
		answers(after: String, first: Int, before: String, last: Int, search: String): AnswerConnection
		category(id: ID!): Category
		categories(after: String, first: Int, before: String, last: Int, search: String): CategoryConnection
		collect(id: ID!): Collect
		collects(after: String, first: Int, before: String, last: Int, search: String): CollectConnection
		cupom(id: ID!): Cupom
		cupoms(after: String, first: Int, before: String, last: Int, search: String): CupomConnection
		point(id: ID!): Point
		points(after: String, first: Int, before: String, last: Int, search: String): PointConnection
		question(id: ID!): Question
		questions(after: String, first: Int, before: String, last: Int, search: String): QuestionConnection
		nextQuestion(after: String, first: Int, before: String, last: Int, search: String, sequence: Int): QuestionConnection
		user(id: ID!): User
		users(after: String, first: Int, before: String, last: Int, search: String): UserConnection
	}

	"""Represents Question"""
	type Question implements Node {
		"""The ID of an object"""
		id: ID!
		_id: String

		"""The cupom label"""
		label: String

		"""The cupom level"""
		level: String

		"""The cupom sequence"""
		sequence: Int

		"""The cupom answers"""
		answers: [String]

		"""The cupom correctAnswer"""
		correctAnswer: Int
		actived: Boolean
		category: Category

		"""The cupom introduction"""
		introduction: String
		createdAt: String
		updatedAt: String
	}

	input QuestionAddInput {
		answers: [String]!
		label: String!
		level: String
		correctAnswer: Int!
		category: String
		introduction: String!
		clientMutationId: String
	}

	type QuestionAddPayload {
		questionEdge: QuestionEdge
		error: String
		clientMutationId: String
	}

	"""A connection to a list of items."""
	type QuestionConnection {
		count: Int

		"""
		A count of the total number of objects in this connection, ignoring pagination.
			This allows a client to fetch the first five objects by passing "5" as the
			argument to "first", then fetch the total count so it could display "5 of 83",
			for example.
		"""
		totalCount: Int!

		"""Offset from start"""
		startCursorOffset: Int!

		"""Offset till end"""
		endCursorOffset: Int!

		"""Information to aid in pagination."""
		pageInfo: PageInfoExtended!

		"""A list of edges."""
		edges: [QuestionEdge]!
	}

	"""An edge in a connection."""
	type QuestionEdge {
		"""The item at the end of the edge"""
		node: Question

		"""A cursor for use in pagination"""
		cursor: String!
	}

	type Subscription {
		UserAdded: UserAddedPayload
	}

	"""User data"""
	type User implements Node {
		"""The ID of an object"""
		id: ID!
		_id: String
		name: String
		picture: String
		cpf: String
		email: String
		cursor: String
		active: Boolean
		passwordResetExpires: Boolean
		passwordResetToken: Boolean
		points: Point
		cupoms(after: String, first: Int, before: String, last: Int): CupomConnection
	}

	type UserAddedPayload {
		userEdge: UserEdge
	}

	input UserChangeCpfInput {
		cpf: String!
		clientMutationId: String
	}

	type UserChangeCpfPayload {
		error: String
		me: User
		clientMutationId: String
	}

	input UserChangePasswordInput {
		oldPassword: String!

		"""user new password"""
		password: String!
		clientMutationId: String
	}

	type UserChangePasswordPayload {
		error: String
		me: User
		clientMutationId: String
	}

	input UserChangePictureInput {
		picture: String!
		clientMutationId: String
	}

	type UserChangePicturePayload {
		error: String
		me: User
		clientMutationId: String
	}

	"""A connection to a list of items."""
	type UserConnection {
		"""Number of items in this connection"""
		count: Int!

		"""
		A count of the total number of objects in this connection, ignoring pagination.
			This allows a client to fetch the first five objects by passing "5" as the
			argument to "first", then fetch the total count so it could display "5 of 83",
			for example.
		"""
		totalCount: Int!

		"""Offset from start"""
		startCursorOffset: Int!

		"""Offset till end"""
		endCursorOffset: Int!

		"""Information to aid in pagination."""
		pageInfo: PageInfoExtended!

		"""A list of edges."""
		edges: [UserEdge]!
	}

	"""An edge in a connection."""
	type UserEdge {
		"""The item at the end of the edge"""
		node: User!

		"""A cursor for use in pagination"""
		cursor: String!
	}

	input UserForgetPasswordMutationInput {
		"""user email"""
		email: String!
		clientMutationId: String
	}

	type UserForgetPasswordMutationPayload {
		error: String
		clientMutationId: String
	}

	input UserLoginWithEmailInput {
		email: String!
		password: String!
		clientMutationId: String
	}

	type UserLoginWithEmailPayload {
		token: String
		error: String
		clientMutationId: String
	}

	input UserPushTokenAddInput {
		os: String!
		token: String!
		clientMutationId: String
	}

	type UserPushTokenAddPayload {
		error: String
		token: String
		clientMutationId: String
	}

	input UserRegisterWithEmailInput {
		name: String!
		email: String!
		password: String!
		clientMutationId: String
	}

	type UserRegisterWithEmailPayload {
		token: String
		error: String
		clientMutationId: String
	}

	input UserResetPasswordMutationInput {
		"""user token url"""
		token: String!

		"""user new password"""
		password: String!
		clientMutationId: String
	}

	type UserResetPasswordMutationPayload {
		error: String
		token: String
		clientMutationId: String
	}

`
