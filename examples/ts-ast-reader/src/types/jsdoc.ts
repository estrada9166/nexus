import { interfaceType, objectType, core, Types } from "nexus";
import ts from "typescript";

export const JSDoc = objectType({
  name: "JSDoc",
  definition: (t) => {
    t.string("comment", { nullable: true });
    t.list.field("tags", { type: "JSDocTag", nullable: true });
  },
});

export const JSDocTag = interfaceType({
  name: "JSDocTag",
  definition(t) {
    t.string("tagName", {
      nullable: true,
      resolve: (root) => `${root.tagName.escapedText}`,
    });
    t.string("comment", { nullable: true });
    t.resolveType((tag, ctx, info) => {
      if (info.schema.getType(ts.SyntaxKind[tag.kind])) {
        return ts.SyntaxKind[tag.kind] as any;
      }
      return "JSDocUnknownTag";
    });
  },
});

const jsDocTag = (t: Types.ObjectDefinitionBlock<any>) =>
  t.implements("JSDocTag");

export const JSDocUnknownTag = objectType({
  name: "JSDocUnknownTag",
  definition: jsDocTag,
});
export const JSDocAugmentsTag = objectType({
  name: "JSDocAugmentsTag",
  definition: jsDocTag,
});
export const JSDocClassTag = objectType({
  name: "JSDocClassTag",
  definition: jsDocTag,
});
export const JSDocEnumTag = objectType({
  name: "JSDocEnumTag",
  definition: jsDocTag,
});
export const JSDocThisTag = objectType({
  name: "JSDocThisTag",
  definition: jsDocTag,
});
export const JSDocTemplateTag = objectType({
  name: "JSDocTemplateTag",
  definition: jsDocTag,
});
export const JSDocReturnTag = objectType({
  name: "JSDocReturnTag",
  definition: jsDocTag,
});
export const JSDocTypeTag = objectType({
  name: "JSDocTypeTag",
  definition: jsDocTag,
});
