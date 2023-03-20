import { ERRORS } from "../lib/errors";
import { generateToken, isValidEmail } from "../lib/helpers";
import UserModel from "../model/UserModel";
import { GraphQLError } from "graphql"
import { nanoid } from 'nanoid'
import UserPushTokenModel, { USER_PUSHENDPOINT_TYPE } from "../model/UserPushTokenModel";
const ONE_HOUR: number = 3600000

export const UserMutations = {
  UserRegisterWithEmail: async (_, { input: { name, email, password }}) => {
    // @ts-ignore: mongoose findOne requires a static declaratrion
    let user: IUser = await UserModel.findOne({ email: email.toLowerCase() }).exec();
  
    if (user) {
      throw new GraphQLError(ERRORS.emailAlreadyInUse)
    }
  
    user = new UserModel({
      name,
      email,
      password,
    });
  
    await user.save();
  
    // await pubsub.publish(EVENTS.user.added, { UserAdded: { user } });
  
    return {
      token: generateToken(user),
      id: user._id,
      email: user.email,
    };
  },
  UserChangePassword: async (_, {input: {  token, password }}) => {
    // @ts-ignore: mongoose findOne requires a static declaratrion
    let user = await UserModel.findOne({ passwordResetToken: token })
      .where('passwordResetExpires')
      .gt(Date.now())

    if (!user) {
      throw new GraphQLError('TOKEN_EXPIRED')
    }

    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    return {
      error: null,
      token: generateToken(user),
      id: user._id,
    }

  },
  UserLoginWithEmail: async (_, {input: { email, password }}) => {
    // @ts-ignore: mongoose findOne requires a static declaratrion
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new GraphQLError(ERRORS.invalidEmailOrPassword)
    }

    const correctPassword = user.authenticate(password);

    if (!correctPassword) {
      throw new GraphQLError(ERRORS.invalidEmailOrPassword)
    }
    
    return {
      error: null,
      token: generateToken(user),
      id: user._id,
      email: user.email
    };
  },
  UserChangePicture: async (_, {input: { picture }, user}) => {
    if (!user) {
      return {
        error: 'User not authenticated',
      };
    }

    user.picture = picture;
    await user.save();

    return {
      error: null,
    };
  },
  UserChangeCpf: async (_, {input: { cpf }, user}) => {
    if (!user) {
      return {
        error: 'User not authenticated',
      };
    }

    user.cpf = cpf;
    await user.save();

    return {
      error: null,
    };
  },
  UserForgetPassword: async (_, {input: { email }}) => {
    if (!isValidEmail(email)) {
      return {
        error: 'email not valid',
      };
    }
    // @ts-ignore: mongoose findOne requires a static declaratrion
    const user = await UserModel.findOne({ email: email.toLowerCase() })

    if (!user) {
      return {
        error: 'Email not found',
      };
    }
    let token
    if (user) {
      token = nanoid(48)
      user.passwordResetToken = token
      user.passwordResetExpires = Date.now() + ONE_HOUR / 4 // 15 min
      await user.save()
      // await sendResetEmail(user.email, token)
    }

    return {
      error: null,
      token,
      email: user.email,
      message: `An e-mail has been sent to ${
        user.email
      } with further instructions.`,
    }
  },
  UserResetPassword: async (_, {input: { token, password  }}) => {
    // @ts-ignore: mongoose findOne requires a static declaratrion
    let user = await UserModel.findOne({ passwordResetToken: token })
      .where('passwordResetExpires')
      .gt(Date.now())

    if (!user) {
      return {
        error: 'TOKEN_EXPIRED',
      };
    }

    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    return {
      error: null,
      token: generateToken(user),
      id: user._id,
    }
  },
  UserPushTokenAdd: async (_, {input: { os, token }, user}) => {
    const type = os.toUpperCase();

    if (!token) {
      return {
        error: 'Token not set',
      };
    }

    // Check if there is a type
    if (!type || Object.values(USER_PUSHENDPOINT_TYPE).indexOf(type) < 0) {
      return {
        error: 'Invalid OS',
      };
    }
    // @ts-ignore
    let userToken = await UserPushTokenModel.findOne({ user: user._id, type, token });

    if (userToken) {
      return {
        error: null,
        token: userToken.token
      };
    }

    userToken = new UserPushTokenModel({
      user: user._id, 
      token, 
      type
    });

    await userToken.save();

    return {
      error: null,
      token: userToken.token
    };
  },
  // UserPushTokenAdd: async (_, {input: { arg }}) => {},
}