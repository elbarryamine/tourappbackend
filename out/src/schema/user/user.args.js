"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaArgs = exports.UserSignUpSchemaArgs = exports.UserSignInSchemaArgs = void 0;
const Graphql = __importStar(require("graphql"));
exports.UserSignInSchemaArgs = {
    email: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    password: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
};
exports.UserSignUpSchemaArgs = {
    firstName: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    lastName: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    email: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    phone: { type: Graphql.GraphQLString },
    password: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    passwordConfirm: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    birthDate: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
};
exports.UserSchemaArgs = {
    id: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    firstName: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    lastName: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    email: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    phone: { type: Graphql.GraphQLString },
    role: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    birthDate: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    createdAt: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
    avatar: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
};
