import { GraphQLList, GraphQLString } from "graphql";
import { OpenControl } from "../types/OpenControl";

const controls = {
  description: "Returns a list of all controls",
  type: new GraphQLList(OpenControl),
  args: {
    controlId: {
      type: GraphQLString,
      description: "optional control id to limit to specific control",
    },
  },
  resolve: (root, { controlId }) => {
    const controls = Object.keys(root).map(item => {
      return root[item];
    });

    if (controlId) {
      return controls.filter(item => {
        return item.id === controlId;
      });
    }

    return controls;
  },
};

module.exports.controls = controls;
