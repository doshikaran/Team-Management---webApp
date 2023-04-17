// const { projects, members } = require("../data/data");

const Member = require("../models/Member");
const Project = require("../models/Project");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// members type
const MemberType = new GraphQLObjectType({
  name: "Member",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// project tyep
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    desc: { type: GraphQLString },
    status: { type: GraphQLString },
    subject: { type: GraphQLString },
    member: {
      type: MemberType,
      resolve(parent, args) {
        return Member.findById(parent.memberId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    members: {
      type: new GraphQLList(MemberType),
      resolve(parent, args) {
        return Member.find();
      },
    },
    member: {
      type: MemberType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Member.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
  },
});

// mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMember: {
      type: MemberType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const member = new Member({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return member.save();
      },
    },

    deleteMember: {
      type: MemberType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({memberId:args.id}).then(() =>(
          (projects) =>{
            projects.forEach(project => {
              project.remove()
            })
          }
        ))
        return Member.findByIdAndRemove(args.id);
      },
    },

    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        subject: { type: GraphQLNonNull(GraphQLString) },
        desc: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "To Do" },
              progress: { value: "In Progress" },
              done: { value: "Completed" },
            },
          }),
          defaultValue: "To Do",
        },
        memberId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          subject: args.subject,
          desc: args.desc,
          status: args.status,
          memberId: args.memberId,
        });
        return project.save();
      },
    },

    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        subject: { type: GraphQLNonNull(GraphQLString) },
        desc: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "To Do" },
              progress: { value: "In Progress" },
              done: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              subject: args.subject,
              desc: args.desc,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
